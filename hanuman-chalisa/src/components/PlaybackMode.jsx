import { PLAYBACK_MODES } from "../data/playbackModes";

export default function PlaybackMode({ isOpen, onClose, activeMode, onSelect }) {
  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="सुनने की विधि चुनें"
        className={`fixed inset-x-0 bottom-0 z-50 rounded-t-3xl border border-white/10 bg-ink-soft/95 p-2 shadow-2xl backdrop-blur-xl transition-all duration-250 ease-out sm:inset-x-auto sm:bottom-auto sm:right-8 sm:top-[4.5rem] sm:w-72 sm:rounded-2xl ${
          isOpen
            ? "translate-y-0 opacity-100 sm:translate-y-0"
            : "pointer-events-none translate-y-4 opacity-0 sm:translate-y-0"
        }`}
      >
        <p className="px-4 pb-2 pt-3 font-ui text-[11px] uppercase tracking-[0.2em] text-ivory/50">
          Listening Mode
        </p>
        <div className="pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          {PLAYBACK_MODES.map((mode) => {
            const active = mode.id === activeMode;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => onSelect(mode.id)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/70 ${
                  active ? "bg-amber/15 text-amber" : "text-ivory/80 hover:bg-white/5"
                }`}
              >
                <span className="font-serif-dev text-base">{mode.label}</span>
                <span className="font-ui text-xs text-ivory/40">{mode.sub}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
