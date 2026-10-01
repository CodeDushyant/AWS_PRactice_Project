import { useEffect, useRef } from "react";
import { CloseIcon } from "./icons";

export default function LyricsPanel({ isOpen, onClose, lyrics, currentIndex }) {
  const itemRefs = useRef([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    itemRefs.current[currentIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [currentIndex, isOpen]);

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="संपूर्ण हनुमान चालीसा"
        className={`fixed inset-x-0 bottom-0 z-50 flex max-h-[78vh] flex-col rounded-t-3xl border border-white/10 bg-ink-soft/90 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out sm:inset-x-auto sm:inset-y-0 sm:right-0 sm:h-full sm:w-[400px] sm:max-h-none sm:rounded-none sm:rounded-l-3xl ${
          isOpen
            ? "translate-y-0 sm:translate-x-0"
            : "translate-y-full sm:translate-y-0 sm:translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="font-serif-dev text-lg text-amber">हनुमान चालीसा</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close lyrics"
            className="flex h-8 w-8 items-center justify-center rounded-full text-ivory/70 hover:bg-white/10 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/70"
          >
            <CloseIcon />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="thin-scroll flex-1 overflow-y-auto px-5 py-4"
        >
          {lyrics.map((verse, index) => {
            const isCurrent = index === currentIndex;
            return (
              <div
                key={verse.id}
                ref={(el) => (itemRefs.current[index] = el)}
                className="mb-4 scroll-mt-6"
              >
                {verse.type === "chaupai" && verse.number === 1 && (
                  <p className="mb-2 font-ui text-[11px] uppercase tracking-[0.2em] text-saffron/70">
                    चौपाई
                  </p>
                )}
                <p
                  className={`font-serif-dev transition-all duration-300 ${
                    isCurrent
                      ? "text-[19px] text-ivory drop-shadow-[0_0_14px_rgba(226,176,106,0.45)]"
                      : "text-[17px] text-ivory/45"
                  }`}
                  style={{ lineHeight: 1.7, whiteSpace: "pre-line" }}
                >
                  {verse.text}
                </p>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
