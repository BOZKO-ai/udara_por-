import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

const FILM_PRODUCTION_LOGS = [
  'INITIALIZING CINEMATIC EXPERIENCE...',
  'CALIBRATING REACT 19 & THREE.JS ENGINE...',
  'SYNCHRONIZING GOOGLE GEMINI AI INTERFACES...',
  'DIRECTED BY UDARA LAKSHAN // SLIATE KANDY',
  'PRODUCTION READY // OPENING SCENE 00',
];

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1600; // 1.6s swift, elegant film title intro

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 25) setLogIndex(0);
      else if (pct < 50) setLogIndex(1);
      else if (pct < 75) setLogIndex(2);
      else if (pct < 95) setLogIndex(3);
      else setLogIndex(4);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          if (onComplete) onComplete();
        }, 300);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className="cinema-loader-wrapper"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(12px)',
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          <div className="loader-ambient-glow" />

          <div className="cinema-loader-card">
            {/* Film Frame Corner Accents */}
            <div className="cinema-corner-mark mark-tl" />
            <div className="cinema-corner-mark mark-tr" />
            <div className="cinema-corner-mark mark-bl" />
            <div className="cinema-corner-mark mark-br" />

            {/* Rec Badge */}
            <div className="loader-rec-line">
              <span className="loader-rec-dot" />
              <span className="loader-rec-label">A DEVELOPER'S ODYSSEY</span>
              <span className="loader-year">2026</span>
            </div>

            <h1 className="loader-film-title">UDARA LAKSHAN</h1>
            <p className="loader-film-role">FULL-STACK DEVELOPER &amp; AI INTEGRATOR</p>

            {/* Progress Bar with Gold Glow */}
            <div className="loader-film-track">
              <motion.div
                className="loader-film-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Meta Row */}
            <div className="loader-meta-strip">
              <span className="loader-log-message">&gt; {FILM_PRODUCTION_LOGS[logIndex]}</span>
              <span className="loader-percentage">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
