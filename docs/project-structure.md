# 📂 프로젝트 구조 설계 (Final)

```text
├── src/
│   ├── app/                # Next.js App Router
│   ├── components/
│   │   ├── feed/           # VideoPlayer, RightActionBar, EndingCard
│   │   ├── shared/         # BottomSheet, ActionSheet, Skeleton
│   │   └── dashboard/      # StarChart (Recharts), CertificateCard
│   ├── services/           # Business Logic
│   │   ├── aiService.ts    # Gemini 기반 지식 분절 및 요약 로직
│   │   ├── courseService.ts# 마이크로 러닝 진행률 및 인증서 관리
│   │   └── videoService.ts # 스트리밍 및 프리페칭 제어
│   ├── lib/                # Supabase, Gemini 설정
│   ├── hooks/              # useVideoInfiniteScroll, useIntersectionObserver
│   └── types/              # DB 및 API 공통 타입