import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PageLoader.css';

/**
 * CinematicPageLoader — Film-style opening countdown & iris-wipe exit.
 * Inspired by kumarjayaranga.com opening sequence.
 * Displays for ~2s then slides away to reveal the portfolio.
 */
export default function PageLoader({ onComplete }) {
  const [phase, setPhase] = useState('counting'); // 'counting' | 'exit'
  const [counter, setCounter] = useState(3);
  const [timeStr] = useState(() =>
    new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  );

  useEffect(() => {
    // Count down 3 → 2 → 1 then exit
    const tick = setInterval(() => {
      setCounter((c) => {
        if (c <= 1) {
          clearInterval(tick);
          setTimeout(() => setPhase('exit'), 250);
          return 0;
        }
        return c - 1;
      });
    }, 500);

    return () => clearInterval(tick);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {phase === 'counting' && (
        <motion.div
          className="cinema-loader-root"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          key="loader"
        >
          {/* Top bar */}
          <div className="loader-top-bar">
            <span className="loader-rec-badge">
              <span className="loader-rec-dot" />
              REC
            </span>
            <span className="loader-brand">UDARA LAKSHAN</span>
            <span className="loader-time">{timeStr}</span>
          </div>

          {/* Center content */}
          <div className="loader-center">
            {/* Spinning film reel rings */}
            <div className="loader-reel-rings">
              <div className="reel-ring reel-ring--outer" />
              <div className="reel-ring reel-ring--mid" />
              <div className="reel-ring reel-ring--inner" />
              <div className="reel-crosshair reel-ch-h" />
              <div className="reel-crosshair reel-ch-v" />
            </div>

            {/* Counter */}
            <AnimatePresence mode="wait">
              <motion.span
                key={counter}
                className="loader-counter"
                initial={{ opacity: 0, scale: 1.6, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.6, filter: 'blur(8px)' }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {counter}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div className="loader-progress-track">
            <motion.div
              className="loader-progress-fill"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, ease: 'linear' }}
            />
          </div>

          {/* Bottom bar */}
          <div className="loader-bottom-bar">
            <span className="loader-meta-left">PORTFOLIO v2025 // CINEMATIC EDITION</span>
            <span className="loader-meta-right">KANDY, SRI LANKA • 7.29°N 80.63°E</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
