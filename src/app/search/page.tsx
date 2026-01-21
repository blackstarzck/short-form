'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, ArrowLeft, BookOpen, PlayCircle, User, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

// Mock Data Generators
const MOCK_BOOKS = [
  { id: 1, title: '부의 추월차선', author: '엠제이 드마코', category: '경제/경영', rating: 4.8, cover: 'https://picsum.photos/100/150?random=1' },
  { id: 2, title: '역행자', author: '자청', category: '자기계발', rating: 4.7, cover: 'https://picsum.photos/100/150?random=2' },
  { id: 3, title: '돈의 속성', author: '김승호', category: '경제/경영', rating: 4.9, cover: 'https://picsum.photos/100/150?random=3' },
  { id: 4, title: '사피엔스', author: '유발 하라리', category: '인문', rating: 4.8, cover: 'https://picsum.photos/100/150?random=4' },
];

const MOCK_SHORTS = Array.from({ length: 8 }).map((_, i) => ({
  id: `s${i}`,
  title: `지식 포인트 ${i + 1} 핵심 정리`,
  views: '1.2k',
  duration: '0:58',
  thumbnail: `https://picsum.photos/300/400?random=${i + 10}`
}));

const MOCK_AUTHORS = [
  { id: 'a1', name: '엠제이 드마코', role: 'Author', followers: '12k', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MJ' },
  { id: 'a2', name: '자청', role: 'Creator', followers: '45k', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jach' },
];

// ... imports remain the same, but we will restructure the file slightly

// MOCK DATA ... (keeping them as is, just need to make sure I don't lose them)

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'all' | 'books' | 'shorts' | 'people'>('all');
  const [isSearching, setIsSearching] = useState(false);

  // Simulate search delay
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => setIsSearching(false), 500);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-md px-4 py-3 border-b border-white/5">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <button type="button" onClick={() => router.back()} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-white/70" />
          </button>
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-gray-500 group-focus-within:text-brand transition-colors" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="검색어를 입력하세요"
              autoFocus
              className="w-full py-2.5 pl-9 pr-4 bg-gray-900 rounded-full text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand/50 transition-all"
            />
          </div>
        </form>

        {/* Tabs */}
        <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
          {[
            { id: 'all', label: '통합' },
            { id: 'books', label: '도서' },
            { id: 'shorts', label: '쇼츠' },
            { id: 'people', label: '인물' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap border",
                activeTab === tab.id
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white/60 border-white/10 hover:border-white/30"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Results Content */}
      <div className="p-4 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
        {/* No Results */}
        {!query && !isSearching && (
          <div className="flex flex-col items-center justify-center py-20 text-white/30">
            <Search className="w-12 h-12 mb-4 opacity-20" />
            <p>검색어를 입력해보세요.</p>
          </div>
        )}

        {query && (
          <>
            {/* Books Section */}
            {(activeTab === 'all' || activeTab === 'books') && (
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-brand" />
                    도서
                  </h3>
                  {activeTab === 'all' && (
                    <button
                      onClick={() => setActiveTab('books')}
                      className="text-xs text-white/50 hover:text-white transition-colors"
                    >
                      더보기
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  {MOCK_BOOKS.map((book) => (
                    <div key={book.id} className="flex gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                      <img src={book.cover} className="w-16 aspect-[2/3] rounded object-cover shadow-sm bg-gray-800" alt={book.title} />
                      <div className="flex-1 py-0.5">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-sm mb-1 group-hover:text-brand transition-colors">{book.title}</h4>
                          <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/60">{book.rating}</span>
                        </div>
                        <p className="text-xs text-white/50 mb-2">{book.author}</p>
                        <span className="text-[10px] text-brand/80 border border-brand/20 px-1.5 py-0.5 rounded">{book.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Shorts Section */}
            {(activeTab === 'all' || activeTab === 'shorts') && (
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <PlayCircle className="w-4 h-4 text-red-500" />
                    쇼츠
                  </h3>
                  {activeTab === 'all' && (
                    <button
                      onClick={() => setActiveTab('shorts')}
                      className="text-xs text-white/50 hover:text-white transition-colors"
                    >
                      더보기
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {MOCK_SHORTS.slice(0, activeTab === 'all' ? 4 : undefined).map((short) => (
                    <div key={short.id} className="group cursor-pointer">
                      <div className="aspect-[3/4] bg-gray-800 rounded-xl overflow-hidden relative mb-2">
                        <img src={short.thumbnail} alt={short.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <PlayCircle className="w-8 h-8 text-white" />
                        </div>
                        <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1 rounded">
                          {short.duration}
                        </span>
                      </div>
                      <h4 className="text-xs font-medium line-clamp-2 leading-tight text-white/90 group-hover:text-white">{short.title}</h4>
                      <span className="text-[10px] text-white/40">조회수 {short.views}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* People Section */}
            {(activeTab === 'all' || activeTab === 'people') && (
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-400" />
                    인물
                  </h3>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {MOCK_AUTHORS.map((author) => (
                    <div key={author.id} className="flex flex-col items-center min-w-[80px] cursor-pointer group">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-transparent group-hover:border-brand transition-colors mb-2">
                        <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs font-medium text-center truncate w-full">{author.name}</span>
                      <span className="text-[10px] text-white/40">{author.role}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-black text-white p-4">Loading...</div>}>
      <SearchContent />
    </React.Suspense>
  );
}
