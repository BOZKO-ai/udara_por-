import React from 'react';
import './Footer.css';

export default function Footer({ brand }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        <a href="#hero" className="footer-brand">
          <span className="brand-icon">
            <span className="code-bracket">&lt;</span>
            <span className="code-slash">/</span>
            <span className="code-bracket">&gt;</span>
          </span>
          <span className="brand-name">{brand?.name || 'Developer X'}</span>
        </a>

        <p className="footer-copy">
          © {currentYear} {brand?.name || 'Developer X'}. Built with React, Three.js & Framer Motion.
        </p>

        <a href="#hero" className="back-to-top" aria-label="Back to top">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
