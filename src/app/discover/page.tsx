'use client';

import React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

// Dummy Categories
const CATEGORIES = [
  { id: 'business', name: '비즈니스', color: 'bg-blue-500/20 text-blue-400' },
  { id: 'tech', name: '테크/IT', color: 'bg-purple-500/20 text-purple-400' },
  { id: 'money', name: '재테크', color: 'bg-green-500/20 text-green-400' },
  { id: 'self', name: '자기계발', color: 'bg-orange-500/20 text-orange-400' },
  { id: 'human', name: '인문/철학', color: 'bg-yellow-500/20 text-yellow-400' },
  { id: 'health', name: '건강', color: 'bg-red-500/20 text-red-400' },
];

// Dummy Curation Data
const CURATIONS = [
  { id: 1, title: "부의 추월차선", desc: "경제적 자유를 위한 가장 빠른 길", color: "from-indigo-900 to-purple-900" },
  { id: 2, title: "역행자", desc: "돈/시간/운명으로부터 완전한 자유", color: "from-gray-900 to-slate-800" },
  { id: 3, title: "돈의 속성", desc: "최상위 부자가 말하는 돈에 대한 모든 것", color: "from-green-900 to-teal-900" },
];

export default function ExplorePage() {
  return (
    <div className="flex flex-col min-h-screen pb-24 bg-black text-white">
      {/* Search Bar */}
      <div className="sticky top-0 z-20 px-4 py-3 bg-black/80 backdrop-blur-md">
        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-500 group-focus-within:text-brand transition-colors" />
          </div>
          <input
            type="text"
            placeholder="지식, 도서, 크리에이터 검색"
            className="w-full py-3 pl-10 pr-4 bg-gray-900 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand/50 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 space-y-10 mt-2">
        {/* Curation / Banner Carousel with Swiper */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-lg font-bold mb-4 px-4">오늘의 추천 지식</h2>
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={'auto'}
            centeredSlides={true}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
            }}
            className="w-full !pb-10"
            style={{
              '--swiper-pagination-color': '#FF9800',
              '--swiper-pagination-bullet-inactive-color': '#FFFFFF',
              '--swiper-pagination-bullet-inactive-opacity': '0.3',
              '--swiper-pagination-bullet-size': '6px',
              '--swiper-pagination-bullet-horizontal-gap': '4px',
            } as React.CSSProperties}
          >
            {CURATIONS.map((item) => (
              <SwiperSlide key={item.id} className="!w-[85vw]">
                <Link href={`/book/${item.id}`}>
                  <div className={`aspect-video bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center relative overflow-hidden group cursor-pointer active:scale-98 transition-transform shadow-lg`}>
                     <div className="text-center z-10 p-4 transform transition-transform group-hover:scale-105">
                        <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">{item.title}</h3>
                        <p className="text-white/80 text-sm drop-shadow-md">{item.desc}</p>
                     </div>
                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=600&auto=format&fit=crop')] opacity-20 bg-cover bg-center transition-opacity group-hover:opacity-30" />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Categories */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 px-4">
          <h2 className="text-lg font-bold mb-4">관심 분야 탐색</h2>
          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map((cat) => (
              <Link 
                href={`/category/${cat.id}`}
                key={cat.id}
                className={cn(
                  "h-14 rounded-xl flex items-center justify-center font-semibold text-sm transition-all hover:brightness-110 active:scale-95",
                  cat.color
                )}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Trending Shorts Grid */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 px-4">
           <h2 className="text-lg font-bold mb-4">급상승 쇼츠</h2>
           <div className="grid grid-cols-3 gap-0.5 -mx-4 pb-4">
             {/* Dummy grid items */}
             {Array.from({ length: 15 }).map((_, i) => (
               <div key={i} className="aspect-[3/4] bg-gray-900 relative cursor-pointer hover:brightness-110 transition-all">
                 <img 
                   src={`https://picsum.photos/300/400?random=${i + 100}`} 
                   alt="Thumbnail" 
                   className="w-full h-full object-cover"
                   loading="lazy"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                 <div className="absolute bottom-1 right-1 flex items-center gap-0.5 text-[10px] font-medium text-white drop-shadow-md">
                    <span>👀 {((i * 3.7) % 10 + 1).toFixed(1)}k</span>
                 </div>
               </div>
             ))}
           </div>
        </section>
      </div>
    </div>
  );
}