import { formatTime } from "../utils/format";
import { PlayIcon, PauseIcon, ReplayIcon, ListIcon, VolumeIcon, MuteIcon } from "./icons";
import RepeatCounter from "./RepeatCounter";

export default function MusicPlayer({
  containerId,
  player,
  mode,
  repeatCount,
  ambientMode,
  onTogglePlay,
  onOpenMode,
}) {
  const {
    isConfigured,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    seekTo,
    restart,
    setVolume,
    toggleMute,
  } = player;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={`fixed inset-x-3 bottom-[max(0.9rem,env(safe-area-inset-bottom))] z-30 mx-auto flex max-w-[680px] items-center gap-3 rounded-[24px] border border-white/10 bg-[rgba(20,12,8,0.55)] px-3 py-2.5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-[20px] transition-opacity duration-500 sm:gap-4 sm:px-4 sm:py-3 ${
        ambientMode ? "opacity-70 hover:opacity-100" : "opacity-100"
      }`}
    >
      {/* Left: the real YouTube player, styled small as the "artwork" */}
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/40 sm:h-14 sm:w-14">
        <div id={containerId} className="h-full w-full" />
        {!isConfigured && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 font-serif-dev text-amber/80">
            ॐ
          </div>
        )}
      </div>

      {/* Center: title + progress */}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate font-serif-dev text-[15px] text-ivory sm:text-base">
            श्री हनुमान चालीसा
          </p>
          <RepeatCounter mode={mode} count={repeatCount} />
        </div>

        <div className="mt-1.5 flex items-center gap-2">
          <span className="w-9 shrink-0 font-ui text-[11px] tabular-nums text-ivory/50">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            className="chalisa-range h-1 w-full"
            style={{ "--range-progress": `${progress}%` }}
            min={0}
            max={duration || 0}
            step={0.1}
            value={Math.min(currentTime, duration || 0)}
            onChange={(e) => seekTo(Number(e.target.value))}
            aria-label="Seek"
            disabled={!isConfigured}
          />
          <span className="w-9 shrink-0 font-ui text-[11px] tabular-nums text-ivory/50">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Right: controls */}
      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        <button
          type="button"
          onClick={restart}
          aria-label="Restart from beginning"
          disabled={!isConfigured}
          className="flex h-9 w-9 items-center justify-center rounded-full text-ivory/70 transition-colors hover:bg-white/10 hover:text-ivory disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/70"
        >
          <ReplayIcon />
        </button>

        <button
          type="button"
          onClick={onTogglePlay}
          disabled={!isConfigured}
          aria-label={isPlaying ? "Pause" : "Play"}
          title={!isConfigured ? "Add your YouTube video ID in src/config.js" : undefined}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-amber text-ink shadow-[0_6px_20px_-4px_rgba(226,176,106,0.65)] transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon className="ml-0.5" />}
        </button>

        <button
          type="button"
          onClick={onOpenMode}
          aria-label="Change listening mode"
          className="flex h-9 w-9 items-center justify-center rounded-full text-ivory/70 transition-colors hover:bg-white/10 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/70"
        >
          <ListIcon />
        </button>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted || volume === 0 ? "Unmute" : "Mute"}
          className="hidden h-9 w-9 items-center justify-center rounded-full text-ivory/70 transition-colors hover:bg-white/10 hover:text-ivory sm:flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/70"
        >
          {isMuted || volume === 0 ? <MuteIcon /> : <VolumeIcon />}
        </button>
        <input
          type="range"
          className="chalisa-range hidden h-1 w-16 sm:block"
          style={{ "--range-progress": `${isMuted ? 0 : volume}%` }}
          min={0}
          max={100}
          value={isMuted ? 0 : volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          aria-label="Volume"
        />
      </div>
    </div>
  );
}
