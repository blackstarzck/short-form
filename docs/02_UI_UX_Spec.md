# 🎨 UI/UX 상세 명세서

## 1. Z-Index 계층 구조 (Layering Strategy)
* **Level 0:** Video Element (배경 영상)
* **Level 10:** Subtitle Overlay (AI 자막)
* **Level 20:** Action Buttons / More Button (우측 하단 아이콘)
* **Level 30:** Progress Bar (최하단 재생 바)
* **Level 40:** **Post Caption & Overlay** (게시글 확장 및 배경 암전)
* **Level 50:** Deep Dive Sheet / Interaction Popups (인사이트 시트 및 팝업)

## 2. 릴스형 상세글 오버레이 (In-place Expansion)
* **접힘 상태 (Collapsed):**
    * `max-w-[75%]`, `left-4`, `bottom-[calc(2rem+safe-area)]`.
    * `line-clamp-2` 적용 (최대 2줄 노출, 폰트 12px).
* **펼침 상태 (Expanded):**
    * `w-full`, `left-0`, `px-4`, `max-height: 65vh`.
    * 내용이 길어질 경우 `overflow-y-auto` 적용하여 내부 스크롤 활성화.
    * 상세 정보(목차 등)는 14px로 가독성 확보.
* **애니메이션:**
    * **배경:** `bg-black/80` 레이어 0.3초간 Fade-in (기존 50%에서 상향 조정).
    * **텍스트:** 즉시 확장 (Instant).
* **집중 모드 (Focus Mode):** 확장 시 자막(Level 10), 액션 버튼(Level 20), Progress Bar(Level 30)를 숨김 처리.

## 3. 주요 구성 요소 상세
* **자막 (Subtitle):** `top-[calc(4rem+safe-area)]`, 텍스트 섀도우 적용, 배경 박스 없음.
* **액션 버튼:** '더 보기'(`MoreHorizontal`) 아이콘만 노출. 클릭 시 액션 시트 호출.
* **비주얼 훅:** 영상 시작 후 3초간 중앙 대형 타이포그래피로 지식 가치 제안.

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
    * **CTA:** '전자책 구매/구독' 버튼 하단 Sticky. (Bottom Navigation 상단 `bottom-16` 배치로 겹침 방지).

## 5. 반응형 및 모바일 최적화
* **Viewport Restriction:** 데스크탑에서도 모바일 경험을 유지하기 위해 `max-w-[430px]`, `mx-auto` 적용.
* **Background:** 메인 컨텐츠 외 영역은 `bg-gray-950`으로 처리하여 집중도 향상.
* **Sticky Positioning:** `fixed` 요소들도 `max-w-[430px]`, `left-1/2 -translate-x-1/2`를 적용하여 중앙 정렬 유지.
