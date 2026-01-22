import { useState, useRef, useCallback } from 'react';

interface UseVideoControlReturn {
  isPlaying: boolean;
  isMuted: boolean;
  progress: number;
  duration: number;
  togglePlay: () => void;
  toggleMute: () => void;
  handleTimeUpdate: () => void;
  handleLoadedMetadata: () => void;
  seek: (time: number) => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  play: () => Promise<void>;
  pause: () => void;
}

export function useVideoControl(autoPlay = false): UseVideoControlReturn {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start muted for autoplay policy
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const play = useCallback(async () => {
    if (videoRef.current) {
      try {
        // Store the promise to handle interruption
        const playPromise = videoRef.current.play();
        playPromiseRef.current = playPromise;
        await playPromise;
        setIsPlaying(true);
      } catch (error) {
        // AbortError is expected when scrolling fast - video removed from DOM
        // or when pause() is called before play() resolves
        if (error instanceof Error && error.name === 'AbortError') {
          // Silently ignore - this is normal during fast scrolling
          return;
        }
        // NotAllowedError is also common (autoplay policy)
        if (error instanceof Error && error.name === 'NotAllowedError') {
          console.warn('Video autoplay blocked by browser policy');
          return;
        }
        console.error('Video play failed:', error);
        setIsPlaying(false);
      }
    }
  }, []);

  const pause = useCallback(() => {
    if (videoRef.current) {
      // Only pause if there's no pending play promise, or wait for it
      // This prevents the AbortError
      if (playPromiseRef.current) {
        playPromiseRef.current.then(() => {
          videoRef.current?.pause();
        }).catch(() => {
          // Ignore errors - video may already be removed
        });
        playPromiseRef.current = null;
      } else {
        videoRef.current.pause();
      }
      setIsPlaying(false);
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setProgress((current / total) * 100);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  }, []);

  const seek = useCallback((time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setProgress((time / videoRef.current.duration) * 100);
    }
  }, []);

  // Auto-play handling needs to be done in the component consuming this hook 
  // or via useEffect here if we strictly follow "autoPlay" prop, 
  // but usually intersection observer triggers play in the feed.

  return {
    isPlaying,
    isMuted,
    progress,
    duration,
    togglePlay,
    toggleMute,
    handleTimeUpdate,
    handleLoadedMetadata,
    seek,
    videoRef,
    play,
    pause
  };
}
