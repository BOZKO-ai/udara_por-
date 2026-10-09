/**
 * useScrollReveal — Shared scroll-triggered animation hook
 * Uses GSAP + ScrollTrigger for smooth, performant scroll animations
 */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animate elements into view with a fade-slide-up effect.
 * @param {string} selector  - CSS selector for children to animate
 * @param {object} options   - GSAP overrides
 */
export function useScrollReveal(selector, options = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const elements = containerRef.current.querySelectorAll(selector);
    if (!elements.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: options.y ?? 50,
          scale: options.scale ?? 1,
          filter: options.blur ? 'blur(8px)' : 'none',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: options.duration ?? 0.85,
          ease: options.ease ?? 'power3.out',
          stagger: options.stagger ?? 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: options.start ?? 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [selector, options.y, options.scale, options.blur, options.duration, options.ease, options.stagger, options.start]);

  return containerRef;
}

/**
 * Parallax scroll effect on an element.
 * @param {number} speed - parallax speed multiplier (0.1 = subtle, 0.5 = strong)
 */
export function useParallax(speed = 0.2) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: speed * 40,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [speed]);

  return ref;
}

/**
 * Horizontal slide-in for timeline / marquee-style elements
 */
export function useHorizontalReveal(direction = 'left') {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          x: direction === 'left' ? -80 : 80,
          filter: 'blur(6px)',
        },
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [direction]);

  return ref;
}

/**
 * Clip-path cinematic reveal — wipes in like a film shutter opening
 */
export function useClipReveal() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Number counter animation for stat values
 */
export function useCountUp(target, duration = 1.5) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const numericTarget = parseFloat(String(target).replace(/[^\d.]/g, ''));
    if (isNaN(numericTarget)) return;

    const suffix = String(target).replace(/[\d.]/g, '');
    let obj = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: numericTarget,
        duration,
        ease: 'power2.out',
        snap: { val: Number.isInteger(numericTarget) ? 1 : 0.01 },
        onUpdate() {
          if (ref.current) {
            ref.current.textContent = obj.val.toFixed(Number.isInteger(numericTarget) ? 0 : 2) + suffix;
          }
        },
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, [target, duration]);

  return ref;
}
