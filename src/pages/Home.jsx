import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/hero/Hero';
import TechMarquee from '../components/common/TechMarquee';
import About from '../components/about/About';
import Certifications from '../components/certifications/Certifications';
import Portfolio from '../components/portfolio/Portfolio';
import Contact from '../components/contact/Contact';
import Footer from '../components/layout/Footer';
import CyberBackground from '../components/common/CyberBackground';
import CursorFollower from '../components/common/CursorFollower';
import { portfolioData } from '../data/content';

export default function Home() {
  return (
    <div className="home-page">
      {/* ── Background Animations: Interactive 3D Particle Constellation + Cyber Orbs ── */}
      <CyberBackground />

      {/* ── Foreground Animations: Cursor Glow Tracker ── */}
      <CursorFollower />

      {/* ── Main Layout ── */}
      <Navbar brand={portfolioData.brand} navLinks={portfolioData.navLinks} />
      <main>
        <Hero data={portfolioData} />
        <TechMarquee items={portfolioData.techStack} />
        <About data={portfolioData.about} />
        <Certifications certifications={portfolioData.certifications} />
        <Portfolio projects={portfolioData.projects} />
        <Contact data={portfolioData.contact} />
      </main>
      <Footer brand={portfolioData.brand} />
    </div>
  );
}
