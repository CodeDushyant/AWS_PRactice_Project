export default function RepeatCounter({ mode, count }) {
  if (!mode.showCounter) return null;

  return (
    <span className="font-ui text-xs tabular-nums text-amber/90">
      {Math.min(count, mode.target)} / {mode.target}
    </span>
  );
}
