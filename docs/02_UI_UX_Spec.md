# 🎨 UI/UX 상세 명세서

## 1. Z-Index 계층 구조 (Layering Strategy)
* **Level 0:** Video Element (배경 영상)
* **Level 5:** **Gradient Overlay** (하단 텍스트 가독성 확보용, `black/70` from bottom 25%)
* **Level 10:** Subtitle Overlay (AI 자막)
* **Level 20:** Action Buttons / **Book Search Button** (우측 하단 아이콘)
* **Level 30:** Progress Bar (최하단 재생 바)
* **Level 40:** **Post Caption & Overlay** (게시글 확장 및 배경 암전)
* **Level 50:** **Book Reader** / Deep Dive Sheet (전체 화면 독서 모드 및 인사이트 시트)

## 2. 릴스형 상세글 오버레이 (In-place Expansion)
* **접힘 상태 (Collapsed):**
    * **도서 정보 모드:** 도서 커버(`86px` x `128px`), 제목(Bold), 저자, 출판사 순으로 노출.
    * **일반 모드:** 사용자 아바타 및 닉네임 노출.
    * 영역 클릭 시 확장 애니메이션 트리거.
* **펼침 상태 (Expanded):**
    * **책 소개:** 상단에 배치, 기본 2줄 노출(`line-clamp-2`) + '더보기' 버튼(Brand Color)으로 전체 보기 토글.
    * **상세 정보:** 카테고리, 페이지, 용량, ISBN 등 메타 정보를 카드 UI 없이 깔끔한 텍스트 그리드로 표현.
    * **목차:** 계층 구조를 시각화(좌측 보더 등)하여 리스트업.
    * **스크롤바:** `no-scrollbar` 유틸리티 적용하여 스크롤은 가능하되 스크롤바는 숨김.
* **애니메이션:**
    * **배경:** `bg-black/80` 레이어 0.3초간 Fade-in.
    * **텍스트:** 즉시 확장 (Instant).

## 3. 주요 구성 요소 상세
* **자막 (Subtitle):** `top-[calc(4rem+safe-area)]`, 텍스트 섀도우 적용.
* **액션 버튼 (우측 하단):**
    * **책 검색(바로 읽기):** `BookSearch` 아이콘 적용.
        * **Loading State:** 클릭 시 버튼 테두리에 원형 프로그레스 바(Brand Color) 애니메이션 + 중앙 진행률(%) 숫자 표시.
        * **완료:** 100% 도달 후 0.3초 딜레이 뒤 `Book Reader` 오버레이 호출.
    * **더 보기:** `MoreHorizontal` 아이콘. 클릭 시 액션 시트 호출.
* **도서 리더기 (Book Reader):**
    * **진입:** 우측에서 좌측으로 슬라이드 (`Slide-in-from-right`).
    * **디자인:** 종이책 질감의 미색 배경(`#F9F7F1`), Serif 폰트 사용으로 가독성 및 감성 강화.
    * **구조:** 헤더(뒤로가기, 챕터명), 본문(스크롤 가능), 하단(진행률 바).
* **그라데이션 오버레이:** 영상 하단 25% 영역에 `black/70` -> `transparent` 그라데이션을 적용하여 흰색 텍스트(도서 정보)의 가독성 확보.

---

## 4. 탐색(Explore) 탭 UX 고도화 설계

### 4.1 탐색 메인 페이지 (Depth 1)
* **검색 바 (Search Bar):**
    * **동작:** 클릭 시 상단 고정 및 오버레이 확장.
    * **애니메이션:** 포커스 시 주변 요소 Fade-out, 추천 검색어 슬라이드 다운.
* **큐레이션 (Curation Carousel):**
    * **UX:** **Swiper.js** 기반 캐러셀 적용. `centeredSlides`, `slidesPerView='auto'`로 다음 카드 넛지(Nudge) 효과.
    * **페이지네이션:** 브랜드 컬러(#FF9800) 인디케이터 적용.
* **카테고리 (Category Grid):**
    * **디자인:** 아이콘 + 파스텔톤 배경으로 가독성 강화.
    * **진입 효과:** 순차적 Stagger Animation 적용.
* **최신 지식 쇼츠 그리드:**
    * **레이아웃:** 3열 그리드, 썸네일 비율 고정 (Layout Shift 방지).
    * **성능:** Lazy Loading 및 Fade-in 적용.

### 4.2 도서 목록 및 상세 UX (Seamless Journey)
* **화면 전환 (Shared Element Transition):**
    * 목록의 썸네일/타이틀이 상세 페이지 헤더로 자연스럽게 이동하며 확장.
* **도서 목록 페이지:**
    * **Infinite Scroll:** 하단 Skeleton 리스트 미리 렌더링.
    * **진입:** 도서 카드 클릭 시 상세 페이지 Slide-up (Sheet 방식).
* **도서 상세 페이지:**
    * **헤더:** 스크롤 시 커버 이미지 Blur 처리, 타이틀 상단 고정 (Sticky Header).
    * **CTA:** '바로 읽기' 버튼 클릭 시 쇼츠와 동일한 `Book Reader` 오버레이 호출.

## 5. 반응형 및 모바일 최적화
* **Viewport Restriction:** 데스크탑에서도 모바일 경험을 유지하기 위해 `max-w-[430px]`, `mx-auto` 적용.
* **Background:** 메인 컨텐츠 외 영역은 `bg-gray-950`으로 처리하여 집중도 향상.
* **Sticky Positioning:** `fixed` 요소들도 `max-w-[430px]`, `left-1/2 -translate-x-1/2`를 적용하여 중앙 정렬 유지.
