import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiLayout,
  FiServer,
  FiCpu,
  FiDatabase,
  FiCode,
  FiCheck,
  FiTerminal,
} from 'react-icons/fi';
import './SkillsArsenal.css';

const CATEGORY_ICONS = {
  'Frontend & UI Engineering': <FiLayout />,
  'Backend & Cloud Architecture': <FiServer />,
  'AI Integration & Intelligent Systems': <FiCpu />,
  'Databases & Tooling': <FiDatabase />,
};

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export default function SkillsArsenal({ data }) {
  const { categories = [] } = data || {};
  const [activeCategory, setActiveCategory] = useState(0);

  if (!categories || categories.length === 0) return null;

  return (
    <section id="tech-stack" className="scene-arsenal-wrapper">
      {/* Ambient glow */}
      <div className="scene-ambient-glow arsenal-glow-left" aria-hidden="true" />
      <div className="scene-ambient-glow arsenal-glow-right" aria-hidden="true" />

      <div className="scene-arsenal-container">
        {/* Chapter Header */}
        <div className="scene-header-block">
          <motion.div
            className="scene-badge-wrapper"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <span className="scene-dot" />
            <span className="scene-marker">SCENE 04 // THE ARSENAL</span>
          </motion.div>

          <motion.h2
            className="section-cinematic-title"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            Technical <span className="text-gold-gradient">Mastery Matrix</span>
          </motion.h2>

          <motion.p
            className="section-cinematic-subhead"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            A comprehensive breakdown of engineering disciplines, specialized AI workflows, and modern software architectures.
          </motion.p>
        </div>

        {/* Arsenal Console Layout */}
        <div className="arsenal-console-grid">
          {/* Category Selector Deck (Left) */}
          <motion.div
            className="arsenal-nav-deck"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <div className="deck-header">
              <FiTerminal className="deck-terminal-icon" />
              <span>DISCIPLINE SELECTOR</span>
            </div>

            {categories.map((cat, idx) => {
              const isSelected = activeCategory === idx;
              return (
                <button
                  key={cat.name}
                  className={`arsenal-category-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => setActiveCategory(idx)}
                >
                  <div className="cat-btn-icon">
                    {CATEGORY_ICONS[cat.name] || <FiCode />}
                  </div>
                  <div className="cat-btn-meta">
                    <span className="cat-btn-num">DECK 0{idx + 1}</span>
                    <span className="cat-btn-name">{cat.name}</span>
                  </div>
                  <span className="cat-btn-indicator" />
                </button>
              );
            })}
          </motion.div>

          {/* Active Skills Display (Right) */}
          <motion.div
            className="arsenal-display-stage"
            key={activeCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="stage-top-bar">
              <div className="stage-cat-info">
                <span className="stage-deck-tag">ACTIVE ARCHITECTURE // DECK 0{activeCategory + 1}</span>
                <h3 className="stage-cat-title">{categories[activeCategory]?.name}</h3>
              </div>
              <div className="stage-status-badge">
                <span className="stage-dot" />
                <span>PRODUCTION TESTED</span>
              </div>
            </div>

            <div className="stage-skills-grid">
              {categories[activeCategory]?.skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  className="arsenal-skill-item"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="skill-item-left">
                    <div className="skill-bullet">
                      <FiCheck />
                    </div>
                    <span className="skill-name-text">{skill}</span>
                  </div>
                  <span className="skill-tag-code">PROFICIENT</span>
                </motion.div>
              ))}
            </div>

            {/* AI Special Feature Callout if Deck 03 (AI) */}
            {activeCategory === 2 && (
              <div className="gemini-spotlight-box">
                <div className="gemini-spotlight-header">
                  <FiCpu className="gemini-icon" />
                  <span className="gemini-spotlight-tag">GOOGLE GEMINI API INTEGRATION EXPERTISE</span>
                </div>
                <p className="gemini-spotlight-desc">
                  Extensive hands-on implementation in designing contextual prompt pipelines, multi-turn AI chat interfaces for e-commerce, and automated financial report generation in Next.js &amp; MERN applications.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
