import { Video, Course } from "@/types";
import { createClient } from "@/lib/supabase/client";
import { getVideoUrl, getCoverUrl } from "@/utils/supabase/storage";

// Mock Data with Supabase Storage Structure
export const MOCK_VIDEOS: Video[] = [
  {
    id: "v1",
    course_id: "c1",
    chapter_index: 1,
    title: "React Server Components 이해하기",
    description: "웹 개발의 판도를 바꾸는 RSC. 클라이언트 번들 사이즈를 줄이고 초기 로딩 속도를 획기적으로 개선합니다.",
    // Actual file from 'videos' bucket
    video_url: getVideoUrl("KakaoTalk_20250620_093842405.mp4"), 
    thumbnail_url: getVideoUrl("thumbnails/rsc_intro.jpg"),
    duration: 15,
    created_at: new Date().toISOString(),
    creator: {
      id: "u1",
      email: "guru@example.com",
      username: "tech_guru",
      avatar_url: "https://github.com/shadcn.png",
      saved_videos: [],
      watched_history: []
    },
    stats: {
      likes: 1240,
      views: 50000,
      shares: 320
    },
    related_book: {
      title: "모던 리액트 Deep Dive",
      author: "김개발",
      purchase_url: "https://example.com/buy/react",
      cover_url: getCoverUrl("cover-01.png")
    },
    subtitles: [
      { id: "s1", start_time: 0, end_time: 3, text: "React Server Components는 정말 효율적입니다." },
      { id: "s2", start_time: 3, end_time: 6, text: "서버에서 실행되므로 자바스크립트 번들을 클라이언트로 보낼 필요가 없죠." },
      { id: "s3", start_time: 6, end_time: 10, text: "사용자에게 훨씬 더 빠른 초기 로딩 속도를 제공합니다." },
      { id: "s4", start_time: 10, end_time: 15, text: "지금 바로 Next.js App Router에서 사용해보세요!" }
    ],
    insights: [
      {
        id: "i1",
        video_id: "v1",
        title: "제로 번들 사이즈의 힘",
        summary: "React Server Components(RSC)를 사용하면 컴포넌트 로직이 서버에서만 실행되므로, 클라이언트로 전송되는 JavaScript 양을 대폭 줄일 수 있습니다.",
        key_points: [
          "RSC는 오직 서버에서만 실행됩니다.",
          "클라이언트 측 자바스크립트 번들 크기 감소.",
          "백엔드 리소스(DB, 파일시스템)에 직접 접근 가능."
        ],
        created_at: new Date().toISOString()
      }
    ]
  },
  {
    id: "v2",
    course_id: "c1",
    chapter_index: 2,
    title: "Next.js 14 라우팅 마스터",
    description: "파일 기반 라우팅의 모든 것. 레이아웃과 템플릿의 차이를 완벽하게 이해해보세요.",
    video_url: getVideoUrl("KakaoTalk_20250801_145303805.mp4"),
    thumbnail_url: getVideoUrl("thumbnails/nextjs_routing.jpg"),
    duration: 60,
    created_at: new Date().toISOString(),
    creator: {
      id: "u1",
      email: "guru@example.com",
      username: "tech_guru",
      avatar_url: "https://github.com/shadcn.png",
      saved_videos: [],
      watched_history: []
    },
    stats: {
      likes: 850,
      views: 32000,
      shares: 150
    },
    related_book: {
      title: "모던 리액트 Deep Dive",
      author: "김개발",
      purchase_url: "https://example.com/buy/react",
      cover_url: getCoverUrl("cover-01.png")
    },
    subtitles: [
      { id: "s1", start_time: 0, end_time: 5, text: "폴더 구조가 곧 라우트가 됩니다." },
      { id: "s2", start_time: 5, end_time: 10, text: "page.tsx는 UI를, layout.tsx는 공통 껍데기를 담당하죠." }
    ],
    insights: [
      {
        id: "i2",
        video_id: "v2",
        title: "App Router의 핵심",
        summary: "Next.js App Router는 중첩된 레이아웃과 코로케이션(Co-location)을 강력하게 지원합니다.",
        key_points: [
          "폴더 기반의 직관적인 라우팅.",
          "중첩 레이아웃으로 UI 재사용성 극대화.",
          "서버 컴포넌트 기본 적용."
        ],
        created_at: new Date().toISOString()
      }
    ]
  }
];

export async function getVideos(page = 1, limit = 5): Promise<Video[]> {
  const supabase = createClient();
  
  try {
    // Try fetching from real DB
    // Assuming a 'videos' table with joins to 'books' and 'users'
    // This query is speculative based on standard Supabase patterns
    const { data, error } = await supabase
      .from('videos')
      .select(`
        *,
        creator:users(*),
        related_book:books(*),
        subtitles(*),
        insights(*)
      `)
      .range((page - 1) * limit, page * limit - 1);

    if (error || !data || data.length === 0) {
      // Fallback to Mock if DB fetch fails or empty
      console.warn("Fetching from Supabase DB failed or empty, using Mock data.", error);
      
      const mockData = Array.from({ length: limit }).map((_, i) => {
        const globalIndex = (page - 1) * limit + i;
        const template = MOCK_VIDEOS[globalIndex % MOCK_VIDEOS.length];
        return {
          ...template,
          id: `${template.id}_${page}_${i}`,
          title: `${template.title} #${globalIndex + 1}`,
        };
      });

      await new Promise(resolve => setTimeout(resolve, 500));
      return mockData;
    }

    // Map DB result to Video type
    return data.map((item: any) => ({
      ...item,
      // Map flat DB columns to nested stats object
      stats: {
        likes: item.likes || 0,
        views: item.views || 0,
        shares: item.shares || 0
      },
      video_url: item.video_url || getVideoUrl(item.video_path),
      thumbnail_url: item.thumbnail_url || getVideoUrl(item.thumbnail_path),
      related_book: item.related_book ? {
        ...item.related_book,
        cover_url: item.related_book.cover_url || getCoverUrl(item.related_book.cover_path)
      } : undefined
    }));

  } catch (e) {
    console.error("Unexpected error fetching videos:", e);
    return MOCK_VIDEOS;
  }
}
