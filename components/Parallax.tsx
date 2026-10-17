"use client";

import { useEffect } from "react";

export default function Parallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let frame = 0;

    function update() {
      frame = 0;
      const viewportCenter = window.innerHeight / 2;
      const strength = window.innerWidth < 700 ? 0.6 : 1;

      for (const element of elements) {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < -400 || rect.top > window.innerHeight + 400) continue;

        const speed = Number(element.dataset.parallax) || 0;
        const offset = rect.top + rect.height / 2 - viewportCenter;
        const current = Number.parseFloat(element.style.getPropertyValue("--py")) || 0;
        // rect already includes the current translate; remove it to get the untranslated position
        const base = offset - current;
        element.style.setProperty("--py", `${(base * speed * strength).toFixed(1)}px`);
      }
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
