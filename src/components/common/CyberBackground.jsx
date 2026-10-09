import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './CyberBackground.css';

export default function CyberBackground() {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: null,
      y: null,
      radius: 150,
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.8;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.isGold = Math.random() > 0.35;
        this.opacity = isDark ? (Math.random() * 0.55 + 0.15) : (Math.random() * 0.4 + 0.2);
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        else if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        else if (this.y > height) this.y = 0;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const dirX = (dx / dist) * force * 2.5;
            const dirY = (dy / dist) * force * 2.5;
            this.x -= dirX;
            this.y -= dirY;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        if (isDark) {
          ctx.fillStyle = this.isGold
            ? `rgba(212, 175, 55, ${this.opacity})`
            : `rgba(243, 208, 130, ${this.opacity * 0.8})`;
          ctx.shadowBlur = this.isGold ? 6 : 3;
          ctx.shadowColor = '#d4af37';
        } else {
          ctx.fillStyle = this.isGold
            ? `rgba(184, 134, 11, ${this.opacity})`
            : `rgba(212, 175, 55, ${this.opacity * 0.7})`;
          ctx.shadowBlur = 3;
          ctx.shadowColor = 'rgba(184, 134, 11, 0.3)';
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    let particles = [];
    const particleCount = Math.min(80, Math.floor((width * height) / 18000));

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    initParticles();

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Connecting subtle lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineOpacity = (1 - dist / 110) * (isDark ? 0.14 : 0.1);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(212, 175, 55, ${lineOpacity})`
              : `rgba(184, 134, 11, ${lineOpacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDark]);

  return (
    <div className="cinema-bg-wrapper" aria-hidden="true">
      <canvas ref={canvasRef} className="cinema-bg-canvas" />
      <div className="cinema-bg-grid" />
      <div className="cinema-ambient-orb cinema-orb--gold" />
      <div className="cinema-ambient-orb cinema-orb--amber" />
      <div className="cinema-ambient-orb cinema-orb--cyan" />
      <div className="cinema-bg-vignette" />
    </div>
  );
}
