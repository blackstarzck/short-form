# 🛠 기술 아키텍처 및 구현 규격

## 1. 프로젝트 파일 구조
```text
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (main)/             # Home (Feed)
│   │   ├── discover/           # Explore Page (Search, Curation)
│   │   ├── category/[id]/      # Category List Page
│   │   ├── book/[id]/          # Book Detail Page
│   │   └── layout.tsx          # Root Layout (Mobile Viewport Wrapper)
│   ├── components/
│   │   ├── feed/               # 숏폼 핵심 컴포넌트
│   │   │   ├── VideoPlayer.tsx        # 비디오 재생 및 UI 오케스트레이션 (Reader Trigger)
│   │   │   ├── PostCaption.tsx        # 게시글 확장 및 도서 정보 오버레이
│   │   │   ├── BookReader.tsx         # [NEW] 도서 리더기 오버레이 컴포넌트
│   │   │   ├── SubtitleOverlay.tsx    # 상단 자막
│   │   │   └── ActionSheet.tsx        # 더보기 메뉴
│   │   ├── layout/             # 공통 레이아웃
│   │   │   └── BottomNav.tsx          # 하단 탭바
│   │   └── shared/             # 공통 UI (Button, etc.)
│   └── utils/
│       └── cn.ts               # Tailwind Class Merge
```

## 2. 핵심 기술 스택
* **Framework:** Next.js 14+ (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS 4 (`no-scrollbar` 유틸리티 적용)
* **Animation:** Framer Motion (`AnimatePresence`, `motion.div`, Spring Transitions)
* **Carousel:** Swiper.js (`swiper/react`, `Pagination`)
* **Icons:** Lucide React

## 3. 주요 구현 패턴 및 결정 사항

### 3.1 뷰포트 및 레이아웃 (Mobile First)
* **Viewport Restriction:** 데스크탑에서도 모바일 앱 경험을 제공하기 위해 `layout.tsx`에서 `max-w-[430px]` 및 `mx-auto`를 적용하여 컨텐츠 영역을 제한.
* **Positioning Strategy:** `fixed` 포지셔닝을 사용하는 요소(헤더, 바텀네비, CTA)는 `w-full max-w-[430px] left-1/2 -translate-x-1/2` 스타일을 적용하여 뷰포트 중앙에 고정되도록 구현.

### 3.2 게시글 확장 (In-place Expansion)
* **State Management:** `VideoPlayer`가 `isOverlayExpanded` 상태를 관리하고 `PostCaption`에 Props로 전달하여 오버레이 배경과 텍스트 확장의 동기화 보장.
* **UI Structure:** 도서 정보가 있는 경우 사용자 정보 대신 도서 커버 이미지를 강조하고, 클릭 시 목차 및 책 소개를 포함한 상세 오버레이 노출.
* **Layering:** `z-index` 계층을 세분화(Video < Gradient < Subtitle < Action < Caption < Reader)하여 모드별 시인성 확보.

### 3.3 도서 리더기 (Seamless Reading Experience)
* **Interaction:** '책 검색' 버튼 클릭 시 `setInterval`을 이용한 테두리 프로그레스 로딩 시뮬레이션 후 리더기 오픈.
* **Component:** `BookReader`는 별도 페이지가 아닌 오버레이 컴포넌트로 구현되어, 영상 재생 상태를 유지하거나(일시정지 후) 빠른 복귀가 가능하도록 설계.

### 3.4 성능 최적화
* **Hydration Mismatch 방지:** `Math.random()` 대신 결정적(Deterministic) 알고리즘이나 인덱스 기반의 값을 사용하여 서버/클라이언트 렌더링 불일치 해결.
* **Lazy Loading:** 리스트 이미지 및 캐러셀 아이템에 지연 로딩 적용.
