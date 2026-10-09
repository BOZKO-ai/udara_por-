import React, { useState, useEffect } from 'react';
import './SceneHUD.css';

const SCENES = [
  { id: 'hero', label: 'IDENTITY', num: '00' },
  { id: 'journey', label: 'MY JOURNEY', num: '01' },
  { id: 'portfolio', label: 'MY WORK', num: '02' },
  { id: 'digital-world', label: 'DIGITAL WORLD', num: '03' },
  { id: 'tech-stack', label: 'CRAFTSMANSHIP', num: '04' },
  { id: 'curiosity', label: 'CURIOSITY', num: '05' },
  { id: 'contact', label: 'CONTACT', num: '06' },
];

export default function SceneHUD() {
  const [activeScene, setActiveScene] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0;
      setScrollProgress(progress);

      for (const scene of [...SCENES].reverse()) {
        const el = document.getElementById(scene.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveScene(scene.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToScene = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="scene-hud" aria-label="Editorial Chapter Navigation">
      {/* Vertical Progress Rail */}
      <div className="hud-rail">
        <div
          className="hud-rail-fill"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {/* Chapter Dots & Labels */}
      <nav className="hud-scenes-list">
        {SCENES.map((scene) => {
          const isActive = activeScene === scene.id;
          return (
            <button
              key={scene.id}
              className={`hud-scene-btn ${isActive ? 'active' : ''}`}
              onClick={() => scrollToScene(scene.id)}
              aria-label={`Scroll to Chapter ${scene.num} - ${scene.label}`}
              title={`CH ${scene.num} // ${scene.label}`}
            >
              <span className="hud-scene-num">{scene.num}</span>
              <span className="hud-scene-line" />
              <span className="hud-scene-label">{scene.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
