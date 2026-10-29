"use client";

import { useEffect, useRef } from "react";

export default function Parallax() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const parallaxElements = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const scrollElements = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll]"));
    let frame = 0;
    let observer: IntersectionObserver | undefined;

    if (!reduced && revealElements.length) {
      document.documentElement.classList.add("reveal-ready");
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const target = entry.target;
            if (entry.intersectionRatio >= 0.15) {
              target.classList.add("in-view");
              target.classList.remove("from-top");
            } else if (!entry.isIntersecting) {
              target.classList.remove("in-view");
              target.classList.toggle("from-top", entry.boundingClientRect.top < 0);
            }
          }
        },
        { threshold: [0, 0.15], rootMargin: "0px 0px -6% 0px" },
      );
      revealElements.forEach((element) => observer?.observe(element));
    }

    function update() {
      frame = 0;

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      progressRef.current?.style.setProperty("--progress", progress.toFixed(4));

      if (reduced) return;

      const viewportCenter = window.innerHeight / 2;
      const strength = window.innerWidth < 700 ? 0.6 : 1;

      const vh = window.innerHeight;
      const spWrites: [HTMLElement, string][] = [];
      for (const element of scrollElements) {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) continue;
        const sp = (vh - rect.top) / (vh + rect.height);
        spWrites.push([element, Math.min(1, Math.max(0, sp)).toFixed(3)]);
      }

      const pyWrites: [HTMLElement, string][] = [];
      for (const element of parallaxElements) {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < -400 || rect.top > vh + 400) continue;

        const speed = Number(element.dataset.parallax) || 0;
        const current = Number.parseFloat(element.style.getPropertyValue("--py")) || 0;
        // rect already includes the current translate; remove it to get the untranslated position
        const base = rect.top + rect.height / 2 - viewportCenter - current;
        pyWrites.push([element, `${(base * speed * strength).toFixed(1)}px`]);
      }

      for (const [element, value] of spWrites) element.style.setProperty("--sp", value);
      for (const [element, value] of pyWrites) element.style.setProperty("--py", value);
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
      observer?.disconnect();
      document.documentElement.classList.remove("reveal-ready");
    };
  }, []);

  return <div className="scroll-progress" ref={progressRef} aria-hidden="true" />;
}
