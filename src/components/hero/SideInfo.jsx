import React from 'react';
import { motion } from 'framer-motion';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaGithub,
} from 'react-icons/fa';

const iconComponents = {
  FaFacebookF: <FaFacebookF />,
  FaTwitter: <FaTwitter />,
  FaInstagram: <FaInstagram />,
  FaLinkedinIn: <FaLinkedinIn />,
  FaYoutube: <FaYoutube />,
  FaGithub: <FaGithub />,
};

// ── Animation variants ────────────────────────────────────────────────────────
const sideContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.5, // starts after the left column has entered
    },
  },
};

const blockVariant = {
  hidden: { opacity: 0, x: 28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SideInfo({ aboutMe, myWork, followMe }) {
  return (
    <motion.aside
      className="hero-right-content"
      variants={sideContainerVariants}
      initial="hidden"
      animate="show"
    >
      {/* ABOUT ME Block */}
      {aboutMe && (
        <motion.div className="hero-info-block" variants={blockVariant}>
          <h2 className="info-block-heading">{aboutMe.title || 'ABOUT ME'}</h2>
          <p className="info-block-text">{aboutMe.description}</p>
          {aboutMe.linkText && (
            <a href={aboutMe.href || '#about'} className="info-block-link">
              {aboutMe.linkText}
            </a>
          )}
        </motion.div>
      )}

      {/* MY WORK Block */}
      {myWork && (
        <motion.div className="hero-info-block" variants={blockVariant}>
          <h2 className="info-block-heading">{myWork.title || 'MY WORK'}</h2>
          <p className="info-block-text">{myWork.description}</p>
          {myWork.linkText && (
            <a href={myWork.href || '#portfolio'} className="info-block-link">
              {myWork.linkText}
            </a>
          )}
        </motion.div>
      )}

      {/* FOLLOW ME Block */}
      {followMe && (
        <motion.div className="hero-info-block follow-me-block" variants={blockVariant}>
          <h2 className="info-block-heading">{followMe.title || 'FOLLOW ME'}</h2>
          <div className="hero-social-icons">
            {followMe.socials?.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="social-icon-btn"
                title={social.name}
              >
                {iconComponents[social.icon] || social.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.aside>
  );
}
