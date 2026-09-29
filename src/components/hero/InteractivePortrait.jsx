import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiGooglegemini } from 'react-icons/si';
import './InteractivePortrait.css';

/**
 * Interactive 2.5D Portrait with 3D Parallax Tilt,
 * Ambient Neon Aura, Floating Tech Badges & Smooth Dark Vignette.
 */
export default function InteractivePortrait({ imageSrc = '/images/profile.jpg' }) {
  const containerRef = useRef(null);

  // Mouse position values normalized between -0.5 and 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid, physics-based motion
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D rotation transforms
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);

  // Subtle translation for depth layers
  const imageTranslateX = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const imageTranslateY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  // Floating badges with heightened parallax depth
  const badge1X = useTransform(smoothX, [-0.5, 0.5], [-28, 28]);
  const badge1Y = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);
  const badge2X = useTransform(smoothX, [-0.5, 0.5], [30, -30]);
  const badge2Y = useTransform(smoothY, [-0.5, 0.5], [22, -22]);

  // Track global window mouse move for wide immersion
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="portrait-scene" ref={containerRef}>
      {/* ── Ambient Background Glows ── */}
      <div className="portrait-glow portrait-glow-primary" aria-hidden="true" />
      <div className="portrait-glow portrait-glow-secondary" aria-hidden="true" />

      {/* ── Animated Cyber Tech Rings ── */}
      <div className="cyber-ring ring-outer" aria-hidden="true" />
      <div className="cyber-ring ring-inner" aria-hidden="true" />

      {/* ── 3D Tilt Card Container ── */}
      <motion.div
        className="portrait-card"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Glow halo behind head */}
        <div className="head-halo" aria-hidden="true" />

        {/* The Portrait Image with smooth mask */}
        <motion.div
          className="portrait-image-wrapper"
          style={{
            x: imageTranslateX,
            y: imageTranslateY,
          }}
        >
          <img
            src={imageSrc}
            alt="Udara Lakshan - Full-Stack Developer"
            className="portrait-img"
            loading="eager"
          />

          {/* Smooth bottom vignette gradient so portrait dissolves into dark page */}
          <div className="portrait-vignette-overlay" aria-hidden="true" />
        </motion.div>

        {/* ── Floating Tech Badge 1: Gemini AI ── */}
        <motion.div
          className="floating-tech-badge badge-gemini"
          style={{
            x: badge1X,
            y: badge1Y,
            transform: 'translateZ(40px)',
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="badge-icon icon-gemini"><SiGooglegemini /></span>
          <div className="badge-text">
            <span className="badge-title">Gemini AI</span>
            <span className="badge-sub">Integration</span>
          </div>
        </motion.div>

        {/* ── Floating Tech Badge 2: Full-Stack Stack ── */}
        <motion.div
          className="floating-tech-badge badge-stack"
          style={{
            x: badge2X,
            y: badge2Y,
            transform: 'translateZ(50px)',
          }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <div className="badge-icons-row">
            <span className="badge-icon icon-react"><FaReact /></span>
            <span className="badge-icon icon-node"><FaNodeJs /></span>
          </div>
          <div className="badge-text">
            <span className="badge-title">Full-Stack</span>
            <span className="badge-sub">MERN & Spring Boot</span>
          </div>
        </motion.div>

        {/* ── Status Pill ── */}
        <motion.div
          className="portrait-status-pill"
          style={{ transform: 'translateZ(30px)' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <span className="status-dot-pulse" />
          <span className="status-label">Available for Internship</span>
        </motion.div>

      </motion.div>
    </div>
  );
}
