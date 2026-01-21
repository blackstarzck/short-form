'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Share2, BookOpen } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { cn } from '@/utils/cn';

export default function BookDetailPage() {
  const router = useRouter();
  const params = useParams();
  // id is not used in the dummy implementation but needed for real data fetching
  const id = params?.id;
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll handler for header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pb-32">
      {/* Sticky Header */}
      <header
        className={cn(
          "fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 transition-all duration-300 px-4 py-3 flex items-center justify-between",
          isScrolled ? "bg-black/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"
        )}
      >
        <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-white/10 bg-black/20 backdrop-blur-sm">
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Title in Header (Visible on Scroll) */}
        <span
          className={cn(
            "font-bold text-sm absolute left-1/2 -translate-x-1/2 transition-opacity duration-300",
            isScrolled ? "opacity-100" : "opacity-0"
          )}
        >
          부의 추월차선
        </span>

        <button className="p-2 -mr-2 rounded-full hover:bg-white/10 bg-black/20 backdrop-blur-sm">
          <Share2 className="w-6 h-6" />
        </button>
      </header>

      {/* Hero Section (Cover) */}
      <div className="relative w-full h-[45vh]">
        {/* Background Blur */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1628126235206-5260b9ea6441?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center blur-2xl opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />

        {/* Cover Image */}
        <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center translate-y-6">
          <div className="w-36 aspect-[3/4] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden mb-6 relative z-10 border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1628126235206-5260b9ea6441?q=80&w=600&auto=format&fit=crop"
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">부의 추월차선</h1>
          <p className="text-white/60 text-sm">엠제이 드마코 · 토트출판사</p>
        </div>
      </div>

      {/* Stats & Meta */}
      <div className="flex justify-center items-center gap-8 py-8 border-b border-white/10 mx-6 mt-6">
        <div className="text-center">
          <div className="text-lg font-bold">15</div>
          <div className="text-xs text-white/50 mt-1">지식 쇼츠</div>
        </div>
        <div className="w-px h-8 bg-white/10" />
        <div className="text-center">
          <div className="text-lg font-bold">4.8</div>
          <div className="text-xs text-white/50 mt-1">평점</div>
        </div>
        <div className="w-px h-8 bg-white/10" />
        <div className="text-center">
          <div className="text-lg font-bold text-brand">500P</div>
          <div className="text-xs text-brand/70 mt-1">완독 보상</div>
        </div>
      </div>

      {/* Description */}
      <div className="p-6">
        <h3 className="font-bold mb-3">책 소개</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          30대 억만장자가 알려주는 가장 빠른 부자의 길. '부자 되기'에도 차선이 있다. 천천히 부자 되기를 거부하고, 젊어서 은퇴하기를 꿈꾸는 이들을 위한 파격적인 제안. <span className="text-brand font-medium">더 보기</span>
        </p>
      </div>

      {/* Chapter List (Shorts) */}
      <div className="px-4 pb-8">
        <h3 className="font-bold mb-4 px-2">지식 챕터 (15)</h3>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer active:scale-98">
              <div className="w-20 h-20 rounded-lg bg-gray-800 shrink-0 relative overflow-hidden group">
                <img src={`https://picsum.photos/200/200?random=${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play className="w-6 h-6 text-white fill-white/80" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-brand font-medium mb-1">Chapter {i + 1}</div>
                <h4 className="text-sm font-semibold truncate mb-1">부의 추월차선 진입하기 - {i + 1}</h4>
                <p className="text-xs text-white/50 line-clamp-2">부를 향한 고속도로에 진입하기 위한 마인드셋 재정립</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4 bg-gradient-to-t from-black via-black/95 to-transparent z-40">
         <button className="w-full py-4 bg-brand text-black font-bold rounded-xl hover:brightness-110 transition-all active:scale-98 flex items-center justify-center gap-2 shadow-lg shadow-brand/20">
          <span>바로 읽기</span>
        </button>
      </div>
    </div>
  );
}