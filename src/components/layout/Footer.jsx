import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiDownload, FiArrowUp, FiCopy, FiCheck } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import './Footer.css';

export default function Footer({ brand }) {
  const currentYear = new Date().getFullYear();
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
    <footer className="footer-wrapper">
      {/* Top glowing accent line */}
      <div className="footer-glow-bar" />

      <div className="footer-container">
        {/* Main Grid: 4 Columns */}
        <div className="footer-main-grid">

          {/* Col 1: Brand & Status */}
          <div className="footer-col footer-col--brand">
            <a href="#hero" className="footer-brand" onClick={scrollToTop}>
              <span className="brand-icon">
                <span className="code-bracket">&lt;</span>
                <span className="code-slash">/</span>
                <span className="code-bracket">&gt;</span>
              </span>
              <span className="brand-name">{brand?.name || 'UDARA LAKSHAN'}</span>
            </a>

            <p className="footer-bio">
              Full-Stack Developer reading for HNDIT at SLIATE Kandy (GPA 3.67 / 4.0).
              Building high-performance web systems with MERN, Next.js, Spring Boot &amp; Google Gemini AI.
            </p>

            {/* Live Status Pill */}
            <div className="footer-status-pill">
              <span className="footer-status-dot" />
              <span>Available for Full-Stack Intern Roles</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="footer-col">
            <h4 className="footer-heading">NAVIGATION</h4>
            <ul className="footer-links">
              <li><a href="#hero" className="footer-link">Home</a></li>
              <li><a href="#about" className="footer-link">About Me</a></li>
              <li><a href="#portfolio" className="footer-link">Featured Projects</a></li>
              <li><a href="#contact" className="footer-link">Get In Touch</a></li>
              <li>
                <a
                  href="/Udara_Lakshan_CV.pdf"
                  download="Udara_Lakshan_CV.pdf"
                  className="footer-link footer-link--highlight"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiDownload style={{ marginRight: '6px' }} />
                  Download Resume (PDF)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Core Tech Stack */}
          <div className="footer-col">
            <h4 className="footer-heading">CORE TECH STACK</h4>
            <div className="footer-tags">
              <span className="footer-tag">React.js</span>
              <span className="footer-tag">Next.js</span>
              <span className="footer-tag">Node.js</span>
              <span className="footer-tag">Spring Boot</span>
              <span className="footer-tag footer-tag--ai">Gemini AI API</span>
              <span className="footer-tag">MongoDB</span>
              <span className="footer-tag">MySQL</span>
              <span className="footer-tag">Tailwind CSS</span>
              <span className="footer-tag">Three.js</span>
            </div>
          </div>

          {/* Col 4: Contact & Socials */}
          <div className="footer-col">
            <h4 className="footer-heading">DIRECT CONTACT</h4>
            <ul className="footer-contact-list">
              <li>
                <FiMail className="contact-icon" />
                <a href={`mailto:${email}`} className="footer-contact-link">{email}</a>
                <button
                  type="button"
                  className="footer-copy-btn"
                  onClick={handleCopyEmail}
                  title="Copy email address"
                  aria-label="Copy email"
                >
                  {copied ? <FiCheck color="#00f2fe" /> : <FiCopy />}
                </button>
              </li>
              <li>
                <FiPhone className="contact-icon" />
                <a href="tel:+94726870867" className="footer-contact-link">+94 72 687 0867</a>
              </li>
              <li>
                <FiMapPin className="contact-icon" />
                <span>Kandy, Sri Lanka</span>
              </li>
            </ul>

            {/* Social buttons */}
            <div className="footer-social-row">
              <a
                href="https://github.com/BOZKO-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com/in/udara-lakshan-50ab43362"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="LinkedIn Profile"
                title="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="footer-bottom-bar">
          <p className="footer-copy">
            © {currentYear} <strong>{brand?.name || 'Udara Lakshan'}</strong>. All rights reserved.
          </p>

          <p className="footer-credit">
            Crafted with <span className="credit-accent">React 19, Three.js &amp; Framer Motion</span>
          </p>

          <button
            type="button"
            className="footer-back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <FiArrowUp className="top-arrow" />
          </button>
        </div>
      </div>
    </footer>
  );
}
