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

type Pt = [number, number];
type Seg = [Pt, Pt, Pt, Pt];

function bezier([p0, p1, p2, p3]: Seg, t: number) {
  const u = 1 - t;
  const x = u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0];
  const y = u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1];
  const dx = 3 * u * u * (p1[0] - p0[0]) + 6 * u * t * (p2[0] - p1[0]) + 3 * t * t * (p3[0] - p2[0]);
  const dy = 3 * u * u * (p1[1] - p0[1]) + 6 * u * t * (p2[1] - p1[1]) + 3 * t * t * (p3[1] - p2[1]);
  return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
}

function along(segs: Seg[], perSeg: number, length: number, spread: number) {
  const out: { x: string; y: string; a: string; s: number; n: number }[] = [];
  segs.forEach((seg, si) => {
    for (let i = 0; i < perSeg; i++) {
      const t = (i + 0.5) / perSeg;
      const { x, y, angle } = bezier(seg, t);
      const side = (si * perSeg + i) % 2 === 0 ? -1 : 1;
      out.push({ x: x.toFixed(1), y: y.toFixed(1), a: (angle + side * spread).toFixed(1), s: length * (0.8 + 0.2 * Math.sin((si * perSeg + i) * 1.3 + 1)), n: si * perSeg + i });
    }
  });
  return out;
}

const WREATH: Seg[] = [
  [[99, 196], [60, 190], [34, 160], [37, 126]],
  [[37, 126], [40, 92], [62, 66], [99, 58]],
];
const WREATH_PATH = "M99 196 C60 190 34 160 37 126 C40 92 62 66 99 58";
const wreathLeaves = along(WREATH, 8, 17, 42);
const wreathOlives = [
  { seg: 0, t: 0.28, side: 1 },
  { seg: 0, t: 0.78, side: -1 },
  { seg: 1, t: 0.25, side: 1 },
  { seg: 1, t: 0.72, side: -1 },
].map((o) => {
  const { x, y, angle } = bezier(WREATH[o.seg], o.t);
  return { x: x.toFixed(1), y: y.toFixed(1), a: (angle + o.side * 90).toFixed(1) };
});

const BRANCH: Seg[] = [
  [[-10, 14], [50, 22], [90, 50], [130, 80]],
  [[130, 80], [170, 108], [205, 130], [250, 150]],
];
const BRANCH_PATH = "M-10 14 C50 22 90 50 130 80 C170 108 205 130 250 150";
const branchLeaves = along(BRANCH, 6, 44, 38);
const branchOlives = [
  { seg: 0, t: 0.35, side: 1 },
  { seg: 0, t: 0.6, side: 1 },
  { seg: 0, t: 0.85, side: -1 },
  { seg: 1, t: 0.3, side: -1 },
].map((o) => {
  const { x, y, angle } = bezier(BRANCH[o.seg], o.t);
  return { x: x.toFixed(1), y: y.toFixed(1), a: (angle + o.side * 90).toFixed(1) };
});

const LEAF = "M0 0 C4 -5 12 -5 17 0 C12 5 4 5 0 0Z";

