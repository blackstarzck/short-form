import React from 'react';
import { Subtitle } from '@/types';
import { cn } from '@/utils/cn';

interface SubtitleOverlayProps {
  subtitles: Subtitle[];
  currentTime: number;
}

export function SubtitleOverlay({ subtitles, currentTime }: SubtitleOverlayProps) {
  const currentSubtitle = subtitles.find(
    (sub) => currentTime >= sub.start_time && currentTime <= sub.end_time
  );

  if (!currentSubtitle) return null;

  return (
    <div className="w-full px-6 text-center">
      <div 
        className={cn(
          "inline-block bg-black/60 backdrop-blur-sm rounded-lg p-3",
          "transition-all duration-200 ease-out"
        )}
      >
        <p className="text-white text-lg font-medium leading-relaxed drop-shadow-md">
          {currentSubtitle.text}
        </p>
      </div>
    </div>
  );
}
