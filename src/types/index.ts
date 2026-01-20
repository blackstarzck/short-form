export interface Video {
  id: string;
  course_id?: string; // 소속된 코스(책) ID
  chapter_index?: number; // 코스 내 순서
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  duration: number;
  created_at: string;
  creator: User;
  stats: {
    likes: number;
    views: number;
    shares: number;
  };
  related_book?: {
    title: string;
    author: string;
    purchase_url: string;
    cover_url: string;
  };
  subtitles?: Subtitle[];
  insights?: Insight[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  cover_url: string;
  total_chapters: number;
  completed_chapters: number;
  videos: string[]; // video_ids
}

export interface Subtitle {
  id: string;
  start_time: number; // seconds
  end_time: number; // seconds
  text: string;
}

export interface Insight {
  id: string;
  video_id: string;
  title: string;
  summary: string; // Gemini generated summary
  key_points: string[];
  created_at: string;
}

export interface Certificate {
  id: string;
  course_id: string;
  course_title: string;
  issued_at: string;
  image_url: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
  saved_videos: string[]; // video_ids
  watched_history: string[]; // video_ids
  certificates?: Certificate[];
}

export interface UserProfile extends User {
  level: number;
  experience: number;
  stats: {
    videos_watched: number;
    insights_collected: number;
    streak_days: number;
  };
  skills: {
    subject: string;
    A: number; // Current Level
    fullMark: number;
  }[];
}
