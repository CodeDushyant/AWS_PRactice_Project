// Small dependency-free SVG icon set used throughout the player UI.
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function PlayIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...props}>
      <path d="M7 4.5v15l13-7.5-13-7.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PauseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...props}>
      <rect x="6" y="4.5" width="4.5" height="15" rx="1" fill="currentColor" />
      <rect x="13.5" y="4.5" width="4.5" height="15" rx="1" fill="currentColor" />
    </svg>
  );
}

export function ReplayIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
      <path d="M4 12a8 8 0 1 1 2.6 5.9" />
      <path d="M4 17v-5h5" />
    </svg>
  );
}

export function VolumeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
      <path d="M4 9v6h4l5 4V5L8 9H4z" />
      <path d="M16.5 8.5a5 5 0 0 1 0 7" />
      <path d="M19 6a8.5 8.5 0 0 1 0 12" />
    </svg>
  );
}

export function MuteIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
      <path d="M4 9v6h4l5 4V5L8 9H4z" />
      <path d="M16 9l5 6M21 9l-5 6" />
    </svg>
  );
}

export function BookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
      <path d="M4 5.5C4 4.7 4.7 4 5.5 4H12v16H5.5A1.5 1.5 0 0 1 4 18.5v-13z" />
      <path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H12v16h6.5a1.5 1.5 0 0 0 1.5-1.5v-13z" />
    </svg>
  );
}

export function ListIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
      <circle cx="5" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="5" cy="18" r="1" fill="currentColor" stroke="none" />
      <path d="M9 6h11M9 12h11M9 18h11" />
    </svg>
  );
}

export function ExpandIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
      <path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" />
    </svg>
  );
}

export function CompressIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
      <path d="M4 9h5V4M20 9h-5V4M4 15h5v5M20 15h-5v5" />
    </svg>
  );
}

export function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function MoonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
    </svg>
  );
}

