import LiveListeners from "./LiveListeners";
import { BookIcon, ListIcon, MoonIcon, ExpandIcon, CompressIcon } from "./icons";

function IconButton({ label, active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/70 ${
        active
          ? "border-amber/50 bg-amber/20 text-amber"
          : "border-white/10 bg-black/20 text-ivory/80 hover:bg-black/35 hover:text-ivory"
      }`}
    >
      {children}
    </button>
  );
}

export default function Header({
  ambientMode,
  onToggleAmbient,
  isFullscreen,
  onToggleFullscreen,
  onOpenLyrics,
  onOpenMode,
}) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-center justify-between gap-3 px-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-8 sm:pt-6">
      <div className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-amber/30 bg-black/25 font-serif-dev text-lg text-amber backdrop-blur-md">
        ॐ
      </div>

      <div className="pointer-events-auto hidden sm:block">
        <LiveListeners />
      </div>

      <div className="pointer-events-auto flex items-center gap-2">
        <IconButton label="Lyrics" onClick={onOpenLyrics}>
          <BookIcon />
        </IconButton>
        <IconButton label="Playback mode" onClick={onOpenMode}>
          <ListIcon />
        </IconButton>
        <IconButton
          label="Ambient mode"
          active={ambientMode}
          onClick={onToggleAmbient}
        >
          <MoonIcon />
        </IconButton>
        <IconButton
          label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          active={isFullscreen}
          onClick={onToggleFullscreen}
        >
          {isFullscreen ? <CompressIcon /> : <ExpandIcon />}
        </IconButton>
      </div>
    </header>
  );
}
