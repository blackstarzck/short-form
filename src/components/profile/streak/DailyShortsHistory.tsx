'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface DailyShort {
  id: string;
  title: string;
  chapter: string;
  thumbnail: string;
  duration: string;
  isCompleted: boolean;
  earnedPoints?: number;
}

interface DailyShortsHistoryProps {
  date: string;
  shorts: DailyShort[];
  onShortClick: (id: string) => void;
}

export function DailyShortsHistory({ date, shorts, onShortClick }: DailyShortsHistoryProps) {
  return (
    <div className="w-full bg-zinc-900/50 rounded-xl overflow-hidden mt-4 border border-white/5">
      <div className="px-4 py-3 border-b border-white/5 flex justify-between items-center bg-white/5">
        <h4 className="text-sm font-bold text-white">{date}</h4>
        <span className="text-xs text-brand font-medium">오늘의 지식 조각 {shorts.length}개</span>
      </div>
      
      <div className="divide-y divide-white/5">
        {shorts.map((short, idx) => (
          <motion.div
            key={short.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => onShortClick(short.id)}
            className="flex items-center gap-3 p-3 hover:bg-white/5 transition-colors cursor-pointer group"
          >
            {/* Thumbnail */}
            <div className="relative w-16 aspect-[9/16] rounded-md overflow-hidden bg-gray-800 shrink-0">
              <img src={short.thumbnail} alt={short.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <PlayCircle className="w-6 h-6 text-white" />
              </div>
              <div className="absolute bottom-0.5 right-0.5 bg-black/60 px-1 py-0.5 rounded text-[8px] text-white font-mono">
                {short.duration}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <h5 className="text-sm font-medium text-white truncate">{short.title}</h5>
              </div>
              <p className="text-xs text-white/50 truncate">{short.chapter}</p>
            </div>

            {/* Status */}
            <div className="flex flex-col items-end gap-1">
              {short.earnedPoints && (
                <span className="text-[10px] font-bold text-black bg-brand px-1.5 py-0.5 rounded-full">
                  +{short.earnedPoints}P
                </span>
              )}
              {short.isCompleted && (
                <div className="flex items-center gap-0.5 text-green-500 text-[10px]">
                  <CheckCircle className="w-3 h-3" />
                  <span>완료</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
