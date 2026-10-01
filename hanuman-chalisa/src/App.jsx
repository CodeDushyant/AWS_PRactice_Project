import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import BackgroundScene from "./components/BackgroundScene";
import CursorTrail from "./components/CursorTrail";
import Header from "./components/Header";
import DevotionalTitle from "./components/DevotionalTitle";
import CurrentVerse from "./components/CurrentVerse";
import LyricsPanel from "./components/LyricsPanel";
import MusicPlayer from "./components/MusicPlayer";
import PlaybackMode from "./components/PlaybackMode";
import { hanumanChalisaLyrics } from "./data/hanumanChalisa";
import { getPlaybackMode } from "./data/playbackModes";
import { useYouTubePlayer } from "./hooks/useYouTubePlayer";
import { findVerseIndexAtTime } from "./utils/lyricSync";
import { HANUMAN_CHALISA_VIDEO_ID } from "./config";

const YT_CONTAINER_ID = "yt-player-container";

export default function App() {
  const [playbackModeId, setPlaybackModeId] = useState("normal");
  const [repeatCount, setRepeatCount] = useState(1);
  const [lyricsOpen, setLyricsOpen] = useState(false);
  const [modeMenuOpen, setModeMenuOpen] = useState(false);
  const [ambientMode, setAmbientMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const activeMode = getPlaybackMode(playbackModeId);

  // refs so handlers don't need to resubscribe every currentTime tick
  const playerRef = useRef(null);
  const playbackModeIdRef = useRef(playbackModeId);
  playbackModeIdRef.current = playbackModeId;

  const handleEnded = useCallback(() => {
    setRepeatCount((count) => {
      const mode = getPlaybackMode(playbackModeIdRef.current);
      if (mode.target <= 1) return count; // Normal: stop, no restart
      const next = count + 1;
      if (next <= mode.target) {
        playerRef.current?.restart();
        return next;
      }
      return count; // reached the target repetition, stay stopped
    });
  }, []);

  const player = useYouTubePlayer({
    containerId: YT_CONTAINER_ID,
    videoId: HANUMAN_CHALISA_VIDEO_ID,
    onEnded: handleEnded,
  });
  playerRef.current = player;

  const currentVerseIndex = useMemo(
    () => findVerseIndexAtTime(hanumanChalisaLyrics, player.currentTime),
    [player.currentTime]
  );
  const currentVerse =
    currentVerseIndex >= 0 ? hanumanChalisaLyrics[currentVerseIndex] : null;

  const togglePlay = useCallback(() => {
    const p = playerRef.current;
    if (p.isPlaying) p.pause();
    else p.play();
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.target instanceof HTMLInputElement) return;

      if (event.code === "Space") {
        event.preventDefault();
        togglePlay();
      } else if (event.key === "f" || event.key === "F") {
        toggleFullscreen();
      } else if (event.key === "l" || event.key === "L") {
        setLyricsOpen((v) => !v);
      } else if (event.key === "m" || event.key === "M") {
        setModeMenuOpen((v) => !v);
      } else if (event.key === "Escape") {
        setLyricsOpen(false);
        setModeMenuOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [togglePlay, toggleFullscreen]);

  const handleSelectMode = useCallback((id) => {
    setPlaybackModeId(id);
    setRepeatCount(1);
    setModeMenuOpen(false);
  }, []);

  return (
    <div className="relative h-[100svh] min-h-[100svh] w-full overflow-hidden">
      <BackgroundScene ambientMode={ambientMode} />
      <CursorTrail />

      <Header
        ambientMode={ambientMode}
        onToggleAmbient={() => setAmbientMode((v) => !v)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        onOpenLyrics={() => setLyricsOpen(true)}
        onOpenMode={() => setModeMenuOpen(true)}
      />

      <div
        className={`fixed left-4 top-20 z-10 transition-opacity duration-500 sm:left-8 sm:top-28 ${
          ambientMode ? "opacity-60" : "opacity-100"
        }`}
      >
        <DevotionalTitle />
      </div>

      <CurrentVerse verse={currentVerse} ambientMode={ambientMode} />

      {currentVerse && (
        <div className="pointer-events-none fixed inset-x-0 bottom-[108px] z-20 flex justify-center px-4 sm:bottom-[118px]">
          <p className="font-ui text-[11px] tracking-wide text-ivory/40">
            हनुमान चालीसा{" "}
            {currentVerse.type === "chaupai"
              ? `• चौपाई ${String(currentVerse.number).padStart(2, "0")}`
              : currentVerse.type === "doha"
                ? "• दोहा"
                : "• जय श्री राम"}
          </p>
        </div>
      )}

      <LyricsPanel
        isOpen={lyricsOpen}
        onClose={() => setLyricsOpen(false)}
        lyrics={hanumanChalisaLyrics}
        currentIndex={currentVerseIndex}
      />

      <PlaybackMode
        isOpen={modeMenuOpen}
        onClose={() => setModeMenuOpen(false)}
        activeMode={playbackModeId}
        onSelect={handleSelectMode}
      />

      <MusicPlayer
        containerId={YT_CONTAINER_ID}
        player={player}
        mode={activeMode}
        repeatCount={repeatCount}
        ambientMode={ambientMode}
        onTogglePlay={togglePlay}
        onOpenMode={() => setModeMenuOpen(true)}
      />
    </div>
  );
}
