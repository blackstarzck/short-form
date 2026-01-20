-- 1. 기존 비디오 데이터 업데이트 (첫 번째 영상)
UPDATE public.videos
SET video_path = 'KakaoTalk_20250620_093842405.mp4',
    title = 'RSC란 무엇인가? (Real Video)',
    thumbnail_path = null -- 썸네일이 없으면 null로 설정 (비디오 첫 프레임이나 기본 이미지 사용)
WHERE title LIKE 'RSC란 무엇인가%';

-- 2. 추가 비디오 데이터 삽입 (나머지 영상들)
-- 사용자 ID와 책 ID는 기존 데이터를 재사용합니다.
DO $$
DECLARE
  v_user_id uuid;
  v_book_id uuid;
BEGIN
  SELECT id INTO v_user_id FROM public.users LIMIT 1;
  SELECT id INTO v_book_id FROM public.books LIMIT 1;

  INSERT INTO public.videos (user_id, book_id, title, description, video_path, duration)
  VALUES 
    (v_user_id, v_book_id, '두 번째 영상', 'KakaoTalk 영상 2', 'KakaoTalk_20250801_145303805.mp4', 60),
    (v_user_id, v_book_id, '세 번째 영상', 'KakaoTalk 영상 3', 'KakaoTalk_20250810_211800886.mp4', 60),
    (v_user_id, v_book_id, '네 번째 영상', 'KakaoTalk 영상 4', 'KakaoTalk_20250827_154958667.mp4', 60),
    (v_user_id, v_book_id, '다섯 번째 영상', 'KakaoTalk 영상 5', 'KakaoTalk_20251223_183205414.mp4', 60)
  ON CONFLICT DO NOTHING;
END $$;
