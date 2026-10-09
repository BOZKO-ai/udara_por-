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
  'Google Gemini AI': <SiGoogle color="#F3D082" />,
  'Node.js': <SiNodedotjs color="#68A063" />,
  'Express.js': <SiExpress color="#E0E0E0" />,
  'Java': <FaJava color="#E76F00" />,
  'Spring Boot': <SiSpring color="#6DB33F" />,
  'JavaScript (ES6+)': <SiJavascript color="#F7DF1E" />,
  'TypeScript': <SiTypescript color="#3178C6" />,
  'MongoDB': <SiMongodb color="#47A248" />,
  'MySQL': <SiMysql color="#4479A1" />,
  'Tailwind CSS': <SiTailwindcss color="#38BDF8" />,
  'Three.js': <FiCpu color="#D4AF37" />,
  'Git & GitHub': <SiGit color="#F05032" />,
  'Postman': <SiPostman color="#FF6C37" />,
  'Vercel': <SiVercel color="#FFFFFF" />,
};

export default function TechMarquee({ items = [] }) {
  const marqueeItems = [...items, ...items, ...items];

  return (
    <section id="tech-marquee" className="cinema-tech-marquee" aria-label="Core Technology Reel">
      <div className="tech-marquee-header">
        <span className="marquee-rec-dot" />
        <span className="marquee-header-title">TECHNOLOGY ECOSYSTEM &amp; FRAMEWORKS REEL</span>
        <span className="marquee-code-tag">ACTIVE STACK</span>
      </div>

      <div className="tech-marquee-viewport">
        {/* Film edge fades */}
        <div className="tech-fade-edge tech-fade-left" />
        <div className="tech-fade-edge tech-fade-right" />

        {/* Scrolling Reel */}
        <div className="tech-track-loop">
          {marqueeItems.map((tech, idx) => (
            <div key={`${tech.name}-${idx}`} className="cinema-tech-card">
              <div
                className="cinema-tech-icon"
                style={{
                  borderColor: `${tech.color}40`,
                  background: `${tech.color}10`,
                }}
              >
                {TECH_ICONS[tech.name] || <FiCpu color={tech.color} />}
              </div>
              <div className="cinema-tech-meta">
                <span className="cinema-tech-name">{tech.name}</span>
                <span className="cinema-tech-cat">{tech.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
