import { Insight } from "@/types";

// Stub for Gemini AI Service
export const aiService = {
  // 책 텍스트를 입력받아 코스 커리큘럼(챕터 리스트)을 생성
  generateCourseStructure: async (bookText: string) => {
    // Call Gemini API (Stub)
    return [
      { chapter: 1, title: "서론: 왜 중요한가?" },
      { chapter: 2, title: "핵심 개념 설명" },
      // ...
    ];
  },

  // 비디오 스크립트와 메타데이터를 기반으로 인사이트 요약 생성
  generateInsight: async (videoId: string, transcript: string): Promise<Insight> => {
    // Simulate AI Latency
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
      id: `insight-${Date.now()}`,
      video_id: videoId,
      title: "AI가 생성한 핵심 요약",
      summary: "이 영상은 해당 주제의 가장 중요한 부분을 다루고 있습니다. Gemini 1.5 Flash 모델이 내용을 분석하여 핵심을 추출했습니다.",
      key_points: [
        "첫 번째 핵심 포인트입니다.",
        "두 번째 중요한 내용입니다.",
        "마지막으로 기억해야 할 사항입니다."
      ],
      created_at: new Date().toISOString()
    };
  }
};
