"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Photo = { src: string; alt: string; position?: string };

export default function PhotoCarousel({ photos }: { photos: Photo[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (!track || !slide) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2, behavior: reduce ? "auto" : "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      Array.from(track.children).forEach((child, i) => {
        const el = child as HTMLElement;
        const dist = Math.abs(el.offsetLeft + el.clientWidth / 2 - mid);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      setActive(best);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    track.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => { track.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") { event.preventDefault(); goTo(Math.min(active + 1, photos.length - 1)); }
    if (event.key === "ArrowLeft") { event.preventDefault(); goTo(Math.max(active - 1, 0)); }
  };

  return (
    <div className="carousel" role="region" aria-roledescription="carrossel" aria-label="Fotografias de Ana e André">
      <div className="carousel-track" ref={trackRef} tabIndex={0} onKeyDown={onKeyDown}>
        {photos.map((photo, i) => (
          <figure className={`carousel-slide${i === active ? " is-active" : ""}`} key={photo.src} aria-label={`Foto ${i + 1} de ${photos.length}`}>
            <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" draggable={false} style={{ objectPosition: photo.position }} />
          </figure>
        ))}
      </div>
      <div className="carousel-controls">
        <button type="button" className="carousel-arrow" onClick={() => goTo(Math.max(active - 1, 0))} disabled={active === 0} aria-label="Foto anterior">‹</button>
        <div className="carousel-dots">
          {photos.map((photo, i) => (
            <button type="button" key={photo.src} className={i === active ? "is-active" : ""} onClick={() => goTo(i)} aria-label={`Ir para a foto ${i + 1}`} aria-current={i === active} />
          ))}
        </div>
        <button type="button" className="carousel-arrow" onClick={() => goTo(Math.min(active + 1, photos.length - 1))} disabled={active === photos.length - 1} aria-label="Foto seguinte">›</button>
      </div>
    </div>
  );
}
