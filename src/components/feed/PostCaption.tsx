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

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle();
  };

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

        {/* Book Info Section */}
        {video.related_book && (
          <div className={cn("mt-3 transition-all duration-300", isExpanded && "mt-6 pt-5 border-t border-white/20")}>
            {/* Basic Info */}
            <div className="flex items-center gap-2">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span
                  className={cn(
                    "text-sm text-white/80 transition-all",
                    isExpanded && "text-base font-semibold text-white"
                  )}
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
                >
                  {video.related_book.title}
                </span>
                <span
                  className="text-sm text-white/70"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
                >
                  · {video.related_book.author}
                </span>
              </div>
            </div>

            {/* Extended Details (Only Visible When Expanded) */}
            {isExpanded && (
              <div className="mt-5 space-y-6 pb-10">
                {/* Meta Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm text-white/90">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-white/70 font-medium">카테고리</span>
                    <span className="text-right truncate ml-4">{BOOK_INFO.category}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-white/70 font-medium">출판사</span>
                    <span className="text-right">{BOOK_INFO.publisher}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-white/70 font-medium">페이지</span>
                    <span>{BOOK_INFO.pages}p</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-white/70 font-medium">용량</span>
                    <span>{BOOK_INFO.fileSize}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-white/70 font-medium">종이책</span>
                    <span>{BOOK_INFO.publishDatePaper}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-white/70 font-medium">전자책</span>
                    <span>{BOOK_INFO.publishDateEbook}</span>
                  </div>
                  <div className="col-span-1 sm:col-span-2 flex justify-between items-center pt-1">
                    <span className="text-white/70 font-medium">ISBN</span>
                    <span className="font-mono text-white/80 tracking-wide">{BOOK_INFO.isbn}</span>
                  </div>
                </div>

                {/* Table of Contents */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-5 w-1.5 bg-white/60 rounded-full" />
                    <span className="text-base font-bold text-white">목차</span>
                  </div>
                  <ul className="space-y-3 pl-2 border-l-2 border-white/10 ml-2">
                    {BOOK_INFO.toc.map((item, i) => (
                      <li key={i} className="text-sm text-white/90 pl-4 relative group hover:text-white transition-colors leading-relaxed">
                        {/* Dot indicator on hover */}
                        <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-white/0 group-hover:bg-white/40 transition-all" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}