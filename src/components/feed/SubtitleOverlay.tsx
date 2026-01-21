import React from 'react';
import { Subtitle } from '@/types';

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
      {/* No background box - just text with strong drop shadow for readability */}
      <p 
        className="text-white text-xl font-bold leading-relaxed"
        style={{
          textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.5)',
        }}
      >
        {currentSubtitle.text}
      </p>
    </div>
  );
}
