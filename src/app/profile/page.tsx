'use client';

import React, { useEffect, useState } from 'react';
import { getUserProfile, UserProfile } from '@/services/userService';
import { KnowledgeGraph } from '@/components/dashboard/KnowledgeGraph';
import { Skeleton } from '@/components/shared/Skeleton';
import { Trophy, Flame, Book, Award } from 'lucide-react';
import { Certificate } from '@/types';

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    getUserProfile().then(setUser);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-black p-6 space-y-6 pt-safe-top">
        <Skeleton className="h-24 w-24 rounded-full mx-auto" />
        <Skeleton className="h-8 w-40 mx-auto" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pb-24 overflow-y-auto">
      {/* Header Profile */}
      <div className="pt-safe-top px-6 py-8 flex flex-col items-center bg-gradient-to-b from-brand/10 to-transparent">
        <div className="relative">
          <img 
            src={user.avatar_url} 
            alt={user.username} 
            className="w-24 h-24 rounded-full border-4 border-brand shadow-[0_0_20px_rgba(255,152,0,0.3)]"
          />
          <div className="absolute -bottom-2 -right-2 bg-brand text-black text-xs font-bold px-2 py-1 rounded-full">
            LV.{user.level}
          </div>
        </div>
        <h1 className="mt-4 text-2xl font-bold">@{user.username}</h1>
        <p className="text-white/60 text-sm">경험치: {user.experience} XP</p>
      </div>

      {/* Stats Row */}
      <div className="px-6 grid grid-cols-3 gap-4 mb-8">
        <StatCard 
          icon={<Flame size={20} className="text-orange-500" />} 
          value={user.stats.streak_days} 
          label="연속 학습" 
        />
        <StatCard 
          icon={<Book size={20} className="text-blue-500" />} 
          value={user.stats.videos_watched} 
          label="시청 완료" 
        />
        <StatCard 
          icon={<Trophy size={20} className="text-yellow-500" />} 
          value={user.stats.insights_collected} 
          label="인사이트" 
        />
      </div>

      {/* Knowledge Graph */}
      <div className="px-6 mb-8">
        <KnowledgeGraph data={user.skills} />
      </div>

      {/* Certificate Section */}
      <div className="px-6 space-y-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Award className="text-brand" size={20} />
          획득한 수료증
        </h3>
        
        {user.certificates && user.certificates.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {user.certificates.map((cert) => (
              <CertificateCard key={cert.id} cert={cert} />
            ))}
          </div>
        ) : (
          <div className="p-6 rounded-xl border border-dashed border-white/20 text-center text-white/40 text-sm">
            아직 획득한 수료증이 없습니다.<br/>
            코스를 완료하고 수료증을 받아보세요!
          </div>
        )}
      </div>
    </main>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode, value: number, label: string }) {
  return (
    <div className="flex flex-col items-center p-3 bg-white/5 rounded-xl border border-white/5">
      <div className="mb-2">{icon}</div>
      <span className="text-xl font-bold">{value}</span>
      <span className="text-xs text-white/50">{label}</span>
    </div>
  );
}

function CertificateCard({ cert }: { cert: Certificate }) {
  // Hydration Safe Date Formatting
  const dateStr = new Date(cert.issued_at).toISOString().split('T')[0].replace(/-/g, '.');

  return (
    <div className="relative group overflow-hidden rounded-lg bg-white/5 border border-white/10 aspect-[4/3]">
      <img 
        src={cert.image_url} 
        alt={cert.course_title} 
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-3">
        <h4 className="text-sm font-bold text-white line-clamp-1">{cert.course_title}</h4>
        <span className="text-[10px] text-brand">{dateStr}</span>
      </div>
    </div>
  );
}
