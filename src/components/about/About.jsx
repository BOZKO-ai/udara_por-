import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiCheckCircle, FiGlobe, FiAward, FiBookOpen } from 'react-icons/fi';
import './About.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = (delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: delay } },
});

export default function About({ data }) {
  const { tagline, headline, bio, education, skills, softSkills, languages, stats, cta } = data || {};

  return (
    <section id="journey" className="scene-about-wrapper">
      <div id="about" style={{ position: 'absolute', top: 0 }} />
      {/* Cinematic Ambient Glow & Vignette */}
      <div className="scene-ambient-glow scene-glow-left" aria-hidden="true" />
      <div className="scene-ambient-glow scene-glow-right" aria-hidden="true" />

      <div className="scene-about-container">
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
            <span className="chapter-label">CHAPTER 01 // MY JOURNEY</span>
          </motion.div>

          <motion.h2
            className="editorial-title"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {(headline || 'Engineering Digital Systems\nWith Cinematic Precision').split('\n').map((line, i) => (
              <span key={i} className="cinematic-title-line">
                {i === 1 ? <span className="text-lime-highlight">{line}</span> : line}
              </span>
            ))}
          </motion.h2>

          <motion.p
            className="section-cinematic-subhead"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {tagline || "The narrative behind my software craft, academic distinction at SLIATE Kandy, and vision for AI-driven applications."}
          </motion.p>
        </div>

        {/* Two-Column Editorial Grid */}
        <div className="scene-about-grid">
          {/* LEFT COLUMN: Narrative Bio & Academic Milestone */}
          <motion.div
            className="about-editorial-left"
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <div className="about-bio-card">
              <div className="bio-card-header">
                <span className="bio-tag">NARRATIVE SYNOPSIS</span>
                <span className="bio-time">2024 – PRESENT</span>
              </div>

              <div className="bio-paragraphs">
                {bio?.map((para, i) => (
                  <motion.p key={i} className="bio-text" variants={fadeUp}>
                    {para}
                  </motion.p>
                ))}
              </div>
            </div>

            {/* Academic Distinction Card */}
            {education && (
              <motion.div className="cinema-education-card" variants={fadeUp}>
                <div className="edu-header-row">
                  <div className="edu-icon-badge">
                    <FiBookOpen />
                  </div>
                  <div className="edu-title-stack">
                    <span className="edu-period-tag">{education.period}</span>
                    <h3 className="edu-degree-name">{education.degree}</h3>
                  </div>
                  <div className="edu-gpa-badge">
                    <FiAward />
                    <span>{education.gpa}</span>
                  </div>
                </div>

                <p className="edu-institution-name">{education.institution}</p>

                {education.highlights && (
                  <div className="edu-highlights-list">
                    {education.highlights.map((item, idx) => (
                      <span key={idx} className="edu-highlight-chip">
                        <FiCheckCircle className="chip-check" />
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Key Metric Stats Grid */}
            <motion.div className="cinema-stats-grid" variants={stagger(0.15)}>
              {stats?.map((s) => (
                <motion.div key={s.label} className="cinema-stat-item" variants={fadeUp}>
                  <span className="cinema-stat-value text-lime-highlight">{s.value}</span>
                  <span className="cinema-stat-label">{s.label}</span>
                  {s.sub && <span className="cinema-stat-sub">{s.sub}</span>}
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Download Resume */}
            {cta && (
              <motion.div className="about-cta-container" variants={fadeUp}>
                <a
                  href={cta.href}
                  download={cta.download ? "Udara_Lakshan_CV.pdf" : undefined}
                  target={cta.download ? "_blank" : undefined}
                  rel={cta.download ? "noopener noreferrer" : undefined}
                  className="about-lime-cv-btn"
                >
                  <FiDownload className="cv-icon" />
                  <span>{cta.label}</span>
                </a>
              </motion.div>
            )}
          </motion.div>

          {/* RIGHT COLUMN: Skill Mastery & Competencies */}
          <motion.div
            className="about-editorial-right"
            variants={stagger(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {/* Technical Proficiency Bars */}
            <div className="skills-console-card">
              <div className="console-header">
                <span className="console-title">TECHNICAL MASTERY LEVELS</span>
                <span className="console-status">VERIFIED BENCHMARKS</span>
              </div>

              <div className="skills-bars-list">
                {skills?.map((skill) => (
                  <motion.div key={skill.label} className="skill-meter-row" variants={fadeUp}>
                    <div className="skill-meter-header">
                      <span className="skill-meter-name">{skill.label}</span>
                      <span className="skill-meter-pct">{skill.level}%</span>
                    </div>
                    <div className="skill-meter-track">
                      <motion.div
                        className="skill-meter-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Soft Skills & Core Disciplines */}
            {softSkills?.length > 0 && (
              <motion.div className="competencies-card" variants={fadeUp}>
                <h3 className="competencies-title">CORE PROFESSIONAL COMPETENCIES</h3>
                <div className="competencies-chips-grid">
                  {softSkills.map((item) => (
                    <div key={item} className="competency-chip">
                      <FiCheckCircle className="comp-icon" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Languages */}
            {languages?.length > 0 && (
              <motion.div className="languages-card" variants={fadeUp}>
                <h3 className="competencies-title">COMMUNICATION &amp; LANGUAGES</h3>
                <div className="languages-row">
                  {languages.map((lang) => (
                    <div key={lang.name} className="lang-pill">
                      <FiGlobe className="lang-globe-icon" />
                      <div className="lang-text-stack">
                        <span className="lang-name-text">{lang.name}</span>
                        <span className="lang-level-text">{lang.level}</span>
                      </div>
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
