import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiCheckCircle, FiGlobe } from 'react-icons/fi';
import './About.css';

// ── Shared scroll-triggered fade-up ──────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = (delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: delay } },
});

export default function About({ data }) {
  const { tagline, headline, bio, education, skills, softSkills, languages, stats, cta } = data || {};

  return (
    <section id="about" className="about-wrapper">
      {/* Ambient glow blobs */}
      <div className="about-blob about-blob-left"  aria-hidden="true" />
      <div className="about-blob about-blob-right" aria-hidden="true" />

      <div className="about-container">

        {/* ── Section label ── */}
        <motion.p
          className="section-tagline"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {tagline || 'Who Am I?'}
        </motion.p>

        {/* ── Two-column layout ── */}
        <div className="about-grid">

          {/* LEFT — bio + stats */}
          <motion.div
            className="about-left"
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.h2 className="about-headline" variants={fadeUp}>
              {(headline || 'Crafting Digital\nExperiences').split('\n').map((line, i) => (
                <span key={i} className="about-headline-line">{line}</span>
              ))}
            </motion.h2>

            {bio?.map((para, i) => (
              <motion.p key={i} className="about-bio" variants={fadeUp}>
                {para}
              </motion.p>
            ))}

            {education && (
              <motion.div className="about-education-card" variants={fadeUp}>
                <div className="edu-top">
                  <span className="edu-badge">{education.period}</span>
                  <span className="edu-gpa">{education.gpa}</span>
                </div>
                <h4 className="edu-degree">{education.degree}</h4>
                <p className="edu-institute">{education.institution}</p>
              </motion.div>
            )}

            {/* Stats row */}
            <motion.div className="about-stats" variants={stagger(0.2)}>
              {stats?.map((s) => (
                <motion.div key={s.label} className="stat-card" variants={fadeUp}>
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {cta && (
              <motion.a
                href={cta.href}
                download={cta.download ? "Udara_Lakshan_CV.pdf" : undefined}
                target={cta.download ? "_blank" : undefined}
                rel={cta.download ? "noopener noreferrer" : undefined}
                className="about-cta-btn"
                variants={fadeUp}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <FiDownload style={{ marginRight: '0.55rem', fontSize: '1.1rem' }} />
                {cta.label}
              </motion.a>
            )}
          </motion.div>

          {/* RIGHT — skill bars & competencies */}
          <motion.div
            className="about-right"
            variants={stagger(0.25)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.h3 className="skills-heading" variants={fadeUp}>
              Technical Skills
            </motion.h3>
            <div className="skills-list">
              {skills?.map((skill) => (
                <motion.div key={skill.label} className="skill-item" variants={fadeUp}>
                  <div className="skill-meta">
                    <span className="skill-label">{skill.label}</span>
                    <span className="skill-pct">{skill.level}%</span>
                  </div>
                  <div className="skill-track">
                    <motion.div
                      className="skill-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Soft Skills & Core Competencies */}
            {softSkills?.length > 0 && (
              <motion.div className="soft-skills-wrapper" variants={fadeUp}>
                <h4 className="competencies-subheading">Core Competencies</h4>
                <div className="soft-skills-chips">
                  {softSkills.map((item) => (
                    <span key={item} className="soft-skill-chip">
                      <FiCheckCircle className="chip-icon" />
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Languages */}
            {languages?.length > 0 && (
              <motion.div className="languages-wrapper" variants={fadeUp}>
                <h4 className="competencies-subheading">Languages</h4>
                <div className="languages-list">
                  {languages.map((lang) => (
                    <div key={lang.name} className="language-badge">
                      <FiGlobe className="lang-icon" />
                      <span className="lang-name">{lang.name}</span>
                      <span className="lang-level">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
