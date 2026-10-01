// target = how many play-throughs, Infinity = loop forever
export const PLAYBACK_MODES = [
  { id: "normal", label: "सामान्य", sub: "Normal · once", target: 1, showCounter: false },
  { id: "repeat", label: "रिपीट", sub: "Repeat continuously", target: Infinity, showCounter: false },
  { id: "eleven", label: "11 बार", sub: "11 times", target: 11, showCounter: true },
  { id: "twentyOne", label: "21 बार", sub: "21 times", target: 21, showCounter: true },
  { id: "oneOEight", label: "108 बार", sub: "108 times", target: 108, showCounter: true },
  { id: "peaceful", label: "शांति लूप", sub: "Peaceful loop, no count shown", target: Infinity, showCounter: false },
];

export function getPlaybackMode(id) {
  return PLAYBACK_MODES.find((mode) => mode.id === id) ?? PLAYBACK_MODES[0];
}
