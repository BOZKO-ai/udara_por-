import React, { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import './BottomTimeline.css';

const TIMELINE_CHAPTERS = [
  { id: 'hero', num: '00', label: 'IDENTITY' },
  { id: 'journey', num: '01', label: 'MY JOURNEY' },
  { id: 'portfolio', num: '02', label: 'MY WORK' },
  { id: 'digital-world', num: '03', label: 'DIGITAL WORLD' },
  { id: 'tech-stack', num: '04', label: 'CRAFTSMANSHIP' },
  { id: 'curiosity', num: '05', label: 'CURIOSITY' },
  { id: 'contact', num: '06', label: 'CONTACT' },
];

export default function BottomTimeline() {
  const [activeChapter, setActiveChapter] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0;
      setScrollProgress(progress);

      for (const ch of [...TIMELINE_CHAPTERS].reverse()) {
        const el = document.getElementById(ch.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveChapter(ch.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToChapter = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bottom-timeline-bar" aria-label="Bottom Chapter Timeline">
      {/* Top Hairline Progress */}
      <div className="timeline-progress-track">
        <div
          className="timeline-progress-fill"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="timeline-inner-container">
        {/* Left: Current Chapter Indicator */}
        <div className="timeline-active-info">
          <span className="active-dot-lime" />
          <span className="active-chapter-text">
            {TIMELINE_CHAPTERS.find((c) => c.id === activeChapter)?.num} // {TIMELINE_CHAPTERS.find((c) => c.id === activeChapter)?.label}
          </span>
        </div>

        {/* Center: Timeline Step Buttons */}
        <nav className="timeline-steps-nav">
          {TIMELINE_CHAPTERS.map((ch) => {
            const isActive = activeChapter === ch.id;
            return (
              <button
                key={ch.id}
                className={`timeline-step-btn ${isActive ? 'active' : ''}`}
                onClick={() => scrollToChapter(ch.id)}
                aria-label={`Jump to Chapter ${ch.num} - ${ch.label}`}
              >
                <span className="step-num">{ch.num}</span>
                <span className="step-label">{ch.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Quick Back to Top */}
        <button
          className="timeline-top-btn"
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Top of page"
        >
          <span>TOP</span>
          <FiArrowUp />
        </button>
      </div>
    </div>
  );
}
