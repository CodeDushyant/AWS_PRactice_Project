import { useMemo } from "react";
import { BACKGROUND_IMAGE_URL } from "../config";

// Deterministic pseudo-random embers so re-renders don't reshuffle them.
function useEmbers(count) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = i * 137.5;
        return {
          left: `${(seed % 100).toFixed(1)}%`,
          size: 2 + (i % 3),
          duration: 14 + (i % 7) * 2.5,
          delay: -(i * 2.3),
        };
      }),
    [count]
  );
}

export default function BackgroundScene({ ambientMode }) {
  const embers = useEmbers(16);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ink" aria-hidden="true">
      {/* Base cinematic scene: works with or without a real photo */}
      <div
        className={`absolute inset-0 animate-slow-zoom ${
          BACKGROUND_IMAGE_URL ? "hanuman-bg-photo" : ""
        }`}
        style={{
          backgroundImage: BACKGROUND_IMAGE_URL
            ? `url(${BACKGROUND_IMAGE_URL})`
            : undefined,
          backgroundSize: "cover",
        }}
      >
        {!BACKGROUND_IMAGE_URL && (
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[#100a06]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_78%_38%,rgba(226,176,106,0.22),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_65%,rgba(197,110,42,0.28),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,rgba(120,60,20,0.18),transparent_50%)]" />
            <div className="absolute inset-x-0 top-0 h-1/3 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(60,35,15,0.35),transparent_70%)]" />
          </div>
        )}
      </div>

      {/* Cinematic gradient: readable at top, darkest at the bottom player */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/85" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />

      {/* Keep the Hanuman side of the frame clear; darken the reading side
          on desktop so verse text stays legible over the lighter wall. */}
      <div className="absolute inset-0 hidden bg-gradient-to-r from-transparent via-transparent to-black/55 sm:block" />
      <div className="absolute inset-y-0 right-0 hidden w-[55%] bg-[radial-gradient(ellipse_80%_70%_at_72%_50%,rgba(0,0,0,0.4),transparent_75%)] sm:block" />

      {/* Warm vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />

      {ambientMode && <div className="absolute inset-0 bg-black/25" />}

      {/* Floating embers / incense particles */}
      <div className="absolute inset-0">
        {embers.map((ember, i) => (
          <span
            key={i}
            className="animate-ember absolute bottom-0 rounded-full bg-amber/70 blur-[0.5px]"
            style={{
              left: ember.left,
              width: ember.size,
              height: ember.size,
              animationDuration: `${ember.duration}s`,
              animationDelay: `${ember.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
