import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiMaximize2, FiX, FiCheckCircle } from 'react-icons/fi';
import './Portfolio.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

function getCategories(projects) {
  return ['All', ...new Set(projects.map((p) => p.category))];
}

export default function Portfolio({ projects = [] }) {
  const categories = getCategories(projects);
  const [active, setActive] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="scene-portfolio-wrapper">
      {/* Ambient background glow */}
      <div className="scene-ambient-glow port-glow-left" aria-hidden="true" />
      <div className="scene-ambient-glow port-glow-right" aria-hidden="true" />

      <div className="scene-portfolio-container">
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
            <span className="chapter-label">CHAPTER 02 // MY WORK</span>
          </motion.div>

          <motion.h2
            className="editorial-title"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            Cinematic <span className="text-lime-highlight">Software Showcase</span>
          </motion.h2>

          <motion.p
            className="section-cinematic-subhead"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            Explore end-to-end applications developed and deployed with MERN, Next.js, Java Spring Boot, and Google Gemini AI.
          </motion.p>
        </div>

        {/* Category Filter Tabs */}
        <motion.div
          className="cinema-portfolio-filters"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cinema-filter-btn ${active === cat ? 'active' : ''}`}
              onClick={() => setActive(cat)}
            >
              <span>{cat}</span>
            </button>
          ))}
        </motion.div>

        {/* Projects Showcase Grid */}
        <motion.div className="cinema-projects-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                className="cinema-project-card"
                variants={cardVariant}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
                layout
                transition={{ delay: i * 0.08 }}
              >
                {/* Cinema Image Frame */}
                <div className="cinema-poster-frame">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="cinema-poster-img"
                      loading="lazy"
                    />
                  ) : (
                    <div className="cinema-poster-placeholder" />
                  )}

                  {/* Top Bar Overlays */}
                  <div className="poster-top-bar">
                    <span className="poster-prod-num">{project.productionNumber || `PROD 0${i + 1}`}</span>
                    <span className="poster-cat-badge">{project.category}</span>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="poster-cinema-overlay" />

                  {/* Quick Expand Button */}
                  <button
                    className="poster-expand-btn"
                    onClick={() => setSelectedProject(project)}
                    aria-label={`View full details of ${project.title}`}
                    title="View Production Breakdown"
                  >
                    <FiMaximize2 />
                  </button>
                </div>

                {/* Project Info Body */}
                <div className="cinema-card-body">
                  {project.badge && (
                    <div className="cinema-badge-line">
                      <span className="cinema-badge-text">{project.badge}</span>
                    </div>
                  )}

                  <h3 className="cinema-card-title">{project.title}</h3>
                  
                  {project.role && (
                    <div className="cinema-card-role">
                      <span className="role-label">ROLE:</span>
                      <span className="role-text">{project.role}</span>
                    </div>
                  )}

                  <p className="cinema-card-desc">{project.description}</p>

                  {/* Tech Tags */}
                  <div className="cinema-tags-row">
                    {project.tags.map((tag) => (
                      <span key={tag} className="cinema-tag-chip">{tag}</span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="cinema-card-links">
                    <button
                      type="button"
                      className="cinema-btn-details"
                      onClick={() => setSelectedProject(project)}
                    >
                      <span>Breakdown</span>
                    </button>

                    <a
                      href={project.link}
                      className="cinema-btn-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} live demo`}
                    >
                      <FiExternalLink />
                      <span>Live Demo</span>
                    </a>

                    <a
                      href={project.repo}
                      className="cinema-btn-ghost"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} source on GitHub`}
                    >
                      <FiGithub />
                      <span>Source</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Detailed Modal / Cinema Breakdown View */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="cinema-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="cinema-modal-card"
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 30 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="modal-close-btn"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close modal"
                >
                  <FiX />
                </button>

                <div className="modal-top-hero">
                  {selectedProject.image && (
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="modal-hero-img"
                    />
                  )}
                  <div className="modal-hero-fade" />
                  <div className="modal-hero-titles">
                    <span className="modal-prod-tag">{selectedProject.productionNumber} // {selectedProject.category}</span>
                    <h2 className="modal-main-title">{selectedProject.title}</h2>
                    {selectedProject.role && (
                      <p className="modal-role-text"><strong>ROLE:</strong> {selectedProject.role}</p>
                    )}
                  </div>
                </div>

                <div className="modal-body-content">
                  <div className="modal-section">
                    <h4 className="modal-section-heading">PRODUCTION SYNOPSIS</h4>
                    <p className="modal-desc-text">{selectedProject.description}</p>
                  </div>

                  {selectedProject.keyContributions && (
                    <div className="modal-section">
                      <h4 className="modal-section-heading">KEY ENGINEERING ACHIEVEMENTS</h4>
                      <ul className="modal-contributions-list">
                        {selectedProject.keyContributions.map((item, idx) => (
                          <li key={idx} className="modal-contrib-item">
                            <FiCheckCircle className="modal-check-icon" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="modal-section">
                    <h4 className="modal-section-heading">TECHNOLOGIES &amp; ARCHITECTURE</h4>
                    <div className="modal-tags-wrap">
                      {selectedProject.tags.map((t) => (
                        <span key={t} className="modal-tech-tag">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="modal-actions-bar">
                    <a
                      href={selectedProject.link}
                      className="modal-action-btn modal-btn-gold"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiExternalLink />
                      <span>Launch Live Demo</span>
                    </a>
                    <a
                      href={selectedProject.repo}
                      className="modal-action-btn modal-btn-ghost"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiGithub />
                      <span>View GitHub Repository</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
