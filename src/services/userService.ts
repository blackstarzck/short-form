import { Certificate } from '@/types'; // Import Certificate type

export interface UserProfile {
  id: string;
  username: string;
  avatar_url: string;
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
  certificates?: Certificate[]; // Add certificates to UserProfile
}

export const MOCK_USER: UserProfile = {
  id: "u1",
  username: "learning_machine",
  avatar_url: "https://github.com/shadcn.png",
  level: 5,
  experience: 2400,
  stats: {
    videos_watched: 142,
    insights_collected: 85,
    streak_days: 12
  },
  skills: [
    { subject: 'React', A: 120, fullMark: 150 },
    { subject: 'Next.js', A: 98, fullMark: 150 },
    { subject: 'CSS', A: 86, fullMark: 150 },
    { subject: 'Backend', A: 65, fullMark: 150 },
    { subject: 'AI', A: 40, fullMark: 150 },
    { subject: 'DevOps', A: 55, fullMark: 150 },
  ],
  certificates: [
    {
      id: "cert1",
      course_id: "c1",
      course_title: "React 완전 정복",
      issued_at: "2024-01-15T09:00:00Z",
      image_url: "https://placehold.co/400x300/FF9800/FFFFFF?text=React+Cert"
    },
    {
      id: "cert2",
      course_id: "c2",
      course_title: "UI 디자인 패턴",
      issued_at: "2024-02-01T14:30:00Z",
      image_url: "https://placehold.co/400x300/2196F3/FFFFFF?text=UI+Design"
    }
  ]
};

export async function getUserProfile(): Promise<UserProfile> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_USER;
}
