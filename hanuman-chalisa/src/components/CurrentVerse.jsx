import { useEffect, useRef, useState } from "react";

// crossfades old verse out then new verse in, timing matches the
// verse-out/verse-in keyframes in index.css
export default function CurrentVerse({ verse, ambientMode }) {
  const [displayed, setDisplayed] = useState(verse);
  const [animClass, setAnimClass] = useState("animate-verse-in");
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!verse || verse.id === displayed?.id) {
      if (verse && !displayed) setDisplayed(verse);
      return;
    }
    setAnimClass("animate-verse-out");
    timeoutRef.current = setTimeout(() => {
      setDisplayed(verse);
      setAnimClass("animate-verse-in");
    }, 320);
    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verse?.id]);

  if (!displayed) return null;

  const lines = displayed.text.split("\n");

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-[136px] z-20 px-6 text-center sm:inset-x-auto sm:bottom-auto sm:right-[6%] sm:top-1/2 sm:w-[min(560px,42vw)] sm:-translate-y-1/2 sm:px-0 sm:text-right md:right-[8%] ${
        ambientMode ? "opacity-70" : ""
      }`}
    >
      <div key={displayed.id} className={animClass}>
        {lines.map((line, i) => (
          <p
            key={i}
            className={`font-serif-dev text-ivory drop-shadow-[0_2px_16px_rgba(0,0,0,0.65)] ${
              ambientMode
                ? "text-[clamp(1.15rem,2.6vw,1.6rem)]"
                : "text-[clamp(1.4rem,3.4vw,2.1rem)]"
            }`}
            style={{ lineHeight: 1.6 }}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
