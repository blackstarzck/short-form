-- [문제 해결] 비디오 재생 오류 수정 스크립트
-- Supabase Dashboard > SQL Editor 에서 이 스크립트를 실행하세요.

-- 설명: 스토리지에 새로 업로드한 영상의 파일명으로 DB를 업데이트해야 합니다.
-- '새로_업로드한_파일명.mp4' 부분을 실제 스토리지에 있는 파일명으로 변경해주세요.

-- 2번째 영상 수정
UPDATE public.videos
SET video_path = '새로_업로드한_파일명_2.mp4'
WHERE title = 'Next.js 14 라우팅 마스터'; -- 또는 해당 영상의 제목

-- 4번째 영상 수정
UPDATE public.videos
SET video_path = '새로_업로드한_파일명_4.mp4'
WHERE title = '네 번째 영상'; -- 실제 DB에 저장된 타이틀 확인 필요

-- 5번째 영상 수정
UPDATE public.videos
SET video_path = '새로_업로드한_파일명_5.mp4'
WHERE title = '다섯 번째 영상';

-- 팁: 현재 등록된 비디오 목록과 파일 경로 확인하기
SELECT id, title, video_path FROM public.videos ORDER BY created_at ASC;
