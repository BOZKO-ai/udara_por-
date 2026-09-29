import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

const LOG_MESSAGES = [
  'INITIALIZING SYSTEM ARCHITECTURE...',
  'COMPILING REACT 19 & THREE.JS ENGINE...',
  'SYNCHRONIZING GOOGLE GEMINI AI INTERFACES...',
  'CALIBRATING 3D VIEWPORT & RENDERING PIPELINE...',
  'ACCESS GRANTED // PORTFOLIO ONLINE',
];

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Smooth progress counter from 0 to 100%
    const startTime = Date.now();
    const duration = 1800; // 1.8 seconds total duration

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 25) setLogIndex(0);
      else if (pct < 50) setLogIndex(1);
      else if (pct < 75) setLogIndex(2);
      else if (pct < 98) setLogIndex(3);
      else setLogIndex(4);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          if (onComplete) onComplete();
        }, 350);
      }
    }, 24);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className="cyber-loader-container"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: 'blur(10px)',
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          {/* Cyber grid background */}
          <div className="loader-grid-bg" />
          <div className="loader-glow-orb loader-glow-orb--1" />
          <div className="loader-glow-orb loader-glow-orb--2" />

          {/* Central HUD Card */}
          <div className="loader-card">
            {/* Tech Corner Accents */}
            <div className="hud-corner hud-corner--tl" />
            <div className="hud-corner hud-corner--tr" />
            <div className="hud-corner hud-corner--bl" />
            <div className="hud-corner hud-corner--br" />

            {/* Glowing Brand Icon */}
            <div className="loader-brand-icon">
              <span className="loader-bracket">&lt;</span>
              <span className="loader-slash">/</span>
              <span className="loader-bracket">&gt;</span>
            </div>

            <h1 className="loader-title">UDARA LAKSHAN</h1>
            <p className="loader-subtitle">FULL-STACK DEVELOPER &amp; AI INTEGRATOR</p>

            {/* Cyber Ring Spinner */}
            <div className="loader-ring-wrapper">
              <div className="loader-ring loader-ring--outer" />
              <div className="loader-ring loader-ring--inner" />
              <div className="loader-counter">
                <span className="loader-counter-val">{progress}</span>
                <span className="loader-counter-unit">%</span>
              </div>
            </div>

            {/* Progress Bar with Laser Glow */}
            <div className="loader-track">
              <motion.div
                className="loader-fill"
                style={{ width: `${progress}%` }}
              />
              <div
                className="loader-laser-head"
                style={{ left: `${progress}%` }}
              />
            </div>

            {/* Live Terminal Log */}
            <div className="loader-log-box">
              <span className="loader-log-prompt">&gt;</span>
              <span className="loader-log-text">{LOG_MESSAGES[logIndex]}</span>
              <span className="loader-cursor">_</span>
            </div>

            {/* System Status Indicators */}
            <div className="loader-status-row">
              <span className="status-pill status-pill--active">
                <span className="status-dot" /> SYSTEM V2.4
              </span>
              <span className="status-pill">
                SLIATE HNDIT 3.67 GPA
              </span>
              <span className="status-pill status-pill--gemini">
                GEMINI AI READY
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
