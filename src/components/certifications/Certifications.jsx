import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiExternalLink, FiCalendar } from 'react-icons/fi';
import './Certifications.css';

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export default function Certifications({ certifications = [] }) {
  if (!certifications || certifications.length === 0) return null;

  return (
    <section id="certifications" className="scene-journey-wrapper">
      {/* Ambient background glow */}
      <div className="scene-ambient-glow cert-glow-left" aria-hidden="true" />
      <div className="scene-ambient-glow cert-glow-right" aria-hidden="true" />

      <div className="scene-journey-container">
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
            <span className="scene-marker">SCENE 02 // THE JOURNEY</span>
          </motion.div>

          <motion.h2
            className="section-cinematic-title"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            Milestones of <span className="text-gold-gradient">Technical Growth</span>
          </motion.h2>

          <motion.p
            className="section-cinematic-subhead"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            Verified credentials and academic milestones across Full-Stack engineering, enterprise Java architecture, and Google Gemini AI integration.
          </motion.p>
        </div>

        {/* Certifications Grid */}
        <motion.div
          className="cinema-cert-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {certifications.map((cert) => (
            <motion.article
              key={cert.id}
              className="cinema-cert-card"
              variants={fadeUp}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              {/* Top Accent Gradient Border */}
              <div
                className="cert-gold-top-bar"
                style={{
                  background: `linear-gradient(90deg, ${cert.accentColor || '#d4af37'}, #f3d082)`,
                }}
                aria-hidden="true"
              />

              <div className="cert-card-content">
                {/* Header Row: Milestone & Verified Badge */}
                <div className="cert-top-meta">
                  <span className="cert-milestone-tag">{cert.sceneTag || 'MILESTONE'}</span>
                  <div className="cert-verified-pill">
                    <FiCheckCircle className="check-icon" />
                    <span>{cert.status}</span>
                  </div>
                </div>

                {/* Badge Category Tag */}
                <div className="cert-badge-category" style={{ color: cert.accentColor || '#d4af37' }}>
                  {cert.badge}
                </div>

                {/* Title & Issuer */}
                <h3 className="cert-main-title">{cert.title}</h3>
                <p className="cert-org-issuer">{cert.issuer}</p>

                {/* Summary */}
                {cert.summary && (
                  <p className="cert-summary-text">{cert.summary}</p>
                )}

                {/* Date */}
                <div className="cert-timeline-row">
                  <FiCalendar className="cal-icon" />
                  <span>{cert.issueDate}</span>
                </div>

                {/* Skills tags */}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="cert-chips-wrap">
                    {cert.skills.map((skill) => (
                      <span key={skill} className="cert-skill-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Link */}
                <div className="cert-action-foot">
                  <a
                    href={cert.link}
                    target={cert.link.startsWith('http') ? '_blank' : '_self'}
                    rel={cert.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="cert-view-btn"
                  >
                    <span>View Credential &amp; Proof</span>
                    <FiExternalLink className="link-arrow-icon" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
