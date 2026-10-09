import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { FiMapPin, FiWifi, FiCpu } from 'react-icons/fi';
import './InteractiveGlobe.css';

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

// ── Lat/Lon → 3D position on sphere ──────────────────────────────────────────
function latLonToVec3(lat, lon, radius) {
  const phi   = (90 - lat)  * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
     radius * Math.cos(phi),
     radius * Math.sin(phi) * Math.sin(theta)
  );
}

// ── Geodesic arc between two points ──────────────────────────────────────────
function buildArc(posA, posB, radius, arcLift = 28) {
  const mid = posA.clone().add(posB).normalize().multiplyScalar(radius + arcLift);
  const curve = new THREE.QuadraticBezierCurve3(posA, mid, posB);
  return curve.getPoints(60);
}

// ── Locations ─────────────────────────────────────────────────────────────────
const SRI_LANKA   = { lat: 7.8731,  lon: 80.7718  };
const TECH_HUBS   = [
  { lat: 37.7749,  lon: -122.4194, color: 0x38bdf8 }, // San Francisco
  { lat: 51.5074,  lon:   -0.1278, color: 0x38bdf8 }, // London
  { lat:  1.3521,  lon:  103.8198, color: 0xb8ff00 }, // Singapore
  { lat: 25.2048,  lon:   55.2708, color: 0xb8ff00 }, // Dubai
  { lat: 35.6762,  lon:  139.6503, color: 0x38bdf8 }, // Tokyo
];

// ── Atmosphere vertex/fragment shaders ───────────────────────────────────────
const ATMO_VERT = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const ATMO_FRAG = `
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.5);
    gl_FragColor = vec4(0.15, 0.55, 1.0, 1.0) * intensity;
  }
`;

