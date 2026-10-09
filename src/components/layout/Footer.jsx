import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiDownload, FiArrowUp, FiCopy, FiCheck } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import './Footer.css';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer({ brand }) {
  const [copied, setCopied] = useState(false);

  const email = 'udara7355@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="cinema-footer-wrapper">
      {/* Top glowing gold accent line */}
      <div className="footer-gold-line" />

      <div className="cinema-footer-container">
        {/* End Credits Header */}
        <div className="footer-credits-header">
          <div className="credits-brand-wrap">
            <a href="#hero" className="credits-brand-link" onClick={scrollToTop}>
              <span className="credits-rec-dot" />
              <span className="credits-brand-title">{brand?.name || 'UDARA LAKSHAN'}</span>
            </a>
            <p className="credits-film-tagline">
              A DEVELOPER'S ODYSSEY • PRODUCTION 2024 – 2026 • SLIATE KANDY (GPA 3.67)
            </p>
          </div>

          <div className="credits-intern-pill">
            <span className="intern-dot" />
            <span>AVAILABLE FOR FULL-STACK INTERN ROLES</span>
          </div>
        </div>

        {/* 4-Column Cinematic Footer Grid */}
        <div className="cinema-footer-grid">
          {/* Col 1: Synopsis & Director */}
          <div className="footer-credit-col">
            <h4 className="credit-col-title">PRODUCTION SYNOPSIS</h4>
            <p className="credit-col-desc">
              Full-Stack Developer reading for HNDIT at SLIATE Kandy with Academic Distinction (GPA 3.67 / 4.0).
              Building high-performance web systems with MERN, Next.js, Spring Boot &amp; Google Gemini AI intelligence.
            </p>
          </div>

          {/* Col 2: Chapter Navigation */}
          <div className="footer-credit-col">
            <h4 className="credit-col-title">SCENE NAVIGATION</h4>
            <ul className="credit-links-list">
              <li><a href="#hero" className="credit-link">Scene 00 — Prologue</a></li>
              <li><a href="#about" className="credit-link">Scene 01 — The Beginning</a></li>
              <li><a href="#certifications" className="credit-link">Scene 02 — The Journey</a></li>
              <li><a href="#portfolio" className="credit-link">Scene 03 — Featured Productions</a></li>
              <li><a href="#tech-stack" className="credit-link">Scene 04 — The Arsenal</a></li>
              <li><a href="#contact" className="credit-link">Scene 05 — The Next Chapter</a></li>
            </ul>
          </div>

          {/* Col 3: Core Technology Stack */}
          <div className="footer-credit-col">
            <h4 className="credit-col-title">TECH ECOSYSTEM</h4>
            <div className="footer-credit-tags">
              <span className="credit-tag">React.js 19</span>
              <span className="credit-tag">Next.js</span>
              <span className="credit-tag">Google Gemini AI</span>
              <span className="credit-tag">Node.js</span>
              <span className="credit-tag">Java Spring Boot</span>
              <span className="credit-tag">MongoDB Atlas</span>
              <span className="credit-tag">MySQL</span>
              <span className="credit-tag">Tailwind CSS</span>
              <span className="credit-tag">Three.js</span>
            </div>
          </div>

          {/* Col 4: Contact & Socials */}
          <div className="footer-credit-col">
            <h4 className="credit-col-title">DIRECT INQUIRIES</h4>
            <ul className="footer-direct-contact">
              <li>
                <FiMail className="fc-icon" />
                <a href={`mailto:${email}`} className="fc-link">{email}</a>
                <button
                  type="button"
                  className="fc-copy-btn"
                  onClick={handleCopyEmail}
                  title="Copy email"
                  aria-label="Copy email"
                >
                  {copied ? <FiCheck color="#34d399" /> : <FiCopy />}
                </button>
              </li>
              <li>
                <FiPhone className="fc-icon" />
                <a href="tel:+94726870867" className="fc-link">+94 72 687 0867</a>
              </li>
              <li>
                <FiMapPin className="fc-icon" />
                <span>Kandy, Sri Lanka</span>
              </li>
            </ul>

            <div className="footer-social-strip">
              <a
                href="https://github.com/BOZKO-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com/in/udara-lakshan-50ab43362"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="LinkedIn Profile"
                title="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="/Udara_Lakshan_CV.pdf"
                download="Udara_Lakshan_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-resume-link"
                title="Download CV"
              >
                <FiDownload />
                <span>CV (PDF)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="footer-cinematic-bottom">
          <p className="footer-copyright-text">
            © {CURRENT_YEAR} <strong>{brand?.name || 'Udara Lakshan'}</strong>. All rights reserved.
          </p>

          <p className="footer-engineering-credit">
            Cinematic Developer Experience • Directed by Code &amp; Powered by AI
          </p>

          <button
            type="button"
            className="footer-back-top-btn"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>Top of Page</span>
            <FiArrowUp className="top-icon" />
          </button>
        </div>
      </div>
    </footer>
  );
}
