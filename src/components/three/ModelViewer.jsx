import React, { Suspense, useRef, useCallback, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Model from './Model';

// ── Rotating wireframe shown when GLB is missing or errored ──────────────────
function RotatingMesh() {
  const ref = useRef();
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.45;
    ref.current.rotation.x += delta * 0.18;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.6, 1]} />
      <meshStandardMaterial
        color="#0a63ff"
        wireframe
        emissive="#4facfe"
        emissiveIntensity={0.45}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

// ── Loading spinner (inside Suspense) ─────────────────────────────────────────
function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.4, 12, 12]} />
      <meshStandardMaterial color="#0a63ff" wireframe />
    </mesh>
  );
}

// ── React ErrorBoundary — catches GLB load failures silently ─────────────────
// Without this a missing .glb crashes the entire hero section.
class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn('[ModelViewer] 3D scene error (place your .glb at /public/models/character.glb):', error.message);
    }
  }

  render() {
    if (this.state.hasError) {
      // Render an animated fallback inside its own Canvas
      return (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 42 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 1.5]}
          style={{
            background: 'transparent',
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
          }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 8, 5]} intensity={1.8} />
          <RotatingMesh />
        </Canvas>
      );
    }
    return this.props.children;
  }
}

// ── Main ModelViewer ──────────────────────────────────────────────────────────
export default function ModelViewer() {
  const containerRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mousePos.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mousePos.current = { x: 0, y: 0 };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      <CanvasErrorBoundary>
        <Canvas
          camera={{ position: [0, 0.5, 5], fov: 42 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 1.5]}
          style={{
            background: 'transparent',
            position: 'absolute',
            inset: 0,
            pointerEvents: 'auto',
          }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 8, 5]} intensity={1.8} />
          <Environment preset="city" />

          <Suspense fallback={<LoadingFallback />}>
            <Model mousePosRef={mousePos} />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3.5}
            maxPolarAngle={Math.PI / 1.8}
            enableDamping
            dampingFactor={0.08}
          />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
