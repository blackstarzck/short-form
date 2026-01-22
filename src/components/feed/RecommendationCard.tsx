import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight, Sparkles, Star, TrendingUp } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCards } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';

// Define the 5 types of Recommendation Cards
export type RecommendationType = 'spotlight' | 'list' | 'curation' | 'new' | '3d-book';

export interface RecommendationData {
  type: RecommendationType;
  title: string;
  author?: string;
  description?: string;
  coverUrl?: string; // For single book
  themeColor: string; // Tailwind gradient class
  points?: number;
  books?: Array<{ // For List type
    title: string;
    author: string;
    coverUrl: string;
  }>;
  backgroundImage?: string; // For Curation
}

// ------------------------------------------------------------------
// 1. Spotlight View (Existing 3D Cover)
// ------------------------------------------------------------------
function SpotlightView({ data }: { data: RecommendationData }) {
  return (
    <div className="relative z-10 flex flex-col items-center px-8 text-center max-w-md w-full">
      {/* Animated Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: false }}
        className="mb-8 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center gap-2"
      >
        <Sparkles className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        <span className="text-xs font-bold text-white tracking-wide">AI 추천 도서</span>
      </motion.div>

      {/* 3D Book Cover Effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
        whileHover={{
          rotateY: -15,
          rotateX: 5,
          scale: 1.05,
          transition: { type: "spring", stiffness: 300 }
        }}
        transition={{ duration: 0.8, type: "spring" }}
        viewport={{ once: false }}
        className="relative w-48 aspect-[2/3] mb-10 perspective-1000 group cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <img
          src={data.coverUrl}
          alt={data.title}
          className="w-full h-full object-cover rounded-lg shadow-2xl relative z-10"
          style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
        />
        <div className="absolute top-1 left-0 w-full h-full bg-white/10 rounded-lg -z-10 translate-x-2 translate-y-2 opacity-50" />
        <div className="absolute top-2 left-0 w-full h-full bg-white/5 rounded-lg -z-20 translate-x-4 translate-y-4 opacity-30" />
      </motion.div>

      {/* Typography */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: false }}
        className="space-y-4 mb-12"
      >
        <h2 className="text-3xl font-black text-white leading-tight break-keep" style={{ textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
          {data.title}
        </h2>
        <p className="text-white/80 font-medium text-lg">
          {data.author}
        </p>
        <p className="text-white/60 text-sm max-w-[80%] mx-auto leading-relaxed break-keep">
          "{data.description}"
        </p>
      </motion.div>

      {/* CTA */}
      <CTAButton points={data.points} />
    </div>
  );
}

// ------------------------------------------------------------------
// 2. List View (Carousel / Swiper)
// ------------------------------------------------------------------
function ListView({ data }: { data: RecommendationData }) {
  return (
    <div className="relative z-10 w-full px-4 flex flex-col items-center justify-center h-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-white mb-2">{data.title}</h2>
        <p className="text-white/60 text-sm">{data.description}</p>
      </motion.div>

      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards, Pagination]}
        className="w-[280px] h-[420px]"
        pagination={{ dynamicBullets: true }}
      >
        {data.books?.map((book, idx) => (
          <SwiperSlide key={idx} className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="w-full h-full relative group">
              <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-1 line-clamp-2">{book.title}</h3>
                <p className="text-white/70 text-sm">{book.author}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: false }}
        className="mt-10 w-full max-w-xs"
      >
        <button className="w-full py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
          <span>전체 리스트 보기</span>
          <ChevronRight size={18} />
        </button>
      </motion.div>
    </div>
  );
}

// ------------------------------------------------------------------
// 3. Curation View (Magazine Style)
// ------------------------------------------------------------------
function CurationView({ data }: { data: RecommendationData }) {
  return (
    <>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={data.backgroundImage} className="w-full h-full object-cover opacity-60" alt="Background" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl text-center max-w-sm shadow-sm"
        >
          <div className="mb-6 inline-block px-3 py-1 text-xs text-brand uppercase tracking-widest">
            Special Curation
          </div>
          <h2 className="text-3xl font-serif italic font-bold text-white mb-4 leading-tight">
            {data.title}
          </h2>
          <div className="w-10 h-1 bg-white/50 mx-auto mb-6" />
          <p className="text-white/90 leading-relaxed font-serif text-lg mb-8">
            {data.description}
          </p>
          <CTAButton points={data.points} isGlass />
        </motion.div>
      </div>
    </>
  );
}

// ------------------------------------------------------------------
// 4. New View (New Arrival)
// ------------------------------------------------------------------
function NewView({ data }: { data: RecommendationData }) {
  return (
    <div className="relative z-10 flex flex-col items-center px-8 text-center max-w-md w-full">
      {/* New Badge */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mb-6 relative"
      >
        <div className="absolute inset-0 bg-red-500 blur-lg opacity-50" />
        <span className="relative bg-red-600 text-white font-black italic px-4 py-1 rounded text-lg shadow-lg rotate-[-5deg] inline-block border border-red-400">
          NEW ARRIVAL
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        className="mb-8"
      >
        <p className="text-white/60 text-sm uppercase tracking-widest mb-2">지금 가장 뜨거운 지식</p>
        <h2 className="text-4xl font-black text-white leading-none tracking-tighter">
          {data.title}
        </h2>
      </motion.div>

      {/* Cover with Glow */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: false }}
        className="relative w-56 aspect-[2/3] mb-10"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-red-500/50 to-transparent blur-2xl -z-10" />
        <img
          src={data.coverUrl}
          alt={data.title}
          className="w-full h-full object-cover rounded-lg shadow-2xl border-2 border-white/10"
        />
      </motion.div>

      <CTAButton points={data.points} />
    </div>
  );
}

// ------------------------------------------------------------------
// Shared Components & Main Export
// ------------------------------------------------------------------

function CTAButton({ points, isGlass }: { points?: number, isGlass?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      viewport={{ once: false }}
      className="w-full"
    >

      <button className={cn(
        "w-full py-4 font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 group",
        isGlass ? "text-brand" : "text-white bg-brand hover:bg-brand/90 shadow-brand/20"
      )}>
        <span>바로 읽기</span>
        <ChevronRight size={18} className="opacity-70 group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
}

export function RecommendationCard(props: RecommendationData) {
  return (
    <div className="h-[100dvh] w-full snap-start relative overflow-hidden bg-black flex flex-col items-center justify-center">
      {/* Background Gradient (Common) */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60 transition-colors duration-700", props.themeColor)} />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Render Specific View based on Type */}
      {props.type === 'spotlight' && <SpotlightView data={props} />}
      {props.type === 'list' && <ListView data={props} />}
      {props.type === 'curation' && <CurationView data={props} />}
      {props.type === 'new' && <NewView data={props} />}
    </div>
  );
}
