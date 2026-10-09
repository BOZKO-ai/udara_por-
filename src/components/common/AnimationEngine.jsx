/**
 * AnimationEngine.jsx
 * 
 * Centralized GSAP ScrollTrigger animation engine.
 * Initializes ALL scroll-based, hover, and entrance animations
 * without touching component structure or design.
 * 
 * Renders nothing — purely a side-effect component.
 */
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AnimationEngine() {
  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {

      // ─────────────────────────────────────────────────────────────────────
      // 1. SECTION HEADER REVEALS
      //    Chapter badges, editorial titles, subheadlines
      // ─────────────────────────────────────────────────────────────────────

      // Chapter badge pills — scale + fade in
      gsap.utils.toArray('.chapter-badge-wrap, .scene-badge-wrapper').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, scale: 0.82, y: 20 },
          {
            opacity: 1, scale: 1, y: 0,
            duration: 0.7,
            ease: 'back.out(1.6)',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Editorial section titles — split into line reveals
      gsap.utils.toArray('.editorial-title, .section-cinematic-title').forEach((heading) => {
        // Wrap each child (lines) for overflow clip
        const lines = heading.querySelectorAll('.cinematic-title-line');
        const targets = lines.length ? lines : [heading];

        gsap.fromTo(targets,
          { opacity: 0, y: 55, skewY: 1.5 },
          {
            opacity: 1, y: 0, skewY: 0,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: heading,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Section subheadlines
      gsap.utils.toArray('.section-cinematic-subhead, .editorial-subhead').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30, filter: 'blur(4px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ─────────────────────────────────────────────────────────────────────
      // 2. ABOUT SECTION — Bio paragraphs + Education card + Stats
      // ─────────────────────────────────────────────────────────────────────

      gsap.utils.toArray('.bio-text').forEach((p, i) => {
        gsap.fromTo(p,
          { opacity: 0, x: -40, filter: 'blur(6px)' },
          {
            opacity: 1, x: 0, filter: 'blur(0px)',
            duration: 0.85,
            ease: 'expo.out',
            delay: i * 0.12,
            scrollTrigger: {
              trigger: p,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Education card — reveal from bottom with scale
      const eduCard = document.querySelector('.cinema-education-card');
      if (eduCard) {
        gsap.fromTo(eduCard,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.9,
            ease: 'back.out(1.3)',
            scrollTrigger: {
              trigger: eduCard,
              start: 'top 87%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Stat items — stagger up from bottom
      gsap.utils.toArray('.cinema-stat-item').forEach((stat, i) => {
        gsap.fromTo(stat,
          { opacity: 0, y: 35, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.65,
            ease: 'back.out(1.5)',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: stat.closest('.cinema-stats-grid') || stat,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Skill meter bars — draw from 0
      gsap.utils.toArray('.skill-meter-fill').forEach((bar) => {
        const targetWidth = bar.style.width || '0%';
        bar.style.width = '0%';
        gsap.to(bar, {
          width: targetWidth,
          duration: 1.3,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      });

      // ─────────────────────────────────────────────────────────────────────
      // 3. CERTIFICATIONS — Cards cascade in with stagger
      // ─────────────────────────────────────────────────────────────────────

      gsap.utils.toArray('.cinema-cert-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 60, scale: 0.93, rotateX: 8 },
          {
            opacity: 1, y: 0, scale: 1, rotateX: 0,
            duration: 0.8,
            ease: 'expo.out',
            delay: i * 0.08,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ─────────────────────────────────────────────────────────────────────
      // 4. PORTFOLIO SECTION — Image frames with clip wipe + card body
      // ─────────────────────────────────────────────────────────────────────

      gsap.utils.toArray('.cinema-poster-frame').forEach((frame, i) => {
        gsap.fromTo(frame,
          { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
          {
            clipPath: 'inset(0% 0 0 0)',
            opacity: 1,
            duration: 1.1,
            ease: 'expo.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: frame,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      gsap.utils.toArray('.cinema-card-body').forEach((body, i) => {
        gsap.fromTo(body,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0,
            duration: 0.75,
            ease: 'power3.out',
            delay: i * 0.1 + 0.25,
            scrollTrigger: {
              trigger: body,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Filter buttons
      const filterBar = document.querySelector('.cinema-portfolio-filters');
      if (filterBar) {
        gsap.fromTo(filterBar,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: filterBar,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // ─────────────────────────────────────────────────────────────────────
      // 5. GLOBE SECTION — Text left, globe right parallax tilt
      // ─────────────────────────────────────────────────────────────────────

      const globeSection = document.querySelector('#digital-world');
      if (globeSection) {
        const header = globeSection.querySelector('.scene-header-block');
        if (header) {
          gsap.fromTo(header,
            { opacity: 0, x: -60, filter: 'blur(8px)' },
            {
              opacity: 1, x: 0, filter: 'blur(0px)',
              duration: 1.2,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        const globeCanvas = globeSection.querySelector('canvas, .globe-canvas-wrapper');
        if (globeCanvas) {
          gsap.fromTo(globeCanvas,
            { opacity: 0, scale: 0.82 },
            {
              opacity: 1, scale: 1,
              duration: 1.4,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: globeCanvas,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      }

      // ─────────────────────────────────────────────────────────────────────
      // 6. SKILLS ARSENAL — Category nav buttons + skill items
      // ─────────────────────────────────────────────────────────────────────

      const navDeck = document.querySelector('.arsenal-nav-deck');
      if (navDeck) {
        gsap.fromTo(navDeck,
          { opacity: 0, x: -50, filter: 'blur(6px)' },
          {
            opacity: 1, x: 0, filter: 'blur(0px)',
            duration: 1.0,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: navDeck,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      const displayStage = document.querySelector('.arsenal-display-stage');
      if (displayStage) {
        gsap.fromTo(displayStage,
          { opacity: 0, x: 50, filter: 'blur(6px)' },
          {
            opacity: 1, x: 0, filter: 'blur(0px)',
            duration: 1.0,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: displayStage,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // ─────────────────────────────────────────────────────────────────────
      // 7. CURIOSITY SECTION — Pillar cards scale cascade
      // ─────────────────────────────────────────────────────────────────────

      gsap.utils.toArray('.curiosity-pillar-card, .curiosity-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 70, scale: 0.9, rotateY: 8 },
          {
            opacity: 1, y: 0, scale: 1, rotateY: 0,
            duration: 0.9,
            ease: 'expo.out',
            delay: i * 0.12,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ─────────────────────────────────────────────────────────────────────
      // 8. CONTACT SECTION — Left info + right form
      // ─────────────────────────────────────────────────────────────────────

      const contactLeft = document.querySelector('.contact-meta-col');
      const contactRight = document.querySelector('.contact-form-col');

      if (contactLeft) {
        gsap.fromTo(contactLeft,
          { opacity: 0, x: -55, filter: 'blur(6px)' },
          {
            opacity: 1, x: 0, filter: 'blur(0px)',
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: contactLeft,
              start: 'top 86%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (contactRight) {
        gsap.fromTo(contactRight,
          { opacity: 0, x: 55, filter: 'blur(6px)' },
          {
            opacity: 1, x: 0, filter: 'blur(0px)',
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: contactRight,
              start: 'top 86%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Contact detail items — stagger
      gsap.utils.toArray('.detail-item, .contact-status-card').forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, y: 22 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ─────────────────────────────────────────────────────────────────────
      // 9. TECH MARQUEE — Fade in from bottom
      // ─────────────────────────────────────────────────────────────────────

      const marquee = document.querySelector('.cinema-tech-marquee');
      if (marquee) {
        gsap.fromTo(marquee,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: marquee,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // ─────────────────────────────────────────────────────────────────────
      // 10. BACKGROUND PARALLAX — Ambient glows float at different speeds
      // ─────────────────────────────────────────────────────────────────────

      gsap.utils.toArray('.scene-ambient-glow').forEach((glow, i) => {
        gsap.to(glow, {
          yPercent: i % 2 === 0 ? -18 : 18,
          ease: 'none',
          scrollTrigger: {
            trigger: glow.closest('section') || glow,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2.5,
          },
        });
      });

      // Hero light beam parallax
      const heroBeam = document.querySelector('.cinema-hero-light-beam');
      if (heroBeam) {
        gsap.to(heroBeam, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
          },
        });
      }

      // ─────────────────────────────────────────────────────────────────────
      // 11. NAVBAR — Subtle reveal animation on load
      // ─────────────────────────────────────────────────────────────────────

      const navbar = document.querySelector('.cinematic-navbar');
      if (navbar) {
        gsap.fromTo(navbar,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 1.8 }
        );
      }

      // ─────────────────────────────────────────────────────────────────────
      // 12. HOVER: MAGNETIC CARD EFFECT on Project & Cert Cards
      // ─────────────────────────────────────────────────────────────────────

      const interactiveCards = document.querySelectorAll('.cinema-project-card, .cinema-cert-card');

      interactiveCards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = (e.clientX - cx) / (rect.width / 2);
          const dy = (e.clientY - cy) / (rect.height / 2);

          gsap.to(card, {
            rotateY: dx * 6,
            rotateX: -dy * 4,
            scale: 1.025,
            duration: 0.4,
            ease: 'power2.out',
            transformPerspective: 1000,
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.6,
            ease: 'elastic.out(1, 0.7)',
            transformPerspective: 1000,
          });
        });
      });

      // ─────────────────────────────────────────────────────────────────────
      // 13. HOVER: BUTTON magnetic pull
      // ─────────────────────────────────────────────────────────────────────

      const primaryBtns = document.querySelectorAll('.btn-lime-primary, .cinema-submit-btn');

      primaryBtns.forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = (e.clientX - cx) * 0.25;
          const dy = (e.clientY - cy) * 0.25;

          gsap.to(btn, {
            x: dx, y: dy,
            duration: 0.35,
            ease: 'power2.out',
          });
        });

        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, {
            x: 0, y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)',
          });
        });
      });

      // ─────────────────────────────────────────────────────────────────────
      // 14. SCENE HUD — Slide in from right
      // ─────────────────────────────────────────────────────────────────────

      const hud = document.querySelector('.scene-hud');
      if (hud) {
        gsap.fromTo(hud,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 2.2 }
        );
      }

      // ─────────────────────────────────────────────────────────────────────
      // 15. HERO SIDE CARDS — Slide in from right with stagger
      // ─────────────────────────────────────────────────────────────────────

      gsap.utils.toArray('.cinema-scene-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, x: 50, filter: 'blur(8px)' },
          {
            opacity: 1, x: 0, filter: 'blur(0px)',
            duration: 0.85,
            ease: 'expo.out',
            delay: 1.2 + i * 0.18,
          }
        );
      });

      gsap.utils.toArray('.cinema-social-pill').forEach((pill, i) => {
        gsap.fromTo(pill,
          { opacity: 0, x: 30 },
          {
            opacity: 1, x: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: 1.5 + i * 0.1,
          }
        );
      });

    }); // end gsap.context

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
