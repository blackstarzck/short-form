'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { cn } from '@/utils/cn';
import { DailyShortsHistory, DailyShort } from './DailyShortsHistory';

// Mock Data Generator
const generateMockShorts = (date: string): DailyShort[] => {
  return Array.from({ length: 5 }).map((_, i) => ({
    id: `${date}-${i}`,
    title: i % 2 === 0 ? '부의 추월차선' : '역행자',
    chapter: `Chapter ${i + 3}: 경제적 자유를 위한 ${i + 1}단계`,
    thumbnail: `https://picsum.photos/100/180?random=${i}`,
    duration: '0:58',
    isCompleted: true,
    earnedPoints: 10
  }));
};

interface StreakCalendarProps {
  completedDates: string[]; // ['2023-10-01', '2023-10-02', ...]
}

export function StreakCalendar({ completedDates }: StreakCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [dailyShorts, setDailyShorts] = useState<DailyShort[]>([]);

  // Calendar Logic
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0: Sun, 1: Mon...

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
  };

  const handleDateClick = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    if (selectedDate === dateStr) {
      setSelectedDate(null); // Toggle off
    } else {
      setSelectedDate(dateStr);
      // In real app, fetch data here
      if (completedDates.includes(dateStr)) {
        setDailyShorts(generateMockShorts(dateStr));
      } else {
        setDailyShorts([]);
      }
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty slots for previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square" />);
    }

    // Days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isCompleted = completedDates.includes(dateStr);
      const isSelected = selectedDate === dateStr;
      const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className="relative aspect-square flex items-center justify-center text-sm font-medium transition-all rounded-full hover:bg-white/5"
        >
          <span className={cn(
            "z-10",
            isSelected ? "text-white font-bold" : "text-white/80",
            !isCompleted && !isSelected && "text-white/40"
          )}>
            {day}
          </span>
          
          {/* Completion Indicator (Circle Background) */}
          {isCompleted && (
            <motion.div 
              layoutId={`day-bg-${dateStr}`}
              className={cn(
                "absolute inset-1 rounded-full",
                isSelected ? "bg-brand" : "bg-brand/20 border border-brand/50"
              )} 
            />
          )}

          {/* Today Indicator (Small Dot) */}
          {isToday && !isCompleted && (
            <div className="absolute bottom-1 w-1 h-1 bg-white rounded-full" />
          )}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="space-y-6">
      {/* Motivation Banner */}
      <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 p-4 rounded-xl border border-orange-500/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/20 rounded-full text-orange-500">
            <Flame size={20} fill="currentColor" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-orange-100">Hot Streak! 🔥</h4>
            <p className="text-xs text-orange-200/70">다음 보상까지 <span className="text-white font-bold">2일</span> 남았습니다.</p>
          </div>
        </div>
        <div className="text-xl font-bold text-white">15<span className="text-xs font-normal ml-0.5 opacity-50">일째</span></div>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between px-2">
        <button onClick={handlePrevMonth} className="p-1 hover:bg-white/10 rounded-full text-white/50 hover:text-white">
          <ChevronLeft size={20} />
        </button>
        <span className="font-bold text-lg">
          {year}년 {month + 1}월
        </span>
        <button onClick={handleNextMonth} className="p-1 hover:bg-white/10 rounded-full text-white/50 hover:text-white">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {['일', '월', '화', '수', '목', '금', '토'].map(d => (
          <div key={d} className="text-xs text-white/30 font-medium py-2">{d}</div>
        ))}
        {renderCalendarDays()}
      </div>

      {/* Selected Day Detail (Accordion) */}
      <AnimatePresence mode="wait">
        {selectedDate && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {dailyShorts.length > 0 ? (
              <DailyShortsHistory 
                date={selectedDate} 
                shorts={dailyShorts} 
                onShortClick={(id) => console.log('Play short:', id)} 
              />
            ) : (
              <div className="py-8 text-center text-white/30 text-sm bg-white/5 rounded-xl border border-white/5 mt-4">
                학습 기록이 없는 날입니다.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
