import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiCpu, FiAward } from 'react-icons/fi';
import './HeroPortrait.css';

export default function HeroPortrait({ imageSrc = '/images/profile.png' }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Normalized mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 110, mass: 0.7 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax translation
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  // 3D Tilt
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);

  // Floating badge opposite parallax
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
    <div className="editorial-portrait-stage" aria-label="Developer Portrait Reveal">
      {/* Ambient Electric Lime Aura Glow Behind Portrait */}
      <div className="portrait-lime-aura" />
      <div className="portrait-ambient-beam" />

      {/* Main Motion Box for Tilt & Smooth Blurred-to-Sharp Reveal */}
      <motion.div
        className="portrait-motion-wrapper"
        style={{
          x: translateX,
          y: translateY,
          rotateX,
          rotateY,
          transformPerspective: 1200,
        }}
      >
        {/* Film Frame Hairline Corners */}
        <div className="frame-corner corner-tl" />
        <div className="frame-corner corner-tr" />
        <div className="frame-corner corner-bl" />
        <div className="frame-corner corner-br" />

        {/* Silhouette Glow */}
        <div className="portrait-silhouette-glow" />

        {/* Portrait Image with Signature Blurred-to-Sharp Reveal Animation */}
        <motion.div
          className="portrait-img-revealer"
          initial={{
            opacity: 0,
            scale: 1.15,
            filter: 'blur(30px) brightness(0.6)',
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: 'blur(0px) brightness(1)',
          }}
          transition={{
            duration: 1.7,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.25,
          }}
          onAnimationComplete={() => setImageLoaded(true)}
        >
          <img
            src={imageSrc}
            alt="Udara Lakshan - Full-Stack Developer & AI Integrator"
            className="editorial-portrait-img"
            loading="eager"
          />
        </motion.div>

        {/* Seamless Bottom Vignette Mask */}
        <div className="portrait-bottom-mask" />
      </motion.div>

      {/* Floating Holographic Badges with Lime Accents */}
      {/* Badge 1: SLIATE Distinction */}
      <motion.div
        className="editorial-floating-pill pill-sliate"
        style={{ x: badge1X, y: badge1Y }}
        initial={{ opacity: 0, scale: 0.85, x: 25 }}
        animate={{ opacity: imageLoaded ? 1 : 0, scale: imageLoaded ? 1 : 0.85, x: 0 }}
        transition={{ duration: 0.75, delay: 0.5 }}
      >
        <div className="pill-lime-icon">
          <FiAward />
        </div>
        <div className="pill-meta-stack">
          <span className="pill-sub-tag">ACADEMIC DISTINCTION</span>
          <span className="pill-title-bold">SLIATE HNDIT (GPA 3.67)</span>
        </div>
      </motion.div>

      {/* Badge 2: Google Gemini AI */}
      <motion.div
        className="editorial-floating-pill pill-ai"
        style={{ x: badge2X, y: badge2Y }}
        initial={{ opacity: 0, scale: 0.85, x: -25 }}
        animate={{ opacity: imageLoaded ? 1 : 0, scale: imageLoaded ? 1 : 0.85, x: 0 }}
        transition={{ duration: 0.75, delay: 0.65 }}
      >
        <div className="pill-cyan-icon">
          <FiCpu />
        </div>
        <div className="pill-meta-stack">
          <span className="pill-sub-tag">INTELLIGENT SYSTEMS</span>
          <span className="pill-title-bold">Google Gemini AI</span>
        </div>
      </motion.div>

      {/* Floating Status Indicator */}
      <motion.div
        className="editorial-status-pill"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: imageLoaded ? 1 : 0, y: imageLoaded ? 0 : 15 }}
        transition={{ duration: 0.65, delay: 0.85 }}
      >
        <span className="live-lime-dot" />
        <span className="status-pill-text">OPEN TO FULL-STACK &amp; UI/UX ROLES</span>
      </motion.div>
    </div>
  );
}
