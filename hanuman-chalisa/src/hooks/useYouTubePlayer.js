import { useCallback, useEffect, useRef, useState } from "react";

// only load the iframe api script once, no matter how many callers ask
let youTubeApiPromise = null;
function loadYouTubeIframeAPI() {
  if (youTubeApiPromise) return youTubeApiPromise;

  youTubeApiPromise = new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve(window.YT);
      return;
    }
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve(window.YT);
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });

  return youTubeApiPromise;
}

const PLACEHOLDER_ID = "REPLACE_WITH_YOUTUBE_VIDEO_ID";

// wraps the YT iframe player api with a react-friendly interface.
// currentTime gets polled straight from the player instead of running
// its own clock, so it never drifts from what's actually playing.
export function useYouTubePlayer({ containerId, videoId, onEnded }) {
  const isConfigured = Boolean(videoId) && videoId !== PLACEHOLDER_ID;

  const playerRef = useRef(null);
  const pollRef = useRef(null);
  const onEndedRef = useRef(onEnded);
  onEndedRef.current = onEnded;

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(80);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!isConfigured) return;
    let cancelled = false;

    loadYouTubeIframeAPI().then((YT) => {
      if (cancelled) return;

      playerRef.current = new YT.Player(containerId, {
        videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          fs: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (event) => {
            if (cancelled) return;
            event.target.setVolume(volume);
            setDuration(event.target.getDuration());
            setIsReady(true);
          },
          onStateChange: (event) => {
            if (cancelled) return;
            const { PlayerState } = window.YT;
            if (event.data === PlayerState.PLAYING) {
              setIsPlaying(true);
              setDuration(event.target.getDuration());
            } else if (event.data === PlayerState.PAUSED) {
              setIsPlaying(false);
            } else if (event.data === PlayerState.ENDED) {
              setIsPlaying(false);
              onEndedRef.current?.();
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      clearInterval(pollRef.current);
      playerRef.current?.destroy?.();
      playerRef.current = null;
      setIsReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerId, videoId, isConfigured]);

  useEffect(() => {
    clearInterval(pollRef.current);
    if (!isPlaying) return;

    pollRef.current = setInterval(() => {
      const time = playerRef.current?.getCurrentTime?.();
      if (typeof time === "number") setCurrentTime(time);
    }, 200);

    return () => clearInterval(pollRef.current);
  }, [isPlaying]);

  const play = useCallback(() => playerRef.current?.playVideo?.(), []);
  const pause = useCallback(() => playerRef.current?.pauseVideo?.(), []);

  const seekTo = useCallback((seconds) => {
    playerRef.current?.seekTo?.(seconds, true);
    setCurrentTime(seconds);
  }, []);

  const restart = useCallback(() => {
    playerRef.current?.seekTo?.(0, true);
    playerRef.current?.playVideo?.();
  }, []);

  const setVolume = useCallback(
    (value) => {
      setVolumeState(value);
      playerRef.current?.setVolume?.(value);
      if (value === 0) {
        setIsMuted(true);
        playerRef.current?.mute?.();
      } else if (isMuted) {
        setIsMuted(false);
        playerRef.current?.unMute?.();
      }
    },
    [isMuted]
  );

  const toggleMute = useCallback(() => {
    if (isMuted) {
      playerRef.current?.unMute?.();
      setIsMuted(false);
    } else {
      playerRef.current?.mute?.();
      setIsMuted(true);
    }
  }, [isMuted]);

  return {
    isConfigured,
    isReady,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    play,
    pause,
    seekTo,
    restart,
    setVolume,
    toggleMute,
  };
}
