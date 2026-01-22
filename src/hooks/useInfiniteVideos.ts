'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Video } from '@/types';
import { getVideos } from '@/services/videoService';

interface UseInfiniteVideosOptions {
    /** 초기 로드할 영상 개수 (기본: 5) */
    initialLoadCount?: number;
    /** 추가 로드할 영상 개수 (기본: 5) */
    loadMoreCount?: number;
    /** 추가 로드를 트리거할 남은 영상 개수 (기본: 2) */
    loadMoreThreshold?: number;
}

interface UseInfiniteVideosReturn {
    videos: Video[];
    loading: boolean;
    loadingMore: boolean;
    hasMore: boolean;
    currentIndex: number;
    setCurrentIndex: (index: number) => void;
    loadMore: () => Promise<void>;
}

/**
 * 무한 스크롤 영상 로딩을 위한 커스텀 훅
 * 
 * 특징:
 * - 초기 로드 시 5개 영상
 * - 특정 위치 도달 시 추가 5개 로드
 * - 빠른 스크롤 시 놓친 로드 시점 감지 및 보정
 */
export function useInfiniteVideos({
    initialLoadCount = 5,
    loadMoreCount = 5,
    loadMoreThreshold = 2,
}: UseInfiniteVideosOptions = {}): UseInfiniteVideosReturn {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    const pageRef = useRef(1);
    const isLoadingRef = useRef(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // 초기 로드
    useEffect(() => {
        const loadInitial = async () => {
            setLoading(true);
            try {
                const data = await getVideos(1, initialLoadCount);
                setVideos(data);
                setHasMore(data.length >= initialLoadCount);
                pageRef.current = 1;
            } catch (error) {
                console.error('Failed to load initial videos:', error);
            } finally {
                setLoading(false);
            }
        };
        loadInitial();
    }, [initialLoadCount]);

    // 추가 로드 함수
    const loadMore = useCallback(async () => {
        // 이미 로딩 중이거나 더 이상 데이터가 없으면 스킵
        if (isLoadingRef.current || !hasMore) return;

        isLoadingRef.current = true;
        setLoadingMore(true);

        try {
            const nextPage = pageRef.current + 1;
            const newVideos = await getVideos(nextPage, loadMoreCount);

            if (newVideos.length === 0) {
                setHasMore(false);
            } else {
                setVideos(prev => [...prev, ...newVideos]);
                pageRef.current = nextPage;
                setHasMore(newVideos.length >= loadMoreCount);
            }
        } catch (error) {
            console.error('Failed to load more videos:', error);
        } finally {
            isLoadingRef.current = false;
            setLoadingMore(false);
        }
    }, [hasMore, loadMoreCount]);

    // 현재 인덱스 변경 시 추가 로드 체크
    // 빠른 스크롤 대응: debounce를 사용하여 스크롤이 멈췄을 때 체크
    useEffect(() => {
        // 남은 영상 개수 계산
        const remainingVideos = videos.length - currentIndex - 1;

        // 즉시 체크: 남은 영상이 threshold 이하면 바로 로드
        if (remainingVideos <= loadMoreThreshold && hasMore && !isLoadingRef.current) {
            loadMore();
            return;
        }

        // 빠른 스크롤 대응: 스크롤이 멈춘 후 300ms 뒤에 다시 체크
        // 사용자가 빠르게 스크롤하여 로드 시점을 지나쳤을 경우를 대비
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
            const remainingAfterScroll = videos.length - currentIndex - 1;
            if (remainingAfterScroll <= loadMoreThreshold && hasMore && !isLoadingRef.current) {
                loadMore();
            }
        }, 300);

        return () => {
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [currentIndex, videos.length, loadMoreThreshold, hasMore, loadMore]);

    return {
        videos,
        loading,
        loadingMore,
        hasMore,
        currentIndex,
        setCurrentIndex,
        loadMore,
    };
}
