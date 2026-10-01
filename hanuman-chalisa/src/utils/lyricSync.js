// finds which verse's [start, end) window contains `time`, or -1 if none does
export function findVerseIndexAtTime(lyrics, time) {
  if (!lyrics.length) return -1;

  // binary search, lyrics are sorted and don't overlap
  let lo = 0;
  let hi = lyrics.length - 1;

  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const verse = lyrics[mid];

    if (time < verse.start) {
      hi = mid - 1;
    } else if (time >= verse.end) {
      lo = mid + 1;
    } else {
      return mid;
    }
  }

  // ran past the last verse's end (audio longer than our data), show last verse
  if (time >= lyrics[lyrics.length - 1].end) return lyrics.length - 1;
  return -1;
}
