import React from 'react';
import HeroText from './HeroText';
import SideInfo from './SideInfo';
import HeroPortrait from './HeroPortrait';
import './Hero.css';

export default function Hero({ data }) {
  const { hero, aboutMe, myWork, followMe } = data || {};

  return (
    <section id="hero" className="cinema-hero-wrapper">
      {/* Atmospheric Ambient Light Beam */}
      <div className="cinema-hero-light-beam" aria-hidden="true" />

      {/* Main Grid Content */}
      <div className="cinema-hero-inner">
        <div className="cinema-hero-grid">
          {/* LEFT Column: Film title, synopsis, CTA actions */}
          <div className="hero-col-cinema hero-col-left">
            <HeroText hero={hero} />
          </div>

          {/* CENTER Column: Dedicated Profile Portrait Stage */}
          <div className="hero-col-cinema hero-col-portrait">
            <HeroPortrait imageSrc="/images/profile.png" />
          </div>

          {/* RIGHT Column: Scene teaser cards & socials */}
          <div className="hero-col-cinema hero-col-right">
            <SideInfo aboutMe={aboutMe} myWork={myWork} followMe={followMe} />
          </div>
        </div>
      </div>
    </section>
  );
}