function Wreath({ id }: { id: string }) {
  return (
    <svg className="gate-wreath" viewBox="0 0 100 250" aria-hidden="true">
      <defs>
        <linearGradient id={`foil-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6e6b0" />
          <stop offset=".5" stopColor="#d6b266" />
          <stop offset="1" stopColor="#a98433" />
        </linearGradient>
      </defs>
      <path className="wreath-stem" d={WREATH_PATH} pathLength={1} fill="none" stroke={`url(#foil-${id})`} strokeWidth="1.6" strokeLinecap="round" />
      {wreathLeaves.map((leaf) => (
        <g key={leaf.n} transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.a}) scale(${(leaf.s / 17).toFixed(2)})`}>
          <path className="wreath-leaf" style={{ "--n": leaf.n } as React.CSSProperties} d={LEAF} fill={`url(#foil-${id})`} />
        </g>
      ))}
      {wreathOlives.map((olive, index) => (
        <g key={index} transform={`translate(${olive.x} ${olive.y}) rotate(${olive.a})`}>
          <g className="wreath-leaf" style={{ "--n": 8 + index } as React.CSSProperties}>
            <path d="M0 0 L6 0" stroke={`url(#foil-${id})`} strokeWidth="1" />
            <ellipse cx="9.5" cy="0" rx="4.6" ry="3.2" fill={`url(#foil-${id})`} />
          </g>
        </g>
      ))}
    </svg>
  );
}

function OliveBranch() {
  return (
    <svg viewBox="0 0 260 180" aria-hidden="true">
      <path d={BRANCH_PATH} fill="none" stroke="#6b7338" strokeWidth="3" strokeLinecap="round" />
      {branchLeaves.map((leaf) => (
        <g key={leaf.n} transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.a}) scale(${(leaf.s / 17).toFixed(2)})`}>
          <path d={LEAF} fill={leaf.n % 2 ? "#97a46c" : "#7d8b52"} />
          <path d="M0 0 L16 0" stroke="rgba(255,255,255,.35)" strokeWidth=".7" />
        </g>
      ))}
      {branchOlives.map((olive, index) => (
        <g key={index} transform={`translate(${olive.x} ${olive.y}) rotate(${olive.a})`}>
          <path d="M0 0 L10 0" stroke="#6b7338" strokeWidth="1.6" />
          <ellipse cx="17" cy="0" rx="8" ry="5.6" fill="#59602c" />
          <ellipse cx="15" cy="-1.8" rx="3" ry="1.6" fill="rgba(255,255,255,.28)" />
        </g>
      ))}
    </svg>
  );
}

function Ribbon() {
  return (
    <svg viewBox="0 0 380 220" aria-hidden="true">
      <defs>
        <linearGradient id="satin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b9c5a0" />
          <stop offset=".45" stopColor="#8d9c72" />
          <stop offset=".6" stopColor="#c6d0b0" />
          <stop offset="1" stopColor="#7e8d63" />
        </linearGradient>
      </defs>
      <path d="M390 30 C300 40 250 110 160 135 C110 150 50 170 -10 225 L-10 175 C40 135 100 108 160 92 C230 72 290 -6 390 -14 Z" fill="url(#satin)" />
      <path d="M390 4 C300 14 250 84 160 109 C110 124 50 144 -10 199" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="2" />
    </svg>
  );
}

export default function InvitationIntro() {
  const [visible, setVisible] = useState(true);
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
    setVisible(false);
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

  if (!visible) return null;

  return (
    <div className={`gate-intro ${opening ? "is-opening" : ""}`} aria-label="Abrir convite de casamento" onPointerMove={onPointerMove}>
      <div className="gate-beam gate-beam-a" aria-hidden="true" />
      <div className="gate-beam gate-beam-b" aria-hidden="true" />
      <div className="gate-glow" aria-hidden="true" />
      <div className="gate-branch" aria-hidden="true"><OliveBranch /></div>
      <div className="gate-ribbon" aria-hidden="true"><Ribbon /></div>
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
            <small style={{ "--i": 0 } as React.CSSProperties}>Nós casamos</small>
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
            <Wreath id="l" />
            <span className="gate-gloss" />
          </span>
          <span className="gate-panel gate-right" aria-hidden="true">
            <Wreath id="r" />
            <span className="gate-gloss" />
          </span>

          <span className="gate-burst" aria-hidden="true">
            {burst.map((piece, index) => (
              <i key={index} style={{ "--a": piece.angle, "--d": piece.distance, "--bd": piece.delay } as React.CSSProperties} />
            ))}
          </span>

          <span className="gate-seal" aria-hidden="true">
            <span className="seal-half seal-a">A<b>&amp;</b>A</span>
            <span className="seal-half seal-b">A<b>&amp;</b>A</span>
          </span>
        </button>
        </div>

        <p className="gate-hint" aria-live="polite">
          {opening ? "A abrir o nosso convite…" : "Toca no selo para abrir"}
        </p>
      </div>
    </div>
  );
}
