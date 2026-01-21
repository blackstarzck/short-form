import React, { useRef, useEffect, useState } from 'react';
import { useVideoControl } from '@/hooks/useVideoControl';
import { SubtitleOverlay } from './SubtitleOverlay';
import { EndingCard } from './EndingCard';
import { ActionSheet } from './ActionSheet';
import { PostCaption } from './PostCaption';
import { Video } from '@/types';
import { Play, Volume2, VolumeX, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoPlayerProps {
  video: Video;
  isActive: boolean;
  onNext?: () => void; // Callback to scroll/play next video
}

export function VideoPlayer({ video, isActive, onNext }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showEnding, setShowEnding] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [isOverlayExpanded, setIsOverlayExpanded] = useState(false);

  const {
    isPlaying,
    isMuted,
    progress,
    videoRef,
    togglePlay,
    toggleMute,
    handleTimeUpdate,
    handleLoadedMetadata,
    seek,
    play,
    pause
  } = useVideoControl();

  // Reset state when video changes
  useEffect(() => {
    setShowEnding(false);
    setShowActionSheet(false);
    setIsOverlayExpanded(false);
  }, [video.id]);

  // Control playback based on active state, ending card, and overlay expansion
  useEffect(() => {
    if (isActive && !showEnding && !isOverlayExpanded) {
      play();
    } else {
      pause();
    }
  }, [isActive, showEnding, isOverlayExpanded, play, pause]);

  // Check for video end to show Ending Card
  const onTimeUpdate = () => {
    handleTimeUpdate();
    if (videoRef.current) {
      // Show ending card 0.5s before end or at end
      if (videoRef.current.duration - videoRef.current.currentTime < 0.2 && !showEnding) {
        setShowEnding(true);
        pause();
      }
    }
  };

  const handleReplay = () => {
    setShowEnding(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      play();
    }
  };

  const handleNext = () => {
    // If parent provided onNext, use it (scroll to next)
    // Otherwise just replay or do nothing
    if (onNext) onNext();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100dvh] bg-black snap-start overflow-hidden"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={video.video_url}
        poster={video.thumbnail_url}
        className="w-full h-full object-cover"
        playsInline
        muted={isMuted}
        onClick={togglePlay}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Progress Bar - Positioned above BottomNav with spacing */}
      {!isOverlayExpanded && (
        <div className="absolute bottom-[calc(5rem+env(safe-area-inset-bottom))] left-4 right-4 z-30 group h-2 hover:h-4 transition-all duration-200 cursor-pointer">
          {/* Background Track */}
          <div className="absolute bottom-0 w-full h-1 bg-white/30 rounded-full group-hover:h-2 transition-all duration-200" />

          {/* Progress Fill */}
          <div
            className="absolute bottom-0 h-1 bg-brand rounded-full group-hover:h-2 transition-all duration-200 ease-linear"
            style={{ width: `${progress}%` }}
          >
            {/* Thumb Indicator - YouTube style */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-brand rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform duration-200" />
          </div>

          {/* Input Range for Interaction */}
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => {
              const percentage = parseFloat(e.target.value);
              if (videoRef.current) {
                const time = (percentage / 100) * videoRef.current.duration;
                seek(time);
              }
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      )}

      {/* Play Icon Overlay */}
      {!isPlaying && !showEnding && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none z-20"
        >
          <Play className="w-16 h-16 text-white/50 fill-white/50 animate-pulse" />
        </div>
      )}

      {/* Top Controls - Only mute button and course badge */}
      {!isOverlayExpanded && (
        <div className="absolute top-safe-top left-0 right-0 p-4 flex justify-between items-start z-20 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
          <div className="pointer-events-auto">
            {/* Course Badge */}
            {video.course_id && (
              <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded text-[10px] font-bold text-white">
                Chapter {video.chapter_index}
              </span>
            )}
          </div>
          <button onClick={toggleMute} className="p-2 text-white/80 hover:text-white pointer-events-auto">
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      )}

      {/* Overlay Background */}
      <AnimatePresence>
        {isOverlayExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/80 z-30 touch-none backdrop-blur-sm"
            onClick={() => setIsOverlayExpanded(false)}
          />
        )}
      </AnimatePresence>

      {/* Bottom Left - Post Caption (Instagram Reels style) */}
      {!showEnding && (
        <div className={cn(
          "absolute bottom-[calc(6rem+env(safe-area-inset-bottom))] z-40 pointer-events-auto",
          isOverlayExpanded ? "left-0 w-full px-4" : "left-4 max-w-[75%]"
        )}>
          <PostCaption
            video={video}
            isExpanded={isOverlayExpanded}
            onToggle={() => setIsOverlayExpanded(!isOverlayExpanded)}
          />
        </div>
      )}

      {/* Subtitles - Positioned at TOP (below top controls) */}
      {!showEnding && video.subtitles && !isOverlayExpanded && (
        <div className="absolute top-[calc(4rem+env(safe-area-inset-top))] left-4 right-4 z-10 pointer-events-none">
          <SubtitleOverlay subtitles={video.subtitles} currentTime={videoRef.current?.currentTime || 0} />
        </div>
      )}

      {/* Action Bar - Just More Button */}
      {!showEnding && !isOverlayExpanded && (
        <div className="absolute right-3 bottom-[calc(7rem+env(safe-area-inset-bottom))] z-20 pointer-events-auto bg-black/80 rounded-full">
          <button
            onClick={() => setShowActionSheet(true)}
            className="p-2 text-white/90 hover:text-white transition-colors"
          >
            <MoreHorizontal size={24} />
          </button>
        </div>
      )}

      {/* Overlays */}
      <EndingCard
        isVisible={showEnding}
        video={video}
        onReplay={handleReplay}
        onNext={handleNext}
      />

      <ActionSheet
        isOpen={showActionSheet}
        onClose={() => setShowActionSheet(false)}
        video={video}
        onLike={() => console.log('Like', video.id)}
        onComment={() => console.log('Comment', video.id)}
        onSave={() => console.log('Save', video.id)}
        onShare={() => console.log('Share', video.id)}
      />
    </div>
  );
}
