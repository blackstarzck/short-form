'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { Video } from '@/types';
import { VideoPlayer } from './VideoPlayer';
import { useInfiniteVideos } from '@/hooks/useInfiniteVideos';
import { Skeleton } from '@/components/shared/Skeleton';
import { Loader2 } from 'lucide-react';

/**
 * 영상 로딩 규칙:
 * - 초기 로드: 5개
 * - 추가 로드: 남은 영상 2개 이하일 때 5개씩 추가
 * - 빠른 스크롤 대응: 스크롤 멈춤 후 위치 확인하여 필요시 로드
 */

function FeedItem({
  video,
  isActive,
  index,
  onInView,
}: {
  video: Video;
  isActive: boolean;
  index: number;
  onInView: (id: string, index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onInView(video.id, index);
        }
      },
      { threshold: 0.6 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [video.id, index, onInView]);

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
  const {
    videos,
    loading,
    loadingMore,
    hasMore,
    setCurrentIndex,
  } = useInfiniteVideos({
    initialLoadCount: 5,
    loadMoreCount: 5,
    loadMoreThreshold: 2,
  });

  const [activeVideoId, setActiveVideoId] = React.useState<string | null>(null);

  // 첫 번째 영상을 기본 활성화
  useEffect(() => {
    if (videos.length > 0 && !activeVideoId) {
      setActiveVideoId(videos[0].id);
    }
  }, [videos, activeVideoId]);

  const handleInView = useCallback((id: string, index: number) => {
    setActiveVideoId(id);
    setCurrentIndex(index);
  }, [setCurrentIndex]);

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
        {videos.map((video, index) => (
          <FeedItem
            key={video.id}
            video={video}
            index={index}
            isActive={activeVideoId === video.id}
            onInView={handleInView}
          />
        ))}

        {/* 추가 로딩 인디케이터 */}
        {loadingMore && (
          <div className="h-20 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          </div>
        )}

        {/* 더 이상 영상이 없을 때 */}
        {!hasMore && videos.length > 0 && (
          <div className="h-20 flex items-center justify-center">
            <p className="text-gray-500 text-sm">모든 영상을 확인했습니다</p>
          </div>
        )}
      </div>
    </>
  );
}
