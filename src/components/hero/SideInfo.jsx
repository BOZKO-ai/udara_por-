import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';

const iconComponents = {
  FaLinkedinIn: <FaLinkedinIn />,
  FaGithub: <FaGithub />,
};

const sideContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.4,
    },
  },
};

const blockVariant = {
  hidden: { opacity: 0, x: 28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function SideInfo({ aboutMe, myWork, followMe }) {
  return (
    <motion.aside
      className="hero-cinema-side-content"
      variants={sideContainerVariants}
      initial="hidden"
      animate="show"
    >
      {/* SCENE 01 Preview Card */}
      {aboutMe && (
        <motion.div className="cinema-scene-card" variants={blockVariant}>
          <div className="scene-card-header">
            <span className="scene-card-num">{aboutMe.sceneNum || 'SCENE 01'}</span>
            <span className="scene-card-category">THE ORIGIN</span>
          </div>
          <h3 className="scene-card-title">{aboutMe.title || 'THE PROTAGONIST'}</h3>
          <p className="scene-card-text">{aboutMe.description}</p>
          {aboutMe.linkText && (
            <a href={aboutMe.href || '#about'} className="scene-card-link">
              <span>{aboutMe.linkText}</span>
              <FiArrowUpRight className="scene-link-arrow" />
            </a>
          )}
        </motion.div>
      )}

      {/* SCENE 03 Preview Card */}
      {myWork && (
        <motion.div className="cinema-scene-card" variants={blockVariant}>
          <div className="scene-card-header">
            <span className="scene-card-num">{myWork.sceneNum || 'SCENE 03'}</span>
            <span className="scene-card-category">PRODUCTIONS</span>
          </div>
          <h3 className="scene-card-title">{myWork.title || 'FEATURED WORK'}</h3>
          <p className="scene-card-text">{myWork.description}</p>
          {myWork.linkText && (
            <a href={myWork.href || '#portfolio'} className="scene-card-link">
              <span>{myWork.linkText}</span>
              <FiArrowUpRight className="scene-link-arrow" />
            </a>
          )}
        </motion.div>
      )}

      {/* CONNECT Block */}
      {followMe && (
        <motion.div className="cinema-scene-card cinema-connect-card" variants={blockVariant}>
          <div className="scene-card-header">
            <span className="scene-card-num">CONNECT</span>
            <span className="scene-card-category">SOCIALS</span>
          </div>
          <div className="cinema-socials-row">
            {followMe.socials?.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="cinema-social-pill"
                title={social.name}
              >
                <span className="social-pill-icon">{iconComponents[social.icon] || <FaGithub />}</span>
                <span className="social-pill-name">{social.name}</span>
                <FiArrowUpRight className="social-pill-arrow" />
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.aside>
  );
}
