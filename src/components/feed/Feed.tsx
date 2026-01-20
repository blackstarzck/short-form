'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Video } from '@/types';
import { VideoPlayer } from './VideoPlayer';
import { getVideos } from '@/services/videoService';
import { Skeleton } from '@/components/shared/Skeleton';

// Let's use a simple approach:
// Render list.
// Each Item observes itself. If it comes into view (threshold 0.6), it sets itself as active.
// Parent manages "activeId".

function FeedItem({ 
  video, 
  isActive, 
  onInView,
}: { 
  video: Video; 
  isActive: boolean; 
  onInView: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onInView(video.id);
        }
      },
      { threshold: 0.6 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, [video.id, onInView]);

  return (
    <div ref={ref} className="h-[100dvh] w-full snap-start">
      <VideoPlayer 
        video={video} 
        isActive={isActive} 
      />
    </div>
  );
}

export function Feed() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Initial Fetch
  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      const data = await getVideos();
      setVideos(data);
      if (data.length > 0) setActiveVideoId(data[0].id);
      setLoading(false);
    };
    loadVideos();
  }, []);

  const handleInView = useCallback((id: string) => {
    setActiveVideoId(id);
  }, []);

  if (loading && videos.length === 0) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center space-y-4">
        <Skeleton className="h-[80vh] w-full max-w-md" />
        <Skeleton className="h-10 w-3/4 max-w-sm" />
      </div>
    );
  }

  return (
    <>
      <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black">
        {videos.map((video) => (
          <FeedItem 
            key={video.id} 
            video={video} 
            isActive={activeVideoId === video.id} 
            onInView={handleInView}
          />
        ))}
        {/* Loader for infinite scroll would go here */}
      </div>
    </>
  );
}
