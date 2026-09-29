import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiCode, FiCpu, FiCheckCircle } from 'react-icons/fi';
import './HeroPortrait.css';

/**
 * HeroPortrait:
 * Advanced cinematic center developer portrait with cut-out transparent background.
 * Features:
 * - Dynamic 3D mouse parallax response & tilt
 * - Cyber lighting halo & rotating particle ring behind the head
 * - Interactive floating holographic status badges in foreground
 * - Seamless bottom gradient fade
 */
export default function HeroPortrait({ imageSrc = '/images/profile.png' }) {
  // Mouse position normalized between -0.5 and 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for natural, subtle physics
  const springConfig = { damping: 28, stiffness: 120, mass: 0.7 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Subtle parallax translation
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  // Gentle 3D tilt
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);

  // Floating badges parallax (opposite or amplified direction for depth)
  const badge1X = useTransform(smoothX, [-0.5, 0.5], [20, -20]);
  const badge1Y = useTransform(smoothY, [-0.5, 0.5], [14, -14]);

  const badge2X = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const badge2Y = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth) - 0.5);
      mouseY.set((e.clientY / innerHeight) - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="hero-portrait-container" aria-label="Udara Lakshan Portrait">
      {/* ── Cyber Atmospheric Backlight Aura ── */}
      <div className="hero-portrait-aura" />
      <div className="hero-portrait-ring hero-portrait-ring--outer" />
      <div className="hero-portrait-ring hero-portrait-ring--inner" />

      {/* ── Main Portrait Motion Wrapper ── */}
      <motion.div
        className="hero-portrait-motion-wrapper"
        style={{
          x: translateX,
          y: translateY,
          rotateX,
          rotateY,
          transformPerspective: 1200,
        }}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        {/* Glow silhouette backing */}
        <div className="hero-portrait-silhouette-glow" />

        <img
          src={imageSrc}
          alt="Udara Lakshan - Full-Stack Developer"
          className="hero-portrait-image"
          loading="eager"
        />

        {/* Seamless bottom fade overlay */}
        <div className="hero-portrait-bottom-fade" />
      </motion.div>

      {/* ── Foreground Floating Holographic Tech Badges ── */}
      {/* Floating Badge 1: AI & Gemini */}
      <motion.div
        className="hero-floating-badge badge-gemini"
        style={{ x: badge1X, y: badge1Y }}
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="badge-icon-box badge-icon-box--cyan">
          <FiCpu className="badge-icon" />
        </div>
        <div className="badge-content">
          <span className="badge-label">AI Integration</span>
          <span className="badge-title">Google Gemini API</span>
        </div>
      </motion.div>

      {/* Floating Badge 2: Full-Stack & SLIATE */}
      <motion.div
        className="hero-floating-badge badge-fullstack"
        style={{ x: badge2X, y: badge2Y }}
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.65 }}
      >
        <div className="badge-icon-box badge-icon-box--blue">
          <FiCode className="badge-icon" />
        </div>
        <div className="badge-content">
          <span className="badge-label">SLIATE HNDIT</span>
          <span className="badge-title">3.67 / 4.0 GPA</span>
        </div>
      </motion.div>

      {/* Floating Status Pill: Open to Roles */}
      <motion.div
        className="hero-status-pill"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
      >
        <span className="status-live-dot" />
        <span>Available for Full-Stack Intern Roles</span>
      </motion.div>
    </div>
  );
}
