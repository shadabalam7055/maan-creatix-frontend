'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // Setup lightweight intersection observer for elements with reveal classes
    const timer = setTimeout(() => {
      const observerOptions = {
        root: null,
        rootMargin: '-30px 0px -30px 0px', // slightly offset for early triggering
        threshold: 0.05,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      const revealElements = document.querySelectorAll(
        '.reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-zoom, .reveal-stagger-container'
      );
      revealElements.forEach((el) => observer.observe(el));

      return () => {
        observer.disconnect();
      };
    }, 150); // small delay to let page finish rendering

    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
}
