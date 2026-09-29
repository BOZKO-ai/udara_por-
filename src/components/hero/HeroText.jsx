import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowRight } from 'react-icons/fi';
import { FaBolt } from 'react-icons/fa';
import ScrollButton from './ScrollButton';

// ── Animation variants ────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function HeroText({ hero }) {
  const {
    titlePrefix = "I'm Udara, a",
    titleSuffix = 'Full-Stack Developer',
    description = 'Full-stack developer with an HND in Information Technology (GPA 3.67 / 4.0) who builds and deploys complete web applications with React.js, Next.js, Node.js, Spring Boot and MongoDB / MySQL. Integrating Google Gemini API to deliver AI-powered solutions.',
  } = hero || {};

  return (
    <motion.div
      className="hero-left-content"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Cyber pill tagline */}
      <motion.div className="hero-cyber-tag" variants={slideUp}>
        <FaBolt className="hero-sparkle-icon" />
        <span>Full-Stack &amp; AI Engineering</span>
      </motion.div>

      {/* Main Heading */}
      <h1 className="hero-heading">
        <motion.span className="hero-heading-line" variants={slideUp}>
          {titlePrefix}
        </motion.span>
        <motion.span className="hero-heading-line hero-heading-highlight" variants={slideUp}>
          {titleSuffix}
        </motion.span>
      </h1>

      {/* Micro-metrics highlight chips */}
      <motion.div className="hero-metrics-row" variants={slideUp}>
        <span className="metric-chip">
          <strong className="metric-value">3.67</strong>
          <span className="metric-text">SLIATE GPA</span>
        </span>
        <span className="metric-divider">•</span>
        <span className="metric-chip">
          <strong className="metric-value">MERN</strong>
          <span className="metric-text">&amp; Next.js</span>
        </span>
        <span className="metric-divider">•</span>
        <span className="metric-chip">
          <strong className="metric-value">Gemini</strong>
          <span className="metric-text">AI API</span>
        </span>
      </motion.div>

      {/* Subtext description */}
      <motion.p className="hero-subtext" variants={fadeIn}>
        {description}
      </motion.p>

      {/* Action buttons row */}
      <motion.div className="hero-actions-group" variants={fadeIn}>
        <a href="#portfolio" className="hero-primary-cta">
          <span>Explore Projects</span>
          <FiArrowRight className="cta-arrow" />
        </a>

        <a
          href="/Udara_Lakshan_CV.pdf"
          download="Udara_Lakshan_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-secondary-cta"
        >
          <FiDownload className="cta-icon" />
          <span>Resume</span>
        </a>

        <div className="hero-scroll-btn-wrapper">
          <ScrollButton targetId="about" />
        </div>
      </motion.div>
    </motion.div>
  );
}
