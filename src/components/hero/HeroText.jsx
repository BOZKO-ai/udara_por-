import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import ScrollButton from './ScrollButton';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.3,
    },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HeroText({ hero }) {
  const {
    titlePrefix = "I'm Udara Lakshan,",
    titleSuffix = 'Full-Stack Developer & UI/UX Designer',
    description = 'Reading for an HND in Information Technology (GPA 3.67 / 4.0) at SLIATE Kandy. Crafting intuitive digital experiences as a UI/UX Designer and engineering robust end-to-end applications with React.js, Next.js, Node.js, Spring Boot, and Google Gemini AI intelligence.',
  } = hero || {};

  return (
    <motion.div
      className="hero-editorial-content"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* ── CINEMATIC BRAND SLATE ── */}
      <motion.div className="hero-director-slate" variants={slideUp}>
        <div className="slate-clap-line" />
        <div className="slate-brand-row">
          <span className="slate-rec-dot" />
          <span className="slate-brand-text">DIRECTED BY CODE</span>
          <span className="slate-separator">•</span>
          <span className="slate-brand-accent">POWERED BY AI</span>
        </div>
        <div className="slate-meta-row">
          <span className="slate-meta-tag">PROLOGUE // SCENE 00</span>
          <span className="slate-meta-divider">|</span>
          <span className="slate-meta-tag">SLIATE KANDY DISTINCTION</span>
        </div>
      </motion.div>

      {/* ── HERO HEADING (Ultra-clean Space Grotesk) ── */}
      <h1 className="hero-editorial-heading">
        <motion.span className="heading-name-line" variants={slideUp}>
          {titlePrefix}
        </motion.span>
        <motion.span className="heading-role-lime text-lime-highlight" variants={slideUp}>
          {titleSuffix}
        </motion.span>
      </h1>

      {/* ── FILM SPEC STRIP ── */}
      <motion.div className="hero-spec-strip" variants={slideUp}>
        <div className="spec-strip-item">
          <span className="strip-label">DISCIPLINE</span>
          <span className="strip-value">FULL-STACK & UI/UX</span>
        </div>
        <span className="strip-dot-divider" />
        <div className="spec-strip-item">
          <span className="strip-label">ACADEMICS</span>
          <span className="strip-value">SLIATE KANDY • GPA 3.67</span>
        </div>
        <span className="strip-dot-divider" />
        <div className="spec-strip-item">
          <span className="strip-label">AI ENGINE</span>
          <span className="strip-value strip-value-lime">GOOGLE GEMINI</span>
        </div>
      </motion.div>

      {/* ── DESCRIPTION ── */}
      <motion.p className="hero-editorial-description" variants={fadeIn}>
        {description}
      </motion.p>

      {/* ── ACTION BUTTONS ── */}
      <motion.div className="hero-editorial-actions" variants={fadeIn}>
        {/* Primary CTA */}
        <a href="#about" className="btn-cta-primary" id="hero-enter-journey-btn">
          <span className="btn-cta-inner">
            <span className="btn-cta-label">ENTER THE JOURNEY</span>
            <span className="btn-cta-sub">CHAPTER 01 // ORIGIN</span>
          </span>
          <span className="btn-cta-arrow">
            <FiArrowRight />
          </span>
        </a>

        {/* Secondary: View Work */}
        <a href="#portfolio" className="btn-cta-ghost" id="hero-explore-projects-btn">
          <span>Explore Projects</span>
          <FiArrowUpRight className="btn-ghost-arrow" />
        </a>

        {/* Resume Download */}
        <a
          href="/Udara_Lakshan_CV.pdf"
          download="Udara_Lakshan_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta-cv"
          id="hero-download-cv-btn"
          title="Download Official Resume"
        >
          <FiDownload />
          <span>Resume</span>
        </a>

        {/* Scroll indicator */}
        <div className="hero-scroll-wrapper">
          <ScrollButton targetId="about" />
        </div>
      </motion.div>

      {/* ── SOCIAL LINKS ── */}
      <motion.div className="hero-social-row" variants={fadeIn}>
        <span className="social-row-label">CONNECT</span>
        <a
          href="https://github.com/BOZKO-ai"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-social-link"
          aria-label="GitHub"
          id="hero-github-link"
        >
          <FaGithub />
          <span>GitHub</span>
        </a>
        <a
          href="https://linkedin.com/in/udara-lakshan-50ab43362"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-social-link"
          aria-label="LinkedIn"
          id="hero-linkedin-link"
        >
          <FaLinkedinIn />
          <span>LinkedIn</span>
        </a>
      </motion.div>
    </motion.div>
  );
}
