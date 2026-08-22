"use client";

import { useEffect, useRef, RefObject } from "react";

interface ParallaxOptions {
  speed?: number;
  damping?: number;
}

/**
 * Scroll-driven parallax with damping.
 * Returns a ref to attach and applies transform directly via DOM
 * so there are zero React re-renders on the scroll path.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: ParallaxOptions = {}
): RefObject<T> {
  const { speed = 0.5, damping = 0.12 } = options;
  const ref = useRef<T>(null);
  const targetRef = useRef(0);
  const currentRef = useRef(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let rafId: number;
    let lastTarget = 0;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distance = elementCenter - viewportCenter;
      lastTarget = distance * speed;
      targetRef.current = lastTarget;
    };

    const tick = () => {
      currentRef.current += (targetRef.current - currentRef.current) * damping;

      // Only touch the DOM when the value actually changes
      if (Math.abs(currentRef.current - targetRef.current) > 0.01) {
        element!.style.transform = `translateY(${currentRef.current}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once immediately so elements are positioned before first paint
    handleScroll();
    currentRef.current = targetRef.current;
    element.style.transform = `translateY(${currentRef.current}px)`;
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed, damping]);

  return ref;
}
