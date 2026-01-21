# 📱 사이트맵 및 사용자 흐름 (Flow)

## 1. 서비스 구조 (Sitemap)
* **Home (홈):** `/`
    * 릴스형 지식 피드 (무한 스크롤).
    * 게시글 확장 (In-place Overlay) 및 상세 정보 제공.
* **Discover (탐색):** `/discover`
    * **메인:** 통합 검색바, 큐레이션 캐러셀 (Swiper), 카테고리 그리드, 급상승 쇼츠.
    * **Category List:** `/category/[id]` - 분야별 도서 목록 (세로 리스트형).
    * **Book Detail:** `/book/[id]` - 도서 상세 정보 (Cover, Stats, TOC), 챕터 리스트, 구매 유도 CTA.
* **Profile (프로필):** `/profile`
    * 지식 성좌 차트, 포인트 이력, 저장한 콘텐츠.

## 2. 핵심 UX Flow (User Journey)

### A. 우연한 발견 (Serendipity) - Home
1. **쇼츠 시청** (Visual Hook)
2. 흥미 발생 시 **게시글 영역 클릭** (In-place Expansion)
3. **오버레이 확장**되며 도서 메타 정보 및 목차 확인
4. **'팔로우'** 또는 **'저장'** 액션 수행

### B. 목적형 탐색 (Discovery) - Discover
1. **탐색 탭 진입** (`/discover`)
2. **큐레이션 배너** 스와이프 또는 **카테고리** 선택
3. **도서 상세 페이지** (`/book/[id]`) 진입
4. **'바로 읽기'** 버튼 클릭 (전자책/쇼츠 결합 상품 구매 유도)

### C. 지식 연결 (Connection)
* 도서 상세 페이지에서 **챕터(Chapter)** 클릭 시 해당 쇼츠 영상으로 바로 연결되어 끊김 없는 학습 경험 제공.
