import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCpu, FiLayers, FiActivity, FiShield } from 'react-icons/fi';
import './ChapterCuriosity.css';

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const CURIOSITY_PILLARS = [
  {
    id: 'ai',
    number: '01',
    title: 'Generative AI & LLM Workflows',
    icon: <FiCpu />,
    tag: 'EXPLORATION',
    description:
      'Pioneering practical applications of Google Gemini API — building context-aware customer assistants, dynamic financial summarizers, and automated e-commerce recommendations.',
    focusArea: 'Gemini Models • Prompt Engineering • Vector Workflows',
  },
  {
    id: 'fullstack',
    number: '02',
    title: 'Next-Gen Full-Stack Systems',
    icon: <FiLayers />,
    tag: 'ARCHITECTURE',
    description:
      'Bridging modern reactive frontends with robust Java Spring Boot and Node.js RESTful pipelines. Designing database schemas in MongoDB Atlas and MySQL optimized for high concurrency.',
    focusArea: 'React 19 • Next.js • Spring Boot • MongoDB',
  },
  {
    id: 'creative',
    number: '03',
    title: 'Cinematic Motion & 3D Graphics',
    icon: <FiActivity />,
    tag: 'CREATIVE TECH',
    description:
      'Obsessed with transforming traditional static websites into rich, editorial storytelling experiences through Three.js viewports, Framer Motion choreography, and hardware-accelerated CSS.',
    focusArea: 'Three.js • Framer Motion • WebGL Shaders',
  },
  {
    id: 'craft',
    number: '04',
    title: 'Clean Code & Engineering Integrity',
    icon: <FiShield />,
    tag: 'DISCIPLINE',
    description:
      'Grounded in academic rigor from SLIATE Kandy (GPA 3.67). Emphasizing modular architecture, OOP principles in Java, automated integration testing, and zero-defect deployments.',
    focusArea: 'OOP Design • MVC Pattern • Agile SDLC',
  },
];

export default function ChapterCuriosity() {
  const [activePillar, setActivePillar] = useState('ai');

  return (
    <section id="curiosity" className="chapter-curiosity-wrapper">
      <div className="curiosity-ambient-glow" aria-hidden="true" />

      <div className="chapter-curiosity-container">
        {/* Chapter Header */}
        <div className="scene-header-block">
          <motion.div
            className="chapter-badge-wrap"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <span className="chapter-dot" />
            <span className="chapter-label">CHAPTER 05 // CURIOSITY</span>
          </motion.div>

          <motion.h2
            className="editorial-title"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            Driven by <span className="text-lime-highlight">Relentless Curiosity</span>
          </motion.h2>

          <motion.p
            className="editorial-subhead"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            Software engineering is an ever-evolving craft. Here are the technical disciplines, creative pursuits, and architectural experiments that fuel my daily code.
          </motion.p>
        </div>

        {/* 4 Curiosity Cards Grid */}
        <motion.div
          className="curiosity-pillars-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {CURIOSITY_PILLARS.map((pillar) => {
            const isSelected = activePillar === pillar.id;
            return (
              <motion.article
                key={pillar.id}
                className={`curiosity-card ${isSelected ? 'active' : ''}`}
                variants={fadeUp}
                onClick={() => setActivePillar(pillar.id)}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <div className="card-top-bar">
                  <span className="pillar-num">{pillar.number}</span>
                  <span className="pillar-tag">{pillar.tag}</span>
                </div>

                <div className="pillar-icon-box">
                  {pillar.icon}
                </div>

                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-desc">{pillar.description}</p>

                <div className="pillar-footer">
                  <span className="pillar-focus-label">FOCUS:</span>
                  <span className="pillar-focus-text">{pillar.focusArea}</span>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
