import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';
import './Navbar.css';

/**
 * Navbar component for the portfolio header.
 * - Positioned absolutely at top with transparent backdrop.
 * - Features the blue code icon + brand name on the left.
 * - Desktop links with dropdown support on "Pages" and a hamburger icon.
 * - Fully responsive: collapses links into an interactive mobile drawer.
 */
export default function Navbar({ brand, navLinks = [] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Optional: add subtle blur when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Left: Brand Logo */}
        <a href="#hero" className="navbar-brand" onClick={closeMobileMenu}>
          <span className="brand-icon">
            <span className="code-bracket">&lt;</span>
            <span className="code-slash">/</span>
            <span className="code-bracket">&gt;</span>
          </span>
          <span className="brand-name">{brand?.name || 'Developer X'}</span>
        </a>

        {/* Right: Desktop Navigation + Hamburger */}
        <div className="navbar-right">
          <nav className="desktop-nav" aria-label="Main Navigation">
            <ul className="nav-list">
              {navLinks.map((item, index) => {
                if (item.hasDropdown) {
                  return (
                    <li
                      key={index}
                      className="nav-item dropdown-item"
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      <button
                        className="nav-link dropdown-toggle"
                        onClick={() => setDropdownOpen((prev) => !prev)}
                        aria-expanded={dropdownOpen}
                      >
                        <span>{item.label}</span>
                        <FaChevronDown className={`chevron-icon ${dropdownOpen ? 'rotated' : ''}`} />
                      </button>

                      {/* Dropdown Menu */}
                      <ul className={`dropdown-menu ${dropdownOpen ? 'active' : ''}`}>
                        {item.dropdownItems?.map((subItem, subIdx) => (
                          <li key={subIdx} className="dropdown-subitem">
                            <a
                              href={subItem.href}
                              className="dropdown-link"
                              onClick={() => setDropdownOpen(false)}
                            >
                              {subItem.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }

                return (
                  <li key={index} className="nav-item">
                    <a
                      href={item.href}
                      className={`nav-link ${item.label === 'Home' ? 'active' : ''}`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Download CV CTA Button */}
          <a
            href="/Udara_Lakshan_CV.pdf"
            download="Udara_Lakshan_CV.pdf"
            className="nav-cv-btn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download CV"
          >
            <FiDownload className="nav-cv-icon" />
            <span>Resume</span>
          </a>

          {/* Hamburger Menu Button */}
          <button
            className="hamburger-btn"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav" aria-label="Mobile Navigation">
          <ul className="mobile-nav-list">
            {navLinks.map((item, index) => (
              <li key={index} className="mobile-nav-item">
                {item.hasDropdown ? (
                  <div className="mobile-dropdown-group">
                    <button
                      className="mobile-nav-link dropdown-header"
                      onClick={() => setDropdownOpen((prev) => !prev)}
                    >
                      <span>{item.label}</span>
                      <FaChevronDown className={`chevron-icon ${dropdownOpen ? 'rotated' : ''}`} />
                    </button>
                    {dropdownOpen && (
                      <ul className="mobile-sublist">
                        {item.dropdownItems?.map((subItem, subIdx) => (
                          <li key={subIdx}>
                            <a
                              href={subItem.href}
                              className="mobile-sublink"
                              onClick={closeMobileMenu}
                            >
                              {subItem.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className={`mobile-nav-link ${item.label === 'Home' ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
            <li className="mobile-nav-item" style={{ marginTop: '1.25rem' }}>
              <a
                href="/Udara_Lakshan_CV.pdf"
                download="Udara_Lakshan_CV.pdf"
                className="mobile-cv-btn"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
              >
                <FiDownload style={{ marginRight: '0.5rem' }} />
                Download Resume (PDF)
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Backdrop overlay for mobile */}
      {mobileMenuOpen && (
        <div className="mobile-backdrop" onClick={closeMobileMenu} />
      )}
    </header>
  );
}
