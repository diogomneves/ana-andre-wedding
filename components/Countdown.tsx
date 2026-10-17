"use client";

import { useEffect, useState } from "react";

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function getTimeLeft(target: string): TimeLeft {
  const distance = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  };
}

export default function Countdown({ target }: { target: string }) {
  const [time, setTime] = useState<TimeLeft>(() => getTimeLeft(target));

  useEffect(() => {
    const id = window.setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const items: Array<[keyof TimeLeft, string]> = [
    ["days", "dias"],
    ["hours", "horas"],
    ["minutes", "min"],
    ["seconds", "seg"],
  ];

  return (
    <div className="countdown" role="timer" aria-live="polite">
      {items.map(([key, label]) => (
        <div className="countdown-item" key={key}>
          <strong>{String(time[key]).padStart(2, "0")}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
