'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, Share2, Clock, Star, PlayCircle, Lock, Book } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { BookReader } from '@/components/feed/BookReader';
import { cn } from '@/utils/cn';
import { AnimatePresence } from 'framer-motion';

// Dummy Data
const BOOK_DETAIL = {
  id: "book-1",
  title: "돈의 속성",
  author: "김승호",
  publisher: "스노우폭스북스",
  category: "경제/경영",
  rating: 4.8,
  reviewCount: 1240,
  description: "최상위 부자가 말하는 돈에 대한 모든 것. 돈을 다루는 능력을 키우는 법부터 부자가 되는 구체적인 방법까지 담았다. 돈은 인격체다. 돈을 다루는 태도는 사람을 대하는 태도와 같다.",
  coverUrl: "https://image.yes24.com/goods/90547454/XL",
  totalChapters: 10,
  progress: 15, // Reading progress %
  chapters: [
    { id: "c1", title: "1장. 돈은 인격체다", duration: "10:30", isCompleted: true, type: "video" },
    { id: "c2", title: "2장. 나는 나보다 더 훌륭한 경영자에게 투자한다", duration: "15:45", isCompleted: false, type: "video" },
    { id: "c3", title: "3장. 복리의 마법", duration: "12:20", isCompleted: false, type: "text" },
    { id: "c4", title: "4장. 일정하게 들어오는 돈의 힘", duration: "08:50", isCompleted: false, type: "video" },
    { id: "c5", title: "5장. 돈을 다루는 네 가지 능력", duration: "14:10", isCompleted: false, type: "text" },
  ]
};

export default function BookDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  
  const handleReadClick = () => {
    setIsReaderOpen(true);
  };

  return (
    <div className="min-h-screen bg-black pb-24 text-white">
      {/* Reader Overlay */}
      <AnimatePresence>
        {isReaderOpen && (
          <BookReader 
            isOpen={isReaderOpen} 
            onClose={() => setIsReaderOpen(false)}
            bookTitle={BOOK_DETAIL.title}
            chapterTitle="이어보기"
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-black/50 backdrop-blur-md flex items-center justify-between px-4 z-10">
        <button onClick={() => router.back()} className="p-2 -ml-2 text-white">
          <ArrowLeft size={24} />
        </button>
        <div className="flex gap-2">
          <button className="p-2 text-white">
            <Share2 size={24} />
          </button>
        </div>
      </header>

      {/* Book Info Section */}
      <div className="pt-20 px-6 pb-8 flex flex-col items-center">
        <div className="relative w-40 h-60 mb-6 shadow-2xl rounded-lg overflow-hidden border border-white/10">
          <img 
            src={BOOK_DETAIL.coverUrl} 
            alt={BOOK_DETAIL.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-2">{BOOK_DETAIL.title}</h1>
        <p className="text-white/70 text-sm mb-4">{BOOK_DETAIL.author} · {BOOK_DETAIL.publisher}</p>
        
        <div className="flex items-center gap-4 mb-6 text-sm">
          <div className="flex items-center gap-1 text-yellow-400">
            <Star size={16} fill="currentColor" />
            <span className="font-bold">{BOOK_DETAIL.rating}</span>
            <span className="text-white/50">({BOOK_DETAIL.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-white/70">
            <Clock size={16} />
            <span>총 {BOOK_DETAIL.totalChapters}챕터</span>
          </div>
        </div>

        <div className="w-full max-w-sm flex gap-3">
          <Button 
            variant="brand" 
            className="flex-1 font-bold text-base h-12"
            onClick={handleReadClick}
          >
            <BookOpen size={20} className="mr-2" />
            바로 읽기
          </Button>
          <Button variant="outline" className="w-12 h-12 p-0 flex items-center justify-center border-white/20 hover:bg-white/10">
            <Share2 size={20} />
          </Button>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 mb-8">
        <p className="text-white/80 leading-relaxed text-sm line-clamp-3">
          {BOOK_DETAIL.description}
        </p>
      </div>

      {/* Chapters List */}
      <div className="px-4">
        <h2 className="text-lg font-bold mb-4 px-2">챕터 목록</h2>
        <div className="space-y-3">
          {BOOK_DETAIL.chapters.map((chapter, index) => (
            <div 
              key={chapter.id} 
              className={cn(
                "flex items-center p-4 rounded-xl border border-white/5 bg-white/5 active:scale-[0.98] transition-transform",
                chapter.isCompleted ? "opacity-100" : "opacity-80"
              )}
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4 shrink-0">
                {chapter.isCompleted ? (
                   <div className="w-full h-full rounded-full bg-brand/20 text-brand flex items-center justify-center font-bold">
                     {index + 1}
                   </div>
                ) : (
                  <span className="text-white/50 font-medium">{index + 1}</span>
                )}
              </div>
              
              <div className="flex-1 min-w-0 mr-4">
                <h3 className="font-medium truncate mb-1">{chapter.title}</h3>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  {chapter.type === 'video' ? <PlayCircle size={12} /> : <Book size={12} />}
                  <span>{chapter.duration}</span>
                </div>
              </div>

              {!chapter.isCompleted && index > 1 && (
                <Lock size={16} className="text-white/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}