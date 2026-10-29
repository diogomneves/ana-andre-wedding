"use client";

import { useEffect, useRef, useState } from "react";
import { START_MUSIC_EVENT } from "@/components/BackgroundMusic";

const PETAL_COLORS = ["rgba(126,161,200,.7)", "rgba(196,212,146,.85)", "rgba(233,207,140,.85)", "rgba(255,255,255,.9)"];

const petals = Array.from({ length: 16 }, (_, index) => ({
  x: `${(index * 37 + 8) % 100}%`,
  size: `${10 + ((index * 7) % 12)}px`,
  duration: `${9 + ((index * 5) % 7)}s`,
  delay: `${-((index * 13) % 15)}s`,
  color: PETAL_COLORS[index % PETAL_COLORS.length],
}));

const dust = Array.from({ length: 18 }, (_, index) => ({
  x: `${(index * 53 + 11) % 100}%`,
  size: `${3 + ((index * 5) % 5)}px`,
  duration: `${7 + ((index * 3) % 8)}s`,
  delay: `${-((index * 7) % 12)}s`,
}));

const burst = Array.from({ length: 22 }, (_, index) => ({
  angle: `${index * (360 / 22)}deg`,
  distance: `${110 + ((index * 37) % 90)}px`,
  delay: `${(index % 4) * 0.05}s`,
}));

const sparks = [
  { left: "12%", top: "10%", delay: "2.2s" },
  { left: "84%", top: "16%", delay: "2.8s" },
  { left: "8%", top: "74%", delay: "3.1s" },
  { left: "88%", top: "80%", delay: "2.5s" },
  { left: "50%", top: "5%", delay: "3.4s" },
];

export default function InvitationIntro() {
  const [done, setDone] = useState(false);
  const [opening, setOpening] = useState(false);
  const finishTimer = useRef<number | null>(null);

  useEffect(() => {
    document.body.classList.add("intro-lock");

    return () => {
      document.body.classList.remove("intro-lock");
      if (finishTimer.current) window.clearTimeout(finishTimer.current);
    };
  }, []);

  function finishInvitation() {
    setDone(true);
    document.body.classList.remove("intro-lock");
    window.scrollTo(0, 0);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (opening) return;
    const root = event.currentTarget;
    root.style.setProperty("--mx", (event.clientX / window.innerWidth - 0.5).toFixed(3));
    root.style.setProperty("--my", (event.clientY / window.innerHeight - 0.5).toFixed(3));
  }

  function openInvitation() {
    if (opening) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setOpening(true);
    window.dispatchEvent(new Event(START_MUSIC_EVENT));

    finishTimer.current = window.setTimeout(finishInvitation, reducedMotion ? 450 : 4400);
  }

  return (
    <div className={`gate-intro ${opening ? "is-opening" : ""} ${done ? "is-done" : ""}`} aria-label="Abrir convite de casamento" onPointerMove={onPointerMove}>
      <div className="gate-beam gate-beam-a" aria-hidden="true" />
      <div className="gate-beam gate-beam-b" aria-hidden="true" />
      <div className="gate-glow" aria-hidden="true" />
      <div className="gate-branch" aria-hidden="true" />
      <div className="gate-ribbon" aria-hidden="true" />
      <div className="gate-dust" aria-hidden="true">
        {dust.map((mote, index) => (
          <i key={index} style={{ "--x": mote.x, "--s": mote.size, "--dur": mote.duration, "--delay": mote.delay } as React.CSSProperties} />
        ))}
      </div>
      <div className="gate-petals" aria-hidden="true">
        {petals.map((petal, index) => (
          <i
            key={index}
            style={{ "--x": petal.x, "--s": petal.size, "--dur": petal.duration, "--delay": petal.delay, "--c": petal.color } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="gate-scene">
        <p className="gate-heading" aria-hidden={opening}>
          <span>Um convite especial</span>
          <strong>Ana &amp; André</strong>
        </p>

        <div className="gate-tilt">
        <button className="gate-card" type="button" aria-label="Abrir o convite" aria-pressed={opening} onClick={openInvitation}>
          <span className="gate-rays" aria-hidden="true" />

          <span className="gate-inside" aria-hidden="true">
            <small style={{ "--i": 0 } as React.CSSProperties}>Vamos casar</small>
            <span className="gate-photo" style={{ "--i": 1 } as React.CSSProperties} />
            <strong style={{ "--i": 2 } as React.CSSProperties}>
              Ana <em>&amp;</em> André
            </strong>
            <span className="gate-date" style={{ "--i": 3 } as React.CSSProperties}>14 · maio · 2027</span>
            <span className="gate-place" style={{ "--i": 4 } as React.CSSProperties}>Castro Verde</span>
            {sparks.map((spark, index) => (
              <span key={index} className="gate-spark" style={{ left: spark.left, top: spark.top, "--sd": spark.delay } as React.CSSProperties} />
            ))}
          </span>

          <span className="gate-panel gate-left" aria-hidden="true">
            <span className="gate-gloss" />
          </span>
          <span className="gate-panel gate-right" aria-hidden="true">
            <span className="gate-gloss" />
          </span>

          <span className="gate-burst" aria-hidden="true">
            {burst.map((piece, index) => (
              <i key={index} style={{ "--a": piece.angle, "--d": piece.distance, "--bd": piece.delay } as React.CSSProperties} />
            ))}
          </span>

          <span className="gate-seal" aria-hidden="true">
            <span className="seal-half seal-a" />
            <span className="seal-half seal-b" />
          </span>
        </button>
        </div>

        <p className="gate-hint" aria-live="polite">
          {done ? "↓" : opening ? "A abrir o nosso convite…" : "Toca no selo para abrir"}
        </p>
      </div>
    </div>
  );
}
