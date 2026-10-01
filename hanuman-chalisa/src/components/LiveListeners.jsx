import { useEffect, useState } from "react";
import { MOCK_LIVE_LISTENERS } from "../config";

// fake count that drifts a bit so it doesn't look frozen, swap for a real feed later
export default function LiveListeners({ className = "" }) {
  const [count, setCount] = useState(MOCK_LIVE_LISTENERS);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => Math.max(1, c + Math.round((Math.random() - 0.5) * 6)));
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={`flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 backdrop-blur-md ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-glow-pulse rounded-full bg-emerald-400/80" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      <span className="font-sans-dev text-[13px] tracking-wide text-ivory/85">
        {count.toLocaleString("hi-IN")} भक्त सुन रहे हैं
      </span>
    </div>
  );
}
