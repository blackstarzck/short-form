'use client';

import React from 'react';
import { ArrowLeft, BookOpen, Clock } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

// Dummy Data for List
const BOOKS = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: [
    "부의 추월차선",
    "역행자",
    "세이노의 가르침",
    "돈의 심리학",
    "원씽 (The One Thing)",
    "퓨처 셀프",
    "그릿 (GRIT)",
    "타이탄의 도구들"
  ][i % 8],
  author: ["엠제이 드마코", "자청", "세이노", "모건 하우절", "게리 켈러", "벤저민 하디", "앤젤라 더크워스", "팀 페리스"][i % 8],
  shortsCount: 10 + (i * 2),
  points: 300 + (i * 50),
  thumbnail: `https://picsum.photos/200/300?random=${i + 200}`
}));

const CATEGORY_NAMES: Record<string, string> = {
  business: '비즈니스',
  tech: '테크/IT',
  money: '재테크',
  self: '자기계발',
  human: '인문/철학',
  health: '건강',
};

export default function CategoryListPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const categoryName = CATEGORY_NAMES[id] || '전체 도서';

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center gap-3">
        <button 
          onClick={() => router.back()} 
          className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold">{categoryName}</h1>
      </header>

      {/* Book List */}
      <div className="p-4 space-y-4">
        {BOOKS.map((book) => (
          <Link href={`/book/${book.id}`} key={book.id}>
            <div className="flex gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors active:scale-[0.99]">
              {/* Thumbnail */}
              <div className="w-20 aspect-[3/4] rounded-lg bg-gray-800 shrink-0 overflow-hidden shadow-lg">
                <img 
                  src={book.thumbnail} 
                  alt={book.title} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                <div>
                  <h3 className="font-bold text-base leading-tight truncate mb-1">{book.title}</h3>
                  <p className="text-xs text-white/50">{book.author}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-white/60">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      <span>{book.shortsCount} 챕터</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{(book.shortsCount * 1.5).toFixed(0)}분</span>
                    </div>
                  </div>
                  
                  {/* W2E Badge */}
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-brand/10 text-brand text-[10px] font-bold">
                    <span>완독 시 {book.points}P</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}