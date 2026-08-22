"use client";

import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

/**
 * Maps direction to the starting (hidden) CSS transform value.
 * When visible, transform resets to "none".
 */
const hiddenTransforms: Record<string, string> = {
  up: "translateY(32px)",
  down: "translateY(-32px)",
  left: "translateX(32px)",
  right: "translateX(-32px)",
  fade: "none",
  scale: "scale(0.95)",
};

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  className = "",
  threshold = 0.1,
}: ScrollRevealProps) {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>({ threshold });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : hiddenTransforms[direction],
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
