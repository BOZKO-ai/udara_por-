import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.css';

export default function ThemeToggle({ className = '', showLabel = false }) {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      type="button"
      className={`theme-toggle-btn ${className} ${isDark ? 'is-dark' : 'is-light'}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
    >
      <div className="theme-toggle-track">
        {/* Glow ambient highlight */}
        <div className="theme-toggle-glow" />

        {/* Sliding thumb pill with icon */}
        <motion.div
          className="theme-toggle-thumb"
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.span
                key="moon"
                className="theme-toggle-icon moon-icon"
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <FiMoon />
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                className="theme-toggle-icon sun-icon"
                initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <FiSun />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Ambient background icons */}
        <div className="theme-toggle-bg-icons" aria-hidden="true">
          <span className="bg-icon bg-icon-sun">
            <FiSun />
          </span>
          <span className="bg-icon bg-icon-moon">
            <FiMoon />
          </span>
        </div>
      </div>

      {showLabel && (
        <span className="theme-toggle-label">
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
    </button>
  );
}
