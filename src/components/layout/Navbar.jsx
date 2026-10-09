import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import {
  FiUser,
  FiLayers,
  FiCpu,
  FiMail,
  FiDownload,
  FiCompass,
  FiGlobe,
  FiActivity,
} from 'react-icons/fi';
import ThemeToggle from '../common/ThemeToggle';
import './Navbar.css';

const NAV_ICONS = {
  'Identity': <FiCompass className="nav-item-icon" />,
  'My Journey': <FiUser className="nav-item-icon" />,
  'My Work': <FiLayers className="nav-item-icon" />,
  'Digital World': <FiGlobe className="nav-item-icon" />,
  'Craftsmanship': <FiCpu className="nav-item-icon" />,
  'Curiosity': <FiActivity className="nav-item-icon" />,
  'Contact': <FiMail className="nav-item-icon" />,
};

export default function Navbar({ brand, navLinks = [] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState('#hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    const handleHash = () => {
      if (window.location.hash) {
        setActiveHash(window.location.hash);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', handleHash);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`cinematic-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="cinematic-nav-container">
        {/* Left: Film Brand Identity */}
        <a href="#hero" className="nav-brand-box" onClick={closeMobileMenu}>
          <div className="brand-rec-badge">
            <span className="rec-dot" />
            <span className="rec-text">REC</span>
          </div>
          <div className="brand-titles">
            <span className="brand-main-name">{brand?.name || 'UDARA LAKSHAN'}</span>
            <span className="brand-sub-tag">{brand?.directorTitle || 'FULL-STACK & AI ARCHITECT'}</span>
          </div>
        </a>

        {/* Center/Right: Desktop Navigation & Scenes */}
        <div className="nav-desktop-section">
          <nav className="cinema-nav-links" aria-label="Editorial Chapters">
            <ul className="cinema-nav-list">
              {navLinks.map((item, index) => {
                const isActive = activeHash === item.href;
                return (
                  <li key={index} className="cinema-nav-item">
                    <a
                      href={item.href}
                      className={`cinema-nav-link ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveHash(item.href)}
                    >
                      {item.chapterNum && (
                        <span className="nav-scene-num">{item.chapterNum}</span>
                      )}
                      <span className="nav-scene-label">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Controls: Theme & Resume */}
          <div className="nav-actions-wrap">
            <ThemeToggle />

            <a
              href="/Udara_Lakshan_CV.pdf"
              download="Udara_Lakshan_CV.pdf"
              className="nav-action-cv-btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download CV"
            >
              <FiDownload className="cv-icon" />
              <span>Resume</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              className="cinema-hamburger-btn"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`cinema-mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <div className="brand-rec-badge">
            <span className="rec-dot" />
            <span className="rec-text">CHAPTER SELECTOR</span>
          </div>
          <button className="mobile-close-btn" onClick={closeMobileMenu} aria-label="Close">
            <FaTimes />
          </button>
        </div>

        <div className="mobile-theme-bar">
          <span className="mobile-theme-title">Interface Mode</span>
          <ThemeToggle showLabel />
        </div>

        <nav className="mobile-scene-nav" aria-label="Mobile Chapter Navigation">
          <ul className="mobile-scene-list">
            {navLinks.map((item, index) => (
              <li key={index} className="mobile-scene-item">
                <a
                  href={item.href}
                  className="mobile-scene-link"
                  onClick={closeMobileMenu}
                >
                  <div className="mobile-scene-left">
                    {item.chapterNum && (
                      <span className="mobile-scene-tag">{item.chapterNum}</span>
                    )}
                    <span className="mobile-scene-icon">
                      {NAV_ICONS[item.label] || <FiCompass />}
                    </span>
                    <span className="mobile-scene-name">{item.label}</span>
                  </div>
                  <span className="mobile-scene-arrow">→</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mobile-cv-cta-wrap">
            <a
              href="/Udara_Lakshan_CV.pdf"
              download="Udara_Lakshan_CV.pdf"
              className="mobile-full-cv-btn"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
            >
              <FiDownload />
              <span>Download Official Resume (PDF)</span>
            </a>
          </div>
        </nav>
      </div>

      {/* Overlay Backdrop */}
      {mobileMenuOpen && (
        <div className="cinema-backdrop" onClick={closeMobileMenu} />
      )}
    </header>
  );
}
