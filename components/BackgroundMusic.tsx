"use client";

import { useEffect, useRef, useState } from "react";

export const START_MUSIC_EVENT = "wedding:start-music";

const YOUTUBE_ID = "IQ7N7xRsRPo";

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  destroy: () => void;
};

type YTApi = {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string;
      width: number;
      height: number;
      playerVars: Record<string, number | string>;
      events: {
        onReady: () => void;
        onStateChange: (event: { data: number }) => void;
        onError: () => void;
      };
    },
  ) => YTPlayer;
};

type YTWindow = Window & {
  YT?: YTApi;
  onYouTubeIframeAPIReady?: () => void;
};

export default function BackgroundMusic() {
  const mountRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const readyRef = useRef(false);
  const wantsPlayRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const win = window as YTWindow;
    let cancelled = false;

    function createPlayer() {
      if (cancelled || !win.YT || !mountRef.current || playerRef.current) return;

      playerRef.current = new win.YT.Player(mountRef.current, {
        videoId: YOUTUBE_ID,
        width: 200,
        height: 200,
        playerVars: { loop: 1, playlist: YOUTUBE_ID, playsinline: 1, controls: 0, disablekb: 1, rel: 0 },
        events: {
          onReady: () => {
            readyRef.current = true;
            if (wantsPlayRef.current) playerRef.current?.playVideo();
          },
          onStateChange: (event) => {
            if (event.data === 1) setPlaying(true);
            if (event.data === 2) setPlaying(false);
          },
          onError: () => setUseFallback(true),
        },
      });
    }

    if (win.YT?.Player) {
      createPlayer();
    } else {
      const previous = win.onYouTubeIframeAPIReady;
      win.onYouTubeIframeAPIReady = () => {
        previous?.();
        createPlayer();
      };
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        script.onerror = () => setUseFallback(true);
        document.head.appendChild(script);
      }
    }

    function start() {
      wantsPlayRef.current = true;
      if (readyRef.current) playerRef.current?.playVideo();
      else audioRef.current?.play().catch(() => undefined);
    }

    window.addEventListener(START_MUSIC_EVENT, start);
    return () => {
      cancelled = true;
      window.removeEventListener(START_MUSIC_EVENT, start);
      playerRef.current?.destroy();
      playerRef.current = null;
      readyRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (useFallback && wantsPlayRef.current) audioRef.current?.play().catch(() => undefined);
  }, [useFallback]);

  function toggle() {
    if (useFallback) {
      const audio = audioRef.current;
      if (!audio) return;
      if (audio.paused) audio.play().catch(() => undefined);
      else audio.pause();
      return;
    }

    if (playing) {
      wantsPlayRef.current = false;
      playerRef.current?.pauseVideo();
    } else {
      wantsPlayRef.current = true;
      playerRef.current?.playVideo();
    }
  }

  return (
    <>
      {!useFallback && (
        <div className="music-player" aria-hidden="true">
          <div ref={mountRef} />
        </div>
      )}
      <audio
        ref={audioRef}
        src={useFallback ? "/music/musica.mp3" : undefined}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => useFallback && setAvailable(false)}
      />
      {available && (
        <button
          className={playing ? "music-toggle is-playing" : "music-toggle"}
          type="button"
          onClick={toggle}
          aria-label={playing ? "Silenciar música" : "Ativar música"}
          aria-pressed={playing}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5Z" fill="currentColor" />
            {playing ? (
              <>
                <path d="M15.5 9a4 4 0 0 1 0 6" />
                <path d="M18 6.5a7.5 7.5 0 0 1 0 11" />
              </>
            ) : (
              <path d="m16 9.5 5 5m0-5-5 5" />
            )}
          </svg>
        </button>
      )}
    </>
  );
}
