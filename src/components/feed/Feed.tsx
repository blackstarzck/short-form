'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { Video } from '@/types';
import { VideoPlayer } from './VideoPlayer';
import { RecommendationCard, RecommendationData } from './RecommendationCard';
import { useInfiniteVideos } from '@/hooks/useInfiniteVideos';
import { Skeleton } from '@/components/shared/Skeleton';
import { Loader2 } from 'lucide-react';

// Dummy Data for Recommendation Cards (4 Types)
const RECOMMENDATIONS: RecommendationData[] = [
  // 1. Spotlight
  {
    type: 'spotlight',
    title: "부의 추월차선",
    author: "엠제이 드마코",
    description: "젊어서 은퇴하고 부자가 되고 싶다면, 지금 당장 추월차선에 올라타라.",
    coverUrl: "https://image.yes24.com/goods/90547454/XL",
    themeColor: "from-yellow-900 to-orange-900",
    points: 500
  },
  // 2. List
  {
    type: 'list',
    title: "성공하는 사람들의 습관",
    description: "상위 1%가 매일 실천하는 비밀스러운 루틴",
    themeColor: "from-blue-900 to-slate-900",
    books: [
      { title: "타이탄의 도구들", author: "팀 페리스", coverUrl: "https://image.yes24.com/goods/37299335/XL" },
      { title: "아주 작은 습관의 힘", author: "제임스 클리어", coverUrl: "https://image.yes24.com/goods/69655504/XL" },
      { title: "그릿", author: "앤절라 더크워스", coverUrl: "https://image.yes24.com/goods/32953272/XL" },
      { title: "마인드셋", author: "캐럴 드웩", coverUrl: "https://image.yes24.com/goods/57723223/XL" }
    ]
  },
  // 3. Curation
  {
    type: 'curation',
    title: "새벽 4시의 기적",
    description: "세상이 잠든 시간, 오직 나에게 집중하며 미래를 바꾸는 시간. 미라클 모닝을 위한 필독서.",
    themeColor: "from-indigo-900 to-purple-900",
    backgroundImage: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1000&auto=format&fit=crop",
    points: 1000
  },
  // 4. New
  {
    type: 'new',
    title: "퓨처 셀프",
    author: "벤저민 하디",
    description: "미래의 나를 명확하게 그리면 현재의 행동이 바뀐다.",
    coverUrl: "https://image.yes24.com/goods/122090075/XL",
    themeColor: "from-red-900 to-rose-900",
    points: 300
  }
];

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
        {videos.map((video, index) => {
          const isRecPosition = (index + 1) % 1 === 0; // Insert every 1 video
          const recIndex = Math.floor((index + 1) / 1) - 1;
          const recommendation = RECOMMENDATIONS[recIndex % RECOMMENDATIONS.length];

          return (
            <React.Fragment key={`${video.id}-${index}`}>
              <FeedItem
                video={video}
                index={index}
                isActive={activeVideoId === video.id}
                onInView={handleInView}
              />
              {isRecPosition && recommendation && (
                <RecommendationCard
                  {...recommendation}
                />
              )}
            </React.Fragment>
          );
        })}

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
