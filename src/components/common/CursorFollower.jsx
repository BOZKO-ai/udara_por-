import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CursorFollower.css';

export default function CursorFollower() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch-only devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const moveHandler = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable or interactive element
      const target = e.target;
      const clickable =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.card-link') ||
        target.closest('.filter-btn') ||
        target.closest('.social-icon-btn') ||
        target.getAttribute('role') === 'button';

      setIsPointer(!!clickable);
    };

    const leaveHandler = () => setIsVisible(false);

    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseleave', leaveHandler);

    return () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseleave', leaveHandler);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="cursor-follower-container" aria-hidden="true">
      {/* Outer ambient glow ring */}
      <motion.div
        className={`cursor-glow-ring ${isPointer ? 'is-hover' : ''}`}
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
      {/* Inner sharp laser dot */}
      <motion.div
        className={`cursor-dot ${isPointer ? 'is-hover' : ''}`}
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
    </div>
  );
}
