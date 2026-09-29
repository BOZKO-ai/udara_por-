import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './HeroPortrait.css';

/**
 * HeroPortrait:
 * Clean, cinematic center developer portrait matching the reference template screenshot.
 * Features subtle, realistic mouse parallax response and seamless bottom fade.
 */
export default function HeroPortrait({ imageSrc = '/images/profile.jpg' }) {
  // Mouse position normalized between -0.5 and 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for natural, subtle physics
  const springConfig = { damping: 30, stiffness: 100, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Subtle parallax translation (12px max for elegant, lifelike feel)
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  // Very gentle 3D tilt
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [3, -3]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth) - 0.5);
      mouseY.set((e.clientY / innerHeight) - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="hero-portrait-container" aria-hidden="true">
      {/* Subtle ambient backlight behind the silhouette */}
      <div className="hero-portrait-aura" />

      {/* Main Portrait with subtle parallax */}
      <motion.div
        className="hero-portrait-motion-wrapper"
        style={{
          x: translateX,
          y: translateY,
          rotateX,
          rotateY,
          transformPerspective: 1200,
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <img
          src={imageSrc}
          alt="Udara Lakshan"
          className="hero-portrait-image"
          loading="eager"
        />
        {/* Seamless bottom fade overlay */}
        <div className="hero-portrait-bottom-fade" />
      </motion.div>
    </div>
  );
}
