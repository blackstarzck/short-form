'use client';

import React from 'react';
import { Video } from '@/types';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

interface PostCaptionProps {
  video: Video;
  isExpanded: boolean;
  onToggle: () => void;
}

// Dummy data for book details
const BOOK_INFO = {
  category: "경제/경영 > 투자/재테크",
  pages: 324,
  fileSize: "15MB",
  publisher: "비즈니스북스",
  publishDatePaper: "2023.10.25",
  publishDateEbook: "2023.11.05",
  isbn: "9791162543789",
  toc: [
    "1장. 돈의 속성",
    "2장. 부자가 되는 세 가지 방법",
    "3장. 돈을 다루는 능력",
    "4장. 금융 문맹 탈출",
    "5장. 주식 시장의 승자",
    "6장. 부의 이전",
    "7장. 경제적 자유를 향하여",
    "8장. 창업의 꿈",
    "9장. 부의 추월차선",
    "10장. 진정한 자유"
  ]
};

export function PostCaption({ video, isExpanded, onToggle }: PostCaptionProps) {

  const [isDescExpanded, setIsDescExpanded] = React.useState(false);

  // Reset description expansion when the sheet is closed
  React.useEffect(() => {
    if (!isExpanded) {
      setIsDescExpanded(false);
    }
  }, [isExpanded]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle();
  };

  const toggleDesc = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDescExpanded(!isDescExpanded);
  };

  if (video.related_book) {
    return (
      <div
        className="relative z-40 cursor-pointer"
        onClick={handleToggle}
      >
        <div className="flex items-start gap-4">
          {/* Cover Image */}
          <div className="relative group shrink-0">
            <img
              src={video.related_book.cover_url}
              alt={video.related_book.title}
              className="w-[86px] h-[128px] rounded-md shadow-lg object-cover border border-white/10"
              style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)' }}
            />
          </div>

          {/* Info Column */}
          <div className="flex flex-col flex-1 min-h-[128px] py-1">
            {/* Category */}
            <p 
              className="text-xs text-white/70 mb-1 font-medium"
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
            >
              {BOOK_INFO.category}
            </p>

            {/* Title */}
            <h3 
              className="font-bold text-base text-white leading-tight mb-1 line-clamp-2"
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
            >
              {video.related_book.title}
            </h3>
            
            {/* Author */}
            <p 
              className="text-sm text-white/90 font-medium mb-0.5"
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
            >
              {video.related_book.author}
            </p>
            
            {/* Publisher */}
            <p 
              className="text-xs text-white/70"
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
            >
              출판사 • {BOOK_INFO.publisher}
            </p>
          </div>
        </div>

        {/* Expanded Content - Only for Book */}
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out no-scrollbar"
          style={{
            maxHeight: isExpanded ? '65vh' : '0',
            opacity: isExpanded ? 1 : 0,
            overflowY: isExpanded ? 'auto' : 'hidden',
          }}
        >
          <div className="pt-6 pb-10 space-y-8 no-scrollbar h-full overflow-y-auto">

            {/* Book Description with Read More */}
            <div className="relative pl-1">
              <p 
                className={cn(
                  "text-sm text-white/90 leading-relaxed whitespace-pre-wrap",
                  !isDescExpanded && "line-clamp-2"
                )}
              >
                {video.description}
              </p>
              {!isDescExpanded && (
                <button
                  onClick={toggleDesc}
                  className="text-xs font-bold text-brand mt-2 hover:text-brand/80 transition-colors flex items-center gap-0.5"
                >
                  더보기
                </button>
              )}
            </div>

            {/* Meta Info Grid */}
            <div>
              <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
                상세 정보
              </h4>
              <div className="grid grid-cols-1 gap-y-3 text-sm bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                <div className="grid grid-cols-[80px_1fr] items-baseline gap-4 border-b border-white/5 pb-2 last:border-0 last:pb-0">
                  <span className="text-white/50 font-medium">카테고리</span>
                  <span className="text-white/90">{BOOK_INFO.category}</span>
                </div>
                <div className="grid grid-cols-[80px_1fr] items-baseline gap-4 border-b border-white/5 pb-2 last:border-0 last:pb-0">
                  <span className="text-white/50 font-medium">출판사</span>
                  <span className="text-white/90">{BOOK_INFO.publisher}</span>
                </div>
                <div className="grid grid-cols-[80px_1fr] items-baseline gap-4 border-b border-white/5 pb-2 last:border-0 last:pb-0">
                  <span className="text-white/50 font-medium">페이지</span>
                  <span className="text-white/90">{BOOK_INFO.pages}p</span>
                </div>
                <div className="grid grid-cols-[80px_1fr] items-baseline gap-4 border-b border-white/5 pb-2 last:border-0 last:pb-0">
                  <span className="text-white/50 font-medium">용량</span>
                  <span className="text-white/90">{BOOK_INFO.fileSize}</span>
                </div>
                <div className="grid grid-cols-[80px_1fr] items-baseline gap-4 border-b border-white/5 pb-2 last:border-0 last:pb-0">
                  <span className="text-white/50 font-medium">출간일</span>
                  <div className="flex flex-col gap-1">
                     <span className="text-white/90">종이책 {BOOK_INFO.publishDatePaper}</span>
                     <span className="text-white/90">전자책 {BOOK_INFO.publishDateEbook}</span>
                  </div>
                </div>
                <div className="grid grid-cols-[80px_1fr] items-baseline gap-4">
                  <span className="text-white/50 font-medium">ISBN</span>
                  <span className="font-mono text-white/80 tracking-wide">{BOOK_INFO.isbn}</span>
                </div>
              </div>
            </div>

            {/* Table of Contents */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1 h-4 bg-purple-500 rounded-full"></span>
                <span className="text-sm font-bold text-white">목차</span>
              </div>
              <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                <ul className="space-y-4">
                  {BOOK_INFO.toc.map((item, i) => (
                    <li key={i} className="text-sm text-white/90 relative pl-4 hover:text-white transition-colors leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative z-40 cursor-pointer",
      )}
      onClick={handleToggle}
    >
      {/* User Info Row */}
      <div className="flex items-center gap-2 mb-2">
        {video.creator.avatar_url ? (
          <img
            src={video.creator.avatar_url}
            alt={video.creator.username}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
            {video.creator.username.charAt(0).toUpperCase()}
          </div>
        )}
        <span
          className="font-semibold text-white text-sm"
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
        >
          {video.creator.username}
        </span>
        <button
          className="ml-1 px-3 py-1 text-xs font-semibold text-white bg-transparent border border-white/50 rounded hover:bg-white/10 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            console.log('Follow', video.creator.id);
          }}
        >
          팔로우
        </button>
      </div>

      {/* Caption & Details Container */}
      <div
        className="overflow-hidden"
        style={{
          maxHeight: isExpanded ? '65vh' : '3.5rem',
          overflowY: isExpanded ? 'auto' : 'hidden'
        }}
      >
        {/* Main Caption */}
        <div
          className={cn(
            "text-white leading-relaxed pr-10 relative",
            !isExpanded && "line-clamp-2"
          )}
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
        >
          <span className="whitespace-pre-wrap">{video.description}</span>
        </div>
      </div>
    </div>
  );
}