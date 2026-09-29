import React from 'react';
import HeroText from './HeroText';
import SideInfo from './SideInfo';
import HeroPortrait from './HeroPortrait';
import './Hero.css';

/**
 * Hero section:
 * - Desktop: Portrait absolutely centered in hero, text on left/right columns.
 * - Mobile: Text content first (order 1), portrait image stacked below (order 2).
 */
export default function Hero({ data }) {
  const { hero, aboutMe, myWork, followMe } = data || {};

  return (
    <section id="hero" className="hero-wrapper">
      {/* ── Vignette (desktop only) ── */}
      <div className="hero-vignette" aria-hidden="true" />

      {/* ── Mobile-first wrapper: text on top, portrait below ── */}
      <div className="hero-inner-wrapper">
        {/* Content grid (text columns) */}
        <div className="hero-container">
          {/* LEFT Column: Main heading & CTAs */}
          <div className="hero-col hero-col-left">
            <HeroText hero={hero} />
          </div>

          {/* RIGHT Column: Side info cards */}
          <div className="hero-col hero-col-right">
            <SideInfo aboutMe={aboutMe} myWork={myWork} followMe={followMe} />
          </div>
        </div>

        {/* Portrait — absolutely placed on desktop, stacked below on mobile */}
        <HeroPortrait imageSrc="/images/profile.png" />
      </div>
    </section>
  );
}
