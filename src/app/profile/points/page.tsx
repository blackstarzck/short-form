'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Coins, Filter, Calendar, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';

// Mock Data
const TOTAL_POINTS = 12500;
const HISTORY = [
  { id: 1, type: 'earn', title: '부의 추월차선 완독', category: '완독', amount: 500, date: '2023.10.25', balance: 12500 },
  { id: 2, type: 'earn', title: '일일 퀴즈 정답', category: '활동', amount: 100, date: '2023.10.25', balance: 12000 },
  { id: 3, type: 'use', title: '프리미엄 리포트 구매', category: '사용', amount: -3000, date: '2023.10.24', balance: 11900 },
  { id: 4, type: 'earn', title: '쇼츠 5개 시청 달성', category: '시청', amount: 50, date: '2023.10.23', balance: 14900 },
  { id: 5, type: 'earn', title: '친구 초대 보상', category: '이벤트', amount: 1000, date: '2023.10.20', balance: 14850 },
  { id: 6, type: 'earn', title: '회원가입 축하금', category: '이벤트', amount: 2000, date: '2023.10.01', balance: 13850 },
];

export default function PointsPage() {
  const router = useRouter();
  const [displayPoints, setDisplayPoints] = useState(0);
  const [filter, setFilter] = useState<'all' | 'earn' | 'use'>('all');

  // Count up animation
  useEffect(() => {
    const duration = 1500; // ms
    const steps = 60;
    const intervalTime = duration / steps;
    const stepValue = TOTAL_POINTS / steps;
    
    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= TOTAL_POINTS) {
        setDisplayPoints(TOTAL_POINTS);
        clearInterval(timer);
      } else {
        setDisplayPoints(Math.floor(current));
      }
    }, intervalTime);
    
    return () => clearInterval(timer);
  }, []);

  const filteredHistory = HISTORY.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md px-4 py-4 flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="font-bold text-lg">포인트 내역</h1>
      </header>

      {/* Hero Section (Points) */}
      <section className="px-6 py-8 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-brand/20 blur-3xl rounded-full" />
          <div className="relative flex flex-col items-center">
            <span className="text-white/50 text-sm mb-2">현재 보유 포인트</span>
            <div className="flex items-center gap-2 text-brand">
              <Coins className="w-8 h-8" />
              <span className="text-4xl font-bold font-mono tracking-tight">
                {displayPoints.toLocaleString()}
              </span>
            </div>
            <p className="text-white/40 text-xs mt-2">
              이번 달 적립 <span className="text-white">+3,500 P</span>
            </p>
          </div>
        </motion.div>
      </section>

      {/* Filter & List */}
      <motion.section 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-zinc-900 rounded-t-3xl min-h-[calc(100vh-250px)] p-6"
      >
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { id: 'all', label: '전체' },
            { id: 'earn', label: '적립' },
            { id: 'use', label: '사용' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                filter === tab.id 
                  ? "bg-white text-black" 
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* History List */}
        <div className="space-y-4">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex justify-between items-start py-2 border-b border-white/5 last:border-0 pb-4"
              >
                <div className="flex gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                    item.type === 'earn' ? "bg-brand/10 text-brand" : "bg-red-500/10 text-red-500"
                  )}>
                    {item.type === 'earn' ? <Coins size={18} /> : <Calendar size={18} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-medium text-sm">{item.title}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/10 text-white/50">
                        {item.category}
                      </span>
                    </div>
                    <div className="text-xs text-white/40">{item.date} · 잔액 {item.balance.toLocaleString()}</div>
                  </div>
                </div>
                <div className={cn(
                  "font-bold text-sm",
                  item.type === 'earn' ? "text-brand" : "text-white"
                )}>
                  {item.type === 'earn' ? '+' : ''}{item.amount.toLocaleString()}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-20 text-center text-white/30 text-sm">
              내역이 없습니다.
            </div>
          )}
        </div>
      </motion.section>
    </div>
  );
}
