import React, { useEffect, useRef } from 'react';
import './CyberBackground.css';

export default function CyberBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    const mouse = {
      x: null,
      y: null,
      radius: 140,
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

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.65;
        this.vy = (Math.random() - 0.5) * 0.65;
        this.color = Math.random() > 0.4 ? 'rgba(10, 99, 255, ' : 'rgba(0, 242, 254, ';
        this.opacity = Math.random() * 0.6 + 0.2;
      }

      update() {
        // Move with velocity
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around boundaries
        if (this.x < 0) this.x = width;
        else if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        else if (this.y > height) this.y = 0;

        // Mouse reaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const dirX = (dx / dist) * force * 3;
            const dirY = (dy / dist) * force * 3;
            this.x -= dirX;
            this.y -= dirY;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}${this.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00f2fe';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    let particles = [];
    const particleCount = Math.min(85, Math.floor((width * height) / 16000));

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    initParticles();

    // Render loop
    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineOpacity = (1 - dist / 110) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(10, 99, 255, ${lineOpacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Update & draw particles
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
  }, []);

  return (
    <div className="cyber-bg-wrapper" aria-hidden="true">
      {/* Dynamic 3D Particle Constellation Canvas */}
      <canvas ref={canvasRef} className="cyber-bg-canvas" />

      {/* Futuristic cyber digital grid */}
      <div className="cyber-bg-grid" />

      {/* Floating luminous orbs in background */}
      <div className="cyber-orb cyber-orb--blue" />
      <div className="cyber-orb cyber-orb--cyan" />
      <div className="cyber-orb cyber-orb--purple" />

      {/* Vignette overlay */}
      <div className="cyber-bg-vignette" />
    </div>
  );
}
