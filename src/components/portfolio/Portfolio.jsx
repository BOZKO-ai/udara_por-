import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import './Portfolio.css';

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show:   { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// Collect unique categories from project list
function getCategories(projects) {
  const cats = ['All', ...new Set(projects.map((p) => p.category))];
  return cats;
}

export default function Portfolio({ projects = [] }) {
  const categories = getCategories(projects);
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="portfolio-wrapper">
      <div className="about-blob portfolio-blob-left"  aria-hidden="true" />
      <div className="about-blob portfolio-blob-right" aria-hidden="true" />

      <div className="portfolio-container">

        {/* Header */}
        <motion.p
          className="section-tagline"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          My Work
        </motion.p>

        <motion.h2
          className="portfolio-headline"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          Featured Projects
        </motion.h2>

        {/* Category filter tabs */}
        <motion.div
          className="portfolio-filters"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn${active === cat ? ' filter-btn--active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <motion.div
          className="project-grid"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                className="project-card"
                variants={cardVariant}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
                layout
                transition={{ delay: i * 0.06 }}
              >
                {/* Gradient top bar */}
                <div
                  className="card-gradient-bar"
                  style={{ background: project.gradient }}
                  aria-hidden="true"
                />

                {/* Project UI Preview Image */}
                {project.image && (
                  <div className="card-image-wrapper">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="card-image"
                      loading="lazy"
                    />
                    <div className="card-image-overlay" aria-hidden="true" />
                  </div>
                )}

                <div className="card-body">
                  <span className="card-category">{project.category}</span>
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-description">{project.description}</p>

                  {/* Tags */}
                  <div className="card-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="card-tag">{tag}</span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="card-links">
                    <a
                      href={project.link}
                      className="card-link card-link--primary"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} live`}
                    >
                      <FiExternalLink />
                      Live Demo
                    </a>
                    <a
                      href={project.repo}
                      className="card-link card-link--ghost"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} source`}
                    >
                      <FiGithub />
                      Source
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
