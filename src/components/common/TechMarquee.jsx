import React from 'react';
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiJavascript,
  SiTypescript,
  SiMongodb,
  SiMysql,
  SiTailwindcss,
  SiGit,
  SiPostman,
  SiVercel,
  SiSpring,
  SiGoogle,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { FiCpu } from 'react-icons/fi';
import './TechMarquee.css';

const TECH_ICONS = {
  'React.js': <SiReact color="#61DAFB" />,
  'Next.js': <SiNextdotjs color="#FFFFFF" />,
  'Google Gemini AI': <SiGoogle color="#00F2FE" />,
  'Node.js': <SiNodedotjs color="#68A063" />,
  'Express.js': <SiExpress color="#E0E0E0" />,
  'Java': <FaJava color="#E76F00" />,
  'Spring Boot': <SiSpring color="#6DB33F" />,
  'JavaScript (ES6+)': <SiJavascript color="#F7DF1E" />,
  'TypeScript': <SiTypescript color="#3178C6" />,
  'MongoDB': <SiMongodb color="#47A248" />,
  'MySQL': <SiMysql color="#4479A1" />,
  'Tailwind CSS': <SiTailwindcss color="#38BDF8" />,
  'Three.js': <FiCpu color="#00F2FE" />,
  'Git & GitHub': <SiGit color="#F05032" />,
  'Postman': <SiPostman color="#FF6C37" />,
  'Vercel': <SiVercel color="#FFFFFF" />,
};

export default function TechMarquee({ items = [] }) {
  // Duplicate list to achieve continuous infinite looping without seams
  const marqueeItems = [...items, ...items];

  return (
    <section id="tech-stack" className="tech-marquee-section" aria-label="Core Tech Stack Marquee">
      <div className="marquee-header-pill">
        <span className="marquee-pulse-dot" />
        <span>TECHNOLOGY ECOSYSTEM &amp; FRAMEWORKS</span>
      </div>

      <div className="marquee-viewport">
        {/* Left and Right Fade Gradients */}
        <div className="marquee-gradient-fade marquee-gradient-fade--left" />
        <div className="marquee-gradient-fade marquee-gradient-fade--right" />

        {/* Scrolling Track */}
        <div className="marquee-track">
          {marqueeItems.map((tech, idx) => (
            <div key={`${tech.name}-${idx}`} className="tech-badge-card">
              <div className="tech-icon-wrapper" style={{ borderColor: `${tech.color}33` }}>
                {TECH_ICONS[tech.name] || <FiCpu color={tech.color} />}
              </div>
              <div className="tech-info">
                <span className="tech-name">{tech.name}</span>
                <span className="tech-cat">{tech.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
