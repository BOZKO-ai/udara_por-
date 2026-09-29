import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiCheckCircle, FiExternalLink, FiCalendar } from 'react-icons/fi';
import './Certifications.css';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
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
    <section id="certifications" className="certifications-wrapper">
      {/* Ambient background glow blobs */}
      <div className="cert-blob cert-blob--left" aria-hidden="true" />
      <div className="cert-blob cert-blob--right" aria-hidden="true" />

      <div className="certifications-container">
        {/* Section Header */}
        <motion.p
          className="section-tagline"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          Credentials &amp; Honors
        </motion.p>

        <motion.h2
          className="certifications-headline"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          Certifications &amp; Achievements
        </motion.h2>

        <motion.p
          className="certifications-subhead"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          Verified qualifications in Full-Stack Development, Google Gemini AI Integration, and Higher National Academic Excellence.
        </motion.p>

        {/* Certifications Grid */}
        <motion.div
          className="certifications-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {certifications.map((cert) => (
            <motion.article
              key={cert.id}
              className="cert-card"
              variants={fadeUp}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              {/* Top Accent Gradient Border */}
              <div
                className="cert-top-bar"
                style={{
                  background: `linear-gradient(90deg, ${cert.accentColor || '#0a63ff'}, #00f2fe)`,
                }}
                aria-hidden="true"
              />

              <div className="cert-card-inner">
                {/* Header row: Icon & Status */}
                <div className="cert-card-header">
                  <div
                    className="cert-icon-box"
                    style={{
                      borderColor: `${cert.accentColor}44`,
                      background: `${cert.accentColor}15`,
                      color: cert.accentColor || '#00f2fe',
                    }}
                  >
                    <FiAward />
                  </div>

                  <div className="cert-status-badge">
                    <FiCheckCircle className="status-check-icon" />
                    <span>{cert.status}</span>
                  </div>
                </div>

                {/* Badge Category Tag */}
                <div className="cert-badge-pill" style={{ color: cert.accentColor || '#00f2fe' }}>
                  {cert.badge}
                </div>

                {/* Title & Issuer */}
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>

                {/* Date */}
                <div className="cert-date-row">
                  <FiCalendar className="date-icon" />
                  <span>{cert.issueDate}</span>
                </div>

                {/* Skills tags */}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="cert-skills-chips">
                    {cert.skills.map((skill) => (
                      <span key={skill} className="cert-skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Link */}
                <div className="cert-footer-link">
                  <a
                    href={cert.link}
                    target={cert.link.startsWith('http') ? '_blank' : '_self'}
                    rel={cert.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="cert-verify-btn"
                  >
                    <span>View Credential</span>
                    <FiExternalLink className="verify-arrow" />
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
