import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/hero/Hero';
import TechMarquee from '../components/common/TechMarquee';
import About from '../components/about/About';
import Certifications from '../components/certifications/Certifications';
import Portfolio from '../components/portfolio/Portfolio';
import InteractiveGlobe from '../components/globe/InteractiveGlobe';
import SkillsArsenal from '../components/skills/SkillsArsenal';
import ChapterCuriosity from '../components/curiosity/ChapterCuriosity';
import Contact from '../components/contact/Contact';
import Footer from '../components/layout/Footer';
import CyberBackground from '../components/common/CyberBackground';
import CursorFollower from '../components/common/CursorFollower';
import SceneHUD from '../components/common/SceneHUD';
import AnimationEngine from '../components/common/AnimationEngine';
import { portfolioData } from '../data/content';

export default function Home() {
  return (
    <div className="home-page">
      {/* ── Subtle Film Grain Overlay ── */}
      <div className="film-grain-overlay" aria-hidden="true" />

      {/* ── Background Atmospheric Particles & Ambient Orbs ── */}
      <CyberBackground />

      {/* ── Editorial Chapter HUD Tracker (Right Rail) ── */}
      <SceneHUD />

      {/* ── GSAP Scroll & Hover Animation Engine ── */}
      <AnimationEngine />

      {/* ── Interactive Cursor Follower ── */}
      <CursorFollower />

      {/* ── Main Editorial Top Navigation ── */}
      <Navbar brand={portfolioData.brand} navLinks={portfolioData.navLinks} />

      {/* ── Main Story Chapters ── */}
      <main>
        {/* Opening — My Identity (Blurred-to-Sharp Reveal) */}
        <Hero data={portfolioData} />

        {/* Continuous Technology Reel */}
        <TechMarquee items={portfolioData.techStack} />

        {/* Chapter 01 — My Journey (SLIATE Kandy Distinction, Academic Narrative) */}
        <About data={portfolioData.about} />

        {/* Milestones & Verified Credentials */}
        <Certifications certifications={portfolioData.certifications} />

        {/* Chapter 02 — My Work (Shopease-AI, SmartLedger-LK, Hardware Inventory) */}
        <Portfolio projects={portfolioData.projects} />

        {/* Chapter 03 — Digital World & Interactive 3D Globe */}
        <InteractiveGlobe />

        {/* Chapter 04 — Craftsmanship & Technical Arsenal */}
        <SkillsArsenal data={portfolioData.skillsMatrix} />

        {/* Chapter 05 — Curiosity & Creative Philosophy */}
        <ChapterCuriosity />

        {/* Final Chapter — Contact & Departure */}
        <Contact data={portfolioData.contact} />
      </main>

      {/* ── Editorial End Credits Footer ── */}
      <Footer brand={portfolioData.brand} />
    </div>
  );
}
