-- books 테이블의 표지 경로를 실제 파일명으로 수정
UPDATE public.books
SET cover_path = 'cover-01.png'
WHERE title = '모던 리액트 Deep Dive';
