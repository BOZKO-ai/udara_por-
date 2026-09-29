import React from 'react';
import HeroText from './HeroText';
import SideInfo from './SideInfo';
import HeroPortrait from './HeroPortrait';
import './Hero.css';

/**
 * Hero section:
 * - Center developer portrait matching reference screenshot.
 * - Left-side subtle gradient vignette keeps text readable.
 * - Content grid (left + right columns) sits on top.
 */
export default function Hero({ data }) {
  const { hero, aboutMe, myWork, followMe } = data || {};

  return (
    <section id="hero" className="hero-wrapper">

      {/* ── Center Developer Portrait (Matches Screenshot) ── */}
      <HeroPortrait imageSrc="/images/profile.jpg" />

      {/* ── Left-to-right gradient vignette so text stays readable ── */}
      <div className="hero-vignette" aria-hidden="true" />

      {/* ── Content grid sits on top ── */}
      <div className="hero-container">
        {/* LEFT Column */}
        <div className="hero-col hero-col-left">
          <HeroText hero={hero} />
        </div>

        {/* RIGHT Column */}
        <div className="hero-col hero-col-right">
          <SideInfo aboutMe={aboutMe} myWork={myWork} followMe={followMe} />
        </div>
      </div>

    </section>
  );
}
