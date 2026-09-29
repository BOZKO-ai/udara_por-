import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function ScrollButton({ targetId = "about-section" }) {
  const handleScroll = () => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If target section is not yet mounted, scroll down one viewport height
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  };

  return (
    <button
      className="hero-scroll-btn"
      onClick={handleScroll}
      aria-label="Scroll to next section"
      title="Scroll down"
    >
      <FaChevronDown className="scroll-arrow-icon" />
    </button>
  );
}
