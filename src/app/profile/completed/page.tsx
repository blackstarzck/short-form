'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Clock, MoreVertical, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';

// Mock Data
const COMPLETED_BOOKS = [
  { 
    id: 1, 
    title: '부의 추월차선', 
    author: '엠제이 드마코', 
    completedDate: '2023.10.15', 
    cover: 'https://picsum.photos/300/450?random=1',
    earnedPoints: 1500,
    shortsCount: 15
  },
  { 
    id: 2, 
    title: '돈의 심리학', 
    author: '모건 하우절', 
    completedDate: '2023.09.20', 
    cover: 'https://picsum.photos/300/450?random=2',
    earnedPoints: 2000,
    shortsCount: 20
  },
  { 
    id: 3, 
    title: '사피엔스', 
    author: '유발 하라리', 
    completedDate: '2023.08.05', 
    cover: 'https://picsum.photos/300/450?random=3',
    earnedPoints: 2500,
    shortsCount: 25
  },
  { 
    id: 4, 
    title: '아주 작은 습관의 힘', 
    author: '제임스 클리어', 
    completedDate: '2023.07.12', 
    cover: 'https://picsum.photos/300/450?random=4',
    earnedPoints: 1200,
    shortsCount: 12
  },
];

export default function CompletedBooksPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md px-4 py-4 flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="font-bold text-lg">완독한 도서</h1>
      </header>

      {/* Grid Layout */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {COMPLETED_BOOKS.map((book, idx) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative"
          >
            {/* Card Container */}
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3 shadow-lg border border-white/10">
              <img 
                src={book.cover} 
                alt={book.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* Badge */}
              <div className="absolute top-2 right-2 bg-brand text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                완독 완료
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="text-xs text-white/60 mb-1">{book.completedDate}</div>
                <div className="flex items-center gap-2 text-[10px] font-medium text-brand">
                  <span>+{book.earnedPoints.toLocaleString()}P 획득</span>
                </div>
              </div>
            </div>

            {/* Title & Author */}
            <h3 className="font-bold text-sm leading-tight mb-0.5 truncate">{book.title}</h3>
            <p className="text-xs text-white/50 mb-3 truncate">{book.author}</p>

            {/* CTA Button */}
            <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg py-2 text-xs font-bold transition-colors flex items-center justify-center gap-1.5">
              <BookOpen size={14} />
              전체 내용 읽기 (eBook)
            </button>
          </motion.div>
        ))}
      </div>
      
      {/* Empty State (if needed) */}
      {COMPLETED_BOOKS.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[60vh] text-white/30 gap-4">
           <BookOpen size={48} className="opacity-20" />
           <p>아직 완독한 도서가 없습니다.<br/>지식 탐험을 시작해보세요!</p>
        </div>
      )}
    </div>
  );
}
