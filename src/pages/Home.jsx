import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/hero/Hero';
import About from '../components/about/About';
import Portfolio from '../components/portfolio/Portfolio';
import Contact from '../components/contact/Contact';
import Footer from '../components/layout/Footer';
import { portfolioData } from '../data/content';

export default function Home() {
  return (
    <div className="home-page">
      <Navbar brand={portfolioData.brand} navLinks={portfolioData.navLinks} />
      <main>
        <Hero data={portfolioData} />
        <About data={portfolioData.about} />
        <Portfolio projects={portfolioData.projects} />
        <Contact data={portfolioData.contact} />
      </main>
      <Footer brand={portfolioData.brand} />
    </div>
  );
}
