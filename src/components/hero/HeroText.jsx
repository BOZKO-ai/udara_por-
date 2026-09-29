import React from 'react';
import { motion } from 'framer-motion';
import ScrollButton from './ScrollButton';

// ── Animation variants ────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const lineGrow = {
  hidden: { scaleX: 0, originX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 36 },
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
  const { titlePrefix = "I'm John, a", titleSuffix = 'Web Developer', description } = hero || {};

  return (
    <motion.div
      className="hero-left-content"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Accent line — grows from left to right */}
      <motion.div
        className="hero-accent-line"
        variants={lineGrow}
        aria-hidden="true"
      />

      {/* Heading — each line slides up independently */}
      <h1 className="hero-heading">
        <motion.span className="hero-heading-line" variants={slideUp}>
          {titlePrefix}
        </motion.span>
        <motion.span className="hero-heading-line highlight" variants={slideUp}>
          {titleSuffix}
        </motion.span>
      </h1>

      {/* Subtext */}
      <motion.p className="hero-subtext" variants={fadeIn}>
        {description ||
          'Lorem ipsum dolor sit amet consectetur adipiscing elit leo quis ullamcorper quis id elementum convallis lacus gravida.'}
      </motion.p>

      {/* Scroll button */}
      <motion.div className="hero-scroll-btn-wrapper" variants={fadeIn}>
        <ScrollButton targetId="about-section" />
      </motion.div>
    </motion.div>
  );
}
