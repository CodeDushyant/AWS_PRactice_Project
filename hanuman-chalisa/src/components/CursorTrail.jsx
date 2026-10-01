import { useEffect, useRef } from "react";

const TEXT = "राम राम";
const INTERVAL = 55;

// spawns fading "राम राम" text on mousemove. appends straight to <body>
// and removes itself on animationend, skips React state entirely
export default function CursorTrail() {
  const lastCreatedRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    function onMouseMove(event) {
      const now = Date.now();
      if (now - lastCreatedRef.current < INTERVAL) return;
      lastCreatedRef.current = now;

      const particle = document.createElement("span");
      particle.className = "ram-pointer";
      particle.textContent = TEXT;
      particle.style.left = `${event.clientX}px`;
      particle.style.top = `${event.clientY}px`;

      const randomX = Math.round(Math.random() * 50 - 25);
      const randomY = Math.round(45 + Math.random() * 35);
      const randomRotate = Math.round(Math.random() * 20 - 10);

      particle.style.setProperty("--x", `${randomX}px`);
      particle.style.setProperty("--y", `${randomY}px`);
      particle.style.setProperty("--rotate", `${randomRotate}deg`);

      document.body.appendChild(particle);
      particle.addEventListener("animationend", () => particle.remove(), {
        once: true,
      });
    }

    document.addEventListener("mousemove", onMouseMove);
    return () => document.removeEventListener("mousemove", onMouseMove);
  }, []);

  return null;
}