export default function InteractiveGlobe() {
  const containerRef = useRef(null);
  const [loaded, setLoaded]   = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width  = container.clientWidth  || 520;
    let height = container.clientHeight || 520;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      alpha: true, antialias: true, powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false;
    container.appendChild(renderer.domElement);

    // ── Scene / Camera ────────────────────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.z = 250;

    // ── Starfield ─────────────────────────────────────────────────────────────
    const starCount = 2200;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 380 + Math.random() * 120;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      starPositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.9, transparent: true, opacity: 0.55 });
    scene.add(new THREE.Points(starGeo, starMat));

    // ── Globe Group ───────────────────────────────────────────────────────────
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const RADIUS = 88;

    // ── Lights ───────────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);
    // Sun light from upper-left (mimics real sun)
    const sunLight = new THREE.DirectionalLight(0xfff5e0, 1.4);
    sunLight.position.set(-200, 100, 200);
    scene.add(sunLight);
    // Rim light for edge definition
    const rimLight = new THREE.DirectionalLight(0x0055ff, 0.3);
    rimLight.position.set(200, -100, -200);
    scene.add(rimLight);

    // ── Atmosphere Glow Shell ─────────────────────────────────────────────────
    const atmoGeo = new THREE.SphereGeometry(RADIUS + 6, 64, 64);
    const atmoMat = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: ATMO_VERT,
      fragmentShader: ATMO_FRAG,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    globeGroup.add(new THREE.Mesh(atmoGeo, atmoMat));

    // ── Outer ambient lime ring glow ──────────────────────────────────────────
    const outerGlowMat = new THREE.MeshBasicMaterial({
      color: 0xb8ff00,
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide,
    });
    const outerGlowMesh = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS + 18, 32, 32),
      outerGlowMat
    );
    globeGroup.add(outerGlowMesh);

    // ── Earth Sphere (placeholder while textures load) ────────────────────────
    const earthGeo = new THREE.SphereGeometry(RADIUS, 64, 64);
    // Start with a procedural ocean color while loading
    const placeholderMat = new THREE.MeshPhongMaterial({
      color: 0x0d2a5e,
      emissive: 0x030d1f,
      shininess: 40,
    });
    const earthMesh = new THREE.Mesh(earthGeo, placeholderMat);
    globeGroup.add(earthMesh);

    // ── Load Earth Textures ───────────────────────────────────────────────────
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = 'anonymous';

    let loadedCount = 0;
    const onLoad = () => {
      loadedCount++;
      if (loadedCount === 1) {
        setLoaded(true);
        setLoading(false);
      }
    };

    loader.load('/textures/earth_day.jpg', (dayTex) => {
      loader.load('/textures/earth_specular.jpg', (specTex) => {
        loader.load('/textures/earth_normal.jpg', (normTex) => {
          const earthMat = new THREE.MeshPhongMaterial({
            map:          dayTex,
            specularMap:  specTex,
            normalMap:    normTex,
            normalScale:  new THREE.Vector2(2, 2),
            specular:     new THREE.Color(0x4488bb),
            shininess:    28,
          });
          earthMesh.material = earthMat;
          earthMesh.material.needsUpdate = true;
          onLoad();
        }, undefined, () => onLoad());
      }, undefined, () => onLoad());
    }, undefined, () => {
      // Texture failed — enhanced fallback with vertex colors
      setLoading(false);
    });

    // ── Orbital Ring ─────────────────────────────────────────────────────────
    const ringGeo = new THREE.RingGeometry(RADIUS + 14, RADIUS + 15.2, 128);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xb8ff00, side: THREE.DoubleSide, transparent: true, opacity: 0.18,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.8;
    ring.rotation.y = Math.PI / 5;
    globeGroup.add(ring);

    // ── Sri Lanka Marker ──────────────────────────────────────────────────────
    const slPos = latLonToVec3(SRI_LANKA.lat, SRI_LANKA.lon, RADIUS + 1.5);

    // Core dot
    const coreDotGeo = new THREE.SphereGeometry(2.2, 16, 16);
    const coreDotMat = new THREE.MeshBasicMaterial({ color: 0xb8ff00 });
    const coreDot = new THREE.Mesh(coreDotGeo, coreDotMat);
    coreDot.position.copy(slPos);
    globeGroup.add(coreDot);

    // Inner pulse ring — orient to face radially outward from globe surface
    const pulse1Geo = new THREE.RingGeometry(3.0, 4.2, 32);
    const pulse1Mat = new THREE.MeshBasicMaterial({
      color: 0xb8ff00, side: THREE.DoubleSide, transparent: true, opacity: 0.7,
    });
    const pulse1 = new THREE.Mesh(pulse1Geo, pulse1Mat);
    pulse1.position.copy(slPos);
    // lookAt a point FAR along the outward normal (away from center)
    pulse1.lookAt(slPos.clone().normalize().multiplyScalar(RADIUS * 5));
    globeGroup.add(pulse1);

    // Outer pulse ring
    const pulse2Geo = new THREE.RingGeometry(5.5, 6.5, 32);
    const pulse2Mat = new THREE.MeshBasicMaterial({
      color: 0xb8ff00, side: THREE.DoubleSide, transparent: true, opacity: 0.35,
    });
    const pulse2 = new THREE.Mesh(pulse2Geo, pulse2Mat);
    pulse2.position.copy(slPos);
    pulse2.lookAt(slPos.clone().normalize().multiplyScalar(RADIUS * 5));
    globeGroup.add(pulse2);

    // Spike / beacon line
    const beaconDir = slPos.clone().normalize();
    const beaconEnd = slPos.clone().add(beaconDir.clone().multiplyScalar(10));
    const beaconGeo = new THREE.BufferGeometry().setFromPoints([slPos, beaconEnd]);
    const beaconMat = new THREE.LineBasicMaterial({ color: 0xb8ff00, transparent: true, opacity: 0.9 });
    globeGroup.add(new THREE.Line(beaconGeo, beaconMat));

    // ── Tech Hub Markers ──────────────────────────────────────────────────────
    const arcObjects = [];
    TECH_HUBS.forEach((hub) => {
      const hubPos = latLonToVec3(hub.lat, hub.lon, RADIUS + 1.5);

      // Small hub dot
      const dotGeo = new THREE.SphereGeometry(1.4, 12, 12);
      const dotMat = new THREE.MeshBasicMaterial({ color: hub.color });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(hubPos);
      globeGroup.add(dot);

      // Connection arc from Sri Lanka
      const arcPoints = buildArc(slPos, hubPos, RADIUS);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(arcPoints);
      const arcMat = new THREE.LineBasicMaterial({
        color: hub.color,
        transparent: true,
        opacity: 0.35,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      globeGroup.add(arcLine);
      arcObjects.push({ mat: arcMat, baseOpacity: 0.35 });
    });

    // ── Initial Orientation: bring Sri Lanka to face the camera ─────────────────
    // With latLonToVec3: theta = (lon+180)*PI/180 for Sri Lanka ≈ 4.552 rad
    // The +Z axis faces camera. We need theta → PI/2, so rotate Y by -(theta - PI/2)
    // = -(4.552 - 1.5708) = -2.981 rad ≈ -170.8°
    // But we also want a slight tilt to show globe depth nicely:
    globeGroup.rotation.x =  0.18;   // slight downward tilt to see latitude
    globeGroup.rotation.y = -2.98;   // rotates Sri Lanka / Indian subcontinent to front face

    // ── Mouse / Touch Drag ────────────────────────────────────────────────────
    let isDragging = false;
    let prevMouse  = { x: 0, y: 0 };
    let velocity   = { x: 0, y: 0 };

    const onPointerDown = (e) => {
      isDragging = true;
      const src = e.touches ? e.touches[0] : e;
      prevMouse = { x: src.clientX, y: src.clientY };
      velocity  = { x: 0, y: 0 };
    };
    const onPointerMove = (e) => {
      if (!isDragging) return;
      const src = e.touches ? e.touches[0] : e;
      const dx  = src.clientX - prevMouse.x;
      const dy  = src.clientY - prevMouse.y;
      velocity  = { x: dx, y: dy };
      globeGroup.rotation.y += dx * 0.005;
      globeGroup.rotation.x += dy * 0.005;
      prevMouse = { x: src.clientX, y: src.clientY };
    };
    const onPointerUp = () => { isDragging = false; };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown',  onPointerDown);
    domEl.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('mousemove',  onPointerMove);
    window.addEventListener('touchmove',  onPointerMove, { passive: true });
    window.addEventListener('mouseup',   onPointerUp);
    window.addEventListener('touchend',  onPointerUp);

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!container) return;
      width  = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // ── Animation Loop ────────────────────────────────────────────────────────
    let raf;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Auto-rotate when not dragging (inertia fade)
      if (!isDragging) {
        velocity.x *= 0.95;
        velocity.y *= 0.95;
        globeGroup.rotation.y += velocity.x * 0.002 + 0.0018;
        globeGroup.rotation.x += velocity.y * 0.002;
        ring.rotation.z += 0.0008;
      }

      // Clamp tilt
      globeGroup.rotation.x = Math.max(-0.6, Math.min(0.6, globeGroup.rotation.x));

      // Sri Lanka pulse
      const pulse = 1 + Math.sin(t * 3.5) * 0.4;
      const fade  = 0.4 + Math.sin(t * 3.5) * 0.3;
      pulse1.scale.set(pulse, pulse, pulse);
      pulse1Mat.opacity = Math.max(0, fade);
      const pulse2Scale = 1 + Math.sin(t * 3.5 + 1.0) * 0.6;
      pulse2.scale.set(pulse2Scale, pulse2Scale, pulse2Scale);
      pulse2Mat.opacity = Math.max(0, 0.25 + Math.sin(t * 3.5 + 1.0) * 0.25);

      // Core dot glow pulse
      const corePulse = 1 + Math.sin(t * 4) * 0.15;
      coreDot.scale.set(corePulse, corePulse, corePulse);

      // Arc opacity breathe
      arcObjects.forEach((arc, i) => {
        arc.mat.opacity = 0.2 + Math.sin(t * 1.2 + i * 0.8) * 0.18;
      });

      // Outer glow breathe
      outerGlowMat.opacity = 0.03 + Math.sin(t * 0.8) * 0.02;

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup',   onPointerUp);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend',  onPointerUp);
      window.removeEventListener('resize',    onResize);
      domEl.removeEventListener('mousedown',  onPointerDown);
      domEl.removeEventListener('touchstart', onPointerDown);
      if (container && domEl.parentElement === container) container.removeChild(domEl);
      renderer.dispose();
    };
  }, []);

  return (
    <section id="digital-world" className="chapter-globe-wrapper">
      <div className="globe-ambient-glow" aria-hidden="true" />

      <div className="chapter-globe-container">
        {/* Chapter Header */}
        <div className="scene-header-block">
          <motion.div
            className="chapter-badge-wrap"
            variants={fadeUp} initial="hidden"
            whileInView="show" viewport={{ once: true, margin: '-60px' }}
          >
            <span className="chapter-dot" />
            <span className="chapter-label">CHAPTER 03 // THE DIGITAL WORLD</span>
          </motion.div>

          <motion.h2
            className="editorial-title"
            variants={fadeUp} initial="hidden"
            whileInView="show" viewport={{ once: true, margin: '-60px' }}
          >
            Connected to the{' '}
            <span className="text-lime-highlight">Global Ecosystem</span>
          </motion.h2>

          <motion.p
            className="editorial-subhead"
            variants={fadeUp} initial="hidden"
            whileInView="show" viewport={{ once: true, margin: '-60px' }}
          >
            Originating from Kandy, Sri Lanka — engineering scalable cloud
            applications, distributed REST APIs, and Gemini AI workflows
            built for global audiences.
          </motion.p>
        </div>

        {/* Globe + Metrics grid */}
        <div className="globe-showcase-grid">
          {/* 3D Earth Canvas */}
          <motion.div
            className="globe-canvas-stage"
            variants={fadeUp} initial="hidden"
            whileInView="show" viewport={{ once: true, margin: '-60px' }}
          >
            {/* Loading overlay */}
            {loading && (
              <div className="globe-loading-overlay">
                <div className="globe-loading-spinner" />
                <span className="globe-loading-text">INITIALISING EARTH VIEWPORT…</span>
              </div>
            )}

            <div className="globe-canvas-mount" ref={containerRef} />

            {/* HUD */}
            <div className="globe-hud-overlay">
              <div className="hud-status-indicator">
                <span className="hud-pulse-lime" />
                <span className="hud-text">3D EARTH VIEWPORT // DRAG TO ROTATE</span>
              </div>
              <div className="hud-coords">
                <span>LAT: 7.8731° N</span>
                <span>LON: 80.7718° E</span>
              </div>
            </div>

            {/* Sri Lanka label badge */}
            <div className="globe-sl-badge">
              <span className="sl-badge-dot" />
              <span className="sl-badge-text">📍 Kandy, Sri Lanka</span>
            </div>
          </motion.div>

          {/* Metrics Column */}
          <motion.div
            className="globe-metrics-col"
            variants={fadeUp} initial="hidden"
            whileInView="show" viewport={{ once: true, margin: '-60px' }}
          >
            <div className="globe-metric-card">
              <div className="metric-icon-box"><FiMapPin /></div>
              <div className="metric-content">
                <span className="metric-subtitle">ORIGIN &amp; BASE</span>
                <h3 className="metric-title">Kandy, Sri Lanka</h3>
                <p className="metric-desc">
                  Reading for Higher National Diploma in IT at SLIATE Kandy.
                  Open to global remote, hybrid, and on-site engineering roles.
                </p>
              </div>
            </div>

            <div className="globe-metric-card">
              <div className="metric-icon-box"><FiWifi /></div>
              <div className="metric-content">
                <span className="metric-subtitle">DEPLOYMENT &amp; INFRASTRUCTURE</span>
                <h3 className="metric-title">Vercel Global Edge &amp; MongoDB Atlas</h3>
                <p className="metric-desc">
                  Building serverless Next.js and containerised full-stack
                  systems with sub-second response times worldwide.
                </p>
              </div>
            </div>

            <div className="globe-metric-card">
              <div className="metric-icon-box"><FiCpu /></div>
              <div className="metric-content">
                <span className="metric-subtitle">INTELLIGENCE NETWORK</span>
                <h3 className="metric-title">Google Gemini API Ecosystem</h3>
                <p className="metric-desc">
                  Harnessing generative AI models for real-time natural language
                  assistants, financial synthesis, and predictive workflows.
                </p>
              </div>
            </div>

            {/* Connection stats strip */}
            <div className="globe-connection-strip">
              {[
                { val: '5+',   label: 'Tech Hubs Connected' },
                { val: '3',    label: 'Live Productions'    },
                { val: '24/7', label: 'Cloud Uptime'        },
              ].map((s) => (
                <div key={s.label} className="connection-stat">
                  <span className="conn-stat-val">{s.val}</span>
                  <span className="conn-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
