-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Users Table (Public Profile)
create table public.users (
  id uuid references auth.users not null primary key,
  email text,
  username text,
  avatar_url text,
  level int default 1,
  experience int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Books Table
create table public.books (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  author text,
  purchase_url text,
  cover_path text, -- Storage path e.g., "cover1.jpg"
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Courses Table (Optional, for future use)
create table public.courses (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  cover_path text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Videos Table
create table public.videos (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id),
  course_id uuid references public.courses(id),
  book_id uuid references public.books(id), -- Foreign Key for related_book
  chapter_index int default 1,
  title text not null,
  description text,
  video_path text not null, -- Storage path e.g., "video1.mp4"
  thumbnail_path text,
  duration int default 0,
  views int default 0,
  likes int default 0,
  shares int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Subtitles Table
create table public.subtitles (
  id uuid default uuid_generate_v4() primary key,
  video_id uuid references public.videos(id) on delete cascade,
  start_time float not null,
  end_time float not null,
  text text not null
);

-- 6. Insights Table
create table public.insights (
  id uuid default uuid_generate_v4() primary key,
  video_id uuid references public.videos(id) on delete cascade,
  title text not null,
  summary text,
  key_points jsonb, -- Array of strings
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies (Enable Read for everyone)
alter table public.users enable row level security;
create policy "Public profiles are viewable by everyone" on public.users for select using (true);

alter table public.books enable row level security;
create policy "Books are viewable by everyone" on public.books for select using (true);

alter table public.courses enable row level security;
create policy "Courses are viewable by everyone" on public.courses for select using (true);

alter table public.videos enable row level security;
create policy "Videos are viewable by everyone" on public.videos for select using (true);

alter table public.subtitles enable row level security;
create policy "Subtitles are viewable by everyone" on public.subtitles for select using (true);

alter table public.insights enable row level security;
create policy "Insights are viewable by everyone" on public.insights for select using (true);

-- Mock Data Insertion (Optional)
-- You can run this part after creating at least one user via Auth
/*
insert into public.books (title, author, purchase_url, cover_path)
values ('Modern React Deep Dive', 'Kim Developer', 'https://example.com', 'modern_react.jpg');

insert into public.videos (title, description, video_path, duration)
values ('React Server Components Intro', 'Understanding RSC', 'rsc_intro.mp4', 15);
*/
