# 기술 스택 및 엔지니어링 규격 (Final)

## 1. 프론트엔드 & 애니메이션
* **Framework:** `Next.js 14+ (App Router)`
* **Styling:** `Tailwind CSS` (Mobile-First, Safe Area 최적화)
* **Animation:** `Framer Motion` (엔딩 카드 및 바텀 시트 트랜지션)
* **Video Player:** HTML5 Video + `react-use` (재생 상태 제어)

## 2. 인프라 및 데이터베이스
* **BaaS:** `Supabase` (Auth, DB, Storage)
    * **Storage Buckets:**
        * `videos`: 숏폼 영상 파일 (.mp4) 저장
        * `covers`: 도서 표지 및 썸네일 이미지 (.jpg, .png) 저장
* **AI Engine:** `Google Gemini API (1.5 Flash)`
    * 역할: 전자책 본문 분절화, 숏폼 스크립트 추출, 핵심 키워드 생성
* **Analytics:** 시청 완료율 및 전환율(CTA 클릭) 추적 로직

## 3. 핵심 렌더링 및 비즈니스 로직
1. **렌더링 최적화 (Rendering Strategy):**
    * **프리페칭:** 현재 영상($N$) 재생 중 다음 영상($N+1$)의 초기 버퍼 및 자막 데이터 선행 로드.
    * **교차 관찰:** 뷰포트 80% 이상 노출 시 자동 재생, 벗어나면 리소스 즉시 해제.
2. **지식 분절화 로직:**
    * 책 한 권을 10~15개의 클립으로 쪼개는 '코스(Course)' 단위 데이터 매핑.
3. **보상 시스템:** * 시청 완료 시 포인트 지급 및 수료 상태 업데이트 (Server Actions 사용).