"use client";

import { useEffect, useRef, useState } from "react";

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

  function openInvitation() {
    if (opening) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setOpening(true);

    finishTimer.current = window.setTimeout(
      finishInvitation,
      reducedMotion ? 450 : 3400,
    );
  }

  if (!visible) return null;

  return (
    <div
      className={`invitation-intro ${opening ? "is-opening" : ""}`}
      aria-label="Abrir convite de casamento"
    >
      <div className="intro-watercolor intro-watercolor-blue" aria-hidden="true" />
      <div className="intro-watercolor intro-watercolor-gold" aria-hidden="true" />

      <div className="intro-branch intro-branch-left" aria-hidden="true">
        <i /><i /><i /><i /><i /><i />
      </div>
      <div className="intro-branch intro-branch-right" aria-hidden="true">
        <i /><i /><i /><i /><i /><i />
      </div>

      <button className="intro-skip" type="button" onClick={finishInvitation}>
        Entrar no site
      </button>

      <div className="envelope-scene">
        <div className="intro-heading" aria-hidden={opening}>
          <span>Um convite especial</span>
          <strong>Ana &amp; André</strong>
        </div>

        <div className="envelope-shadow" aria-hidden="true" />

        <button
          className="envelope envelope-trigger"
          type="button"
          aria-label="Abrir o convite"
          aria-pressed={opening}
          onClick={openInvitation}
        >
          <span className="envelope-back" aria-hidden="true" />

          <span className="letter" aria-hidden="true">
            <span className="letter-inner">
              <span className="letter-kicker">Temos um dia para celebrar</span>
              <strong>
                Ana <em>&amp;</em> André
              </strong>
              <span className="letter-date">14 · 05 · 2027</span>
              <span className="letter-place">Castro Verde</span>
              <span className="letter-heart">♡</span>
            </span>
          </span>

          <span className="envelope-left" aria-hidden="true" />
          <span className="envelope-right" aria-hidden="true" />
          <span className="envelope-bottom" aria-hidden="true" />
          <span className="envelope-flap" aria-hidden="true" />

          <span className="wax-seal" aria-hidden="true">
            <span>A</span>
            <b>&amp;</b>
            <span>A</span>
          </span>
        </button>

        <div className="intro-copy" aria-live="polite">
          <p>{opening ? "A abrir o nosso convite…" : "Toca no selo para abrir"}</p>
          {!opening && <span className="intro-tap-indicator" aria-hidden="true">⌄</span>}
        </div>
      </div>
    </div>
  );
}
