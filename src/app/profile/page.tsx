'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Coins, BookOpen, Flame, ChevronRight, PlayCircle, Share2, X, Download } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useRouter } from 'next/navigation';
import { ConstellationMap } from '@/components/profile/ConstellationMap';
import { toPng } from 'html-to-image';
import { BottomSheet } from '@/components/shared/BottomSheet';

// Dummy User Data
const USER = {
  name: '지식탐험가',
  level: 12,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  points: 12500,
  streak: 15,
  completedBooks: 8,
};

// Dummy Learning Data
const LEARNING_BOOKS = [
  { id: 1, title: '부의 추월차선', progress: 75, totalChapters: 15, currentChapter: 12, cover: 'https://picsum.photos/100/150?random=1' },
  { id: 2, title: '돈의 심리학', progress: 30, totalChapters: 20, currentChapter: 6, cover: 'https://picsum.photos/100/150?random=2' },
  { id: 3, title: '사피엔스', progress: 10, totalChapters: 25, currentChapter: 3, cover: 'https://picsum.photos/100/150?random=3' },
  { id: 4, title: '역행자', progress: 0, totalChapters: 10, currentChapter: 0, cover: 'https://picsum.photos/100/150?random=4' },
];

const POINT_HISTORY = [
  { id: 1, type: 'earn', title: '쇼츠 완독 (Chapter 11)', amount: 50, date: '2023.10.25' },
  { id: 2, type: 'earn', title: '일일 퀴즈 정답', amount: 100, date: '2023.10.25' },
  { id: 3, type: 'use', title: '전자책 구매 할인', amount: -3000, date: '2023.10.24' },
];

import { StreakCalendar } from '@/components/profile/streak/StreakCalendar';

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'learning' | 'saved' | 'history'>('learning');
  const [displayPoints, setDisplayPoints] = useState(0);
  
  // UI States
  const [showShareModal, setShowShareModal] = useState(false);
  const [showStreakSheet, setShowStreakSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  
  // Refs
  const constellationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Count up animation
    const step = Math.ceil(USER.points / 50);
    const interval = setInterval(() => {
      setDisplayPoints(prev => {
        if (prev + step >= USER.points) {
          clearInterval(interval);
          return USER.points;
        }
        return prev + step;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const handleShare = async () => {
    if (constellationRef.current && !isSharing) {
      setIsSharing(true);
      try {
        const dataUrl = await toPng(constellationRef.current, { cacheBust: true, backgroundColor: '#000' });
        
        if (navigator.share) {
          const blob = await (await fetch(dataUrl)).blob();
          const file = new File([blob], 'constellation.png', { type: 'image/png' });
          await navigator.share({
            title: '나의 지식 성좌',
            text: '제가 쌓아올린 지식의 성좌를 확인해보세요!',
            files: [file],
          });
        } else {
          // Fallback to download
          const link = document.createElement('a');
          link.download = 'my-constellation.png';
          link.href = dataUrl;
          link.click();
        }
      } catch (err) {
        console.error('Failed to share:', err);
      } finally {
        setIsSharing(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <header className="pt-[calc(env(safe-area-inset-top)+2rem)] px-6 pb-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="flex justify-between items-start mb-6">
           <div className="flex items-center gap-4">
              <div className="relative">
                <img src={USER.avatar} alt="Profile" className="w-16 h-16 rounded-full border-2 border-white/20 bg-white/10" />
                <div className="absolute -bottom-1 -right-1 bg-brand text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-black">
                  LV.{USER.level}
                </div>
              </div>
              <div>
                 <h1 className="text-xl font-bold">{USER.name}</h1>
                 <p className="text-white/50 text-xs">Knowledge Seeker</p>
              </div>
           </div>
           <button className="p-2 rounded-full hover:bg-white/10">
             <Settings className="w-5 h-5 text-white/70" />
           </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
           <div 
             onClick={() => router.push('/profile/points')}
             className="bg-white/5 rounded-xl p-3 flex flex-col items-center border border-white/5 group hover:bg-white/10 transition-colors cursor-pointer active:scale-95 duration-200"
           >
              <span className="text-white/50 text-[10px] mb-1">보유 포인트</span>
              <div className="flex items-center gap-1 text-brand font-bold">
                 <Coins className="w-4 h-4" />
                 <span className="text-lg">{displayPoints.toLocaleString()}</span>
              </div>
           </div>
           <div 
             onClick={() => router.push('/profile/completed')}
             className="bg-white/5 rounded-xl p-3 flex flex-col items-center border border-white/5 group hover:bg-white/10 transition-colors cursor-pointer active:scale-95 duration-200"
           >
              <span className="text-white/50 text-[10px] mb-1">완독 도서</span>
              <div className="flex items-center gap-1 font-bold">
                 <BookOpen className="w-4 h-4 text-blue-400" />
                 <span className="text-lg">{USER.completedBooks}</span>
              </div>
           </div>
           <div 
             onClick={() => setShowStreakSheet(true)}
             className="bg-white/5 rounded-xl p-3 flex flex-col items-center border border-white/5 group hover:bg-white/10 transition-colors cursor-pointer active:scale-95 duration-200"
           >
              <span className="text-white/50 text-[10px] mb-1">연속 학습</span>
              <div className="flex items-center gap-1 font-bold">
                 <Flame className="w-4 h-4 text-orange-500" />
                 <span className="text-lg">{USER.streak}일</span>
              </div>
           </div>
        </div>
      </header>

      {/* Constellation Map (Middle) */}
      <section className="px-6 py-6">
         <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">지식 성좌</h2>
            <button 
              onClick={() => setShowShareModal(true)}
              className="text-xs text-white/50 flex items-center gap-1 hover:text-white transition-colors"
            >
               자세히 보기 <ChevronRight className="w-3 h-3" />
            </button>
         </div>
         
         {/* Map Component */}
         <div ref={constellationRef}>
            <ConstellationMap 
              onStarClick={(category) => setSelectedCategory(category)}
            />
         </div>

         <p className="text-center text-white/40 text-xs mt-3 animate-pulse">
            <span className="text-brand">경제/경영</span> 분야의 지식이 빛나고 있습니다.
         </p>
      </section>

      {/* Library Tabs (Bottom) */}
      <section className="mt-2">
         <div className="flex border-b border-white/10 px-6 sticky top-0 bg-black z-10">
            {[
              { id: 'learning', label: '학습 중' },
              { id: 'saved', label: '보관함' },
              { id: 'history', label: '포인트' }
            ].map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id as any)}
                 className={cn(
                   "flex-1 py-3 text-sm font-medium relative transition-colors",
                   activeTab === tab.id ? "text-white" : "text-white/40 hover:text-white/60"
                 )}
               >
                 {tab.label}
                 {activeTab === tab.id && (
                    <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
                 )}
               </button>
            ))}
         </div>

         <div className="p-6 min-h-[300px]">
            {activeTab === 'learning' && (
               <div className="space-y-4">
                  {LEARNING_BOOKS.map(book => (
                     <div key={book.id} className="flex gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
                        <img src={book.cover} className="w-16 aspect-[3/4] rounded object-cover bg-gray-800" alt="cover" />
                        <div className="flex-1 flex flex-col justify-between py-1">
                           <div>
                              <h4 className="font-bold text-sm mb-1">{book.title}</h4>
                              <div className="flex items-center gap-1 text-xs text-white/50">
                                 <PlayCircle className="w-3 h-3" />
                                 <span>Chapter {book.currentChapter} / {book.totalChapters}</span>
                              </div>
                           </div>
                           <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-brand rounded-full transition-all duration-1000" style={{ width: `${book.progress}%` }} />
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            )}
            
            {activeTab === 'saved' && (
               <div className="flex flex-col items-center justify-center py-10 text-white/30 gap-2">
                  <BookOpen className="w-8 h-8 opacity-50" />
                  <p className="text-sm">저장된 콘텐츠가 없습니다.</p>
               </div>
            )}

            {activeTab === 'history' && (
               <div className="space-y-0">
                  <div className="bg-brand/10 p-4 rounded-lg mb-4 flex items-center justify-between">
                     <span className="text-brand text-sm font-bold">전체 내역 보기</span>
                     <button onClick={() => router.push('/profile/points')} className="bg-brand text-black text-xs px-3 py-1.5 rounded-full font-bold">
                        이동
                     </button>
                  </div>
                  {POINT_HISTORY.map((log) => (
                     <div key={log.id} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0">
                        <div>
                           <div className="font-medium text-sm">{log.title}</div>
                           <div className="text-xs text-white/40 mt-0.5">{log.date}</div>
                        </div>
                        <div className={cn(
                           "font-bold text-sm",
                           log.amount > 0 ? "text-brand" : "text-white"
                        )}>
                           {log.amount > 0 ? '+' : ''}{log.amount.toLocaleString()} P
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>
      </section>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#111] rounded-3xl w-full max-w-sm overflow-hidden border border-white/10"
            >
              <div className="p-4 flex justify-between items-center border-b border-white/5">
                <h3 className="font-bold text-lg">성좌 공유하기</h3>
                <button onClick={() => setShowShareModal(false)} className="p-2 hover:bg-white/10 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 flex flex-col items-center">
                 <div className="w-full aspect-square relative rounded-xl overflow-hidden mb-6 border border-white/10">
                    <ConstellationMap className="pointer-events-none" />
                 </div>
                 
                 <button 
                   onClick={handleShare}
                   disabled={isSharing}
                   className="w-full bg-brand text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   <Share2 className="w-5 h-5" />
                   {isSharing ? '공유 이미지 생성 중...' : '이미지로 공유하기'}
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Streak Calendar Sheet */}
      <BottomSheet
        isOpen={showStreakSheet}
        onClose={() => setShowStreakSheet(false)}
        title="연속 학습 리포트"
      >
        <div className="pb-10">
          <StreakCalendar 
            completedDates={['2023-10-01', '2023-10-02', '2023-10-05', '2023-10-06', '2023-10-07', '2023-10-21', '2023-10-22']} 
          />
        </div>
      </BottomSheet>

      {/* Category Level 50 Sheet */}


      {/* Constellation Map (Middle) */}
      <section className="px-6 py-6">
         <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">지식 성좌</h2>
            <button 
              onClick={() => setShowShareModal(true)}
              className="text-xs text-white/50 flex items-center gap-1 hover:text-white transition-colors"
            >
               자세히 보기 <ChevronRight className="w-3 h-3" />
            </button>
         </div>
         
         {/* Map Component */}
         <div ref={constellationRef}>
            <ConstellationMap 
              onStarClick={(category) => setSelectedCategory(category)}
            />
         </div>

         <p className="text-center text-white/40 text-xs mt-3 animate-pulse">
            <span className="text-brand">경제/경영</span> 분야의 지식이 빛나고 있습니다.
         </p>
      </section>

      {/* Library Tabs (Bottom) */}
      <section className="mt-2">
         <div className="flex border-b border-white/10 px-6 sticky top-0 bg-black z-10">
            {[
              { id: 'learning', label: '학습 중' },
              { id: 'saved', label: '보관함' },
              { id: 'history', label: '포인트' }
            ].map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id as any)}
                 className={cn(
                   "flex-1 py-3 text-sm font-medium relative transition-colors",
                   activeTab === tab.id ? "text-white" : "text-white/40 hover:text-white/60"
                 )}
               >
                 {tab.label}
                 {activeTab === tab.id && (
                    <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
                 )}
               </button>
            ))}
         </div>

         <div className="p-6 min-h-[300px]">
            {activeTab === 'learning' && (
               <div className="space-y-4">
                  {LEARNING_BOOKS.map(book => (
                     <div key={book.id} className="flex gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
                        <img src={book.cover} className="w-16 aspect-[3/4] rounded object-cover bg-gray-800" alt="cover" />
                        <div className="flex-1 flex flex-col justify-between py-1">
                           <div>
                              <h4 className="font-bold text-sm mb-1">{book.title}</h4>
                              <div className="flex items-center gap-1 text-xs text-white/50">
                                 <PlayCircle className="w-3 h-3" />
                                 <span>Chapter {book.currentChapter} / {book.totalChapters}</span>
                              </div>
                           </div>
                           <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-brand rounded-full transition-all duration-1000" style={{ width: `${book.progress}%` }} />
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            )}
            
            {activeTab === 'saved' && (
               <div className="flex flex-col items-center justify-center py-10 text-white/30 gap-2">
                  <BookOpen className="w-8 h-8 opacity-50" />
                  <p className="text-sm">저장된 콘텐츠가 없습니다.</p>
               </div>
            )}

            {activeTab === 'history' && (
               <div className="space-y-0">
                  <div className="bg-brand/10 p-4 rounded-lg mb-4 flex items-center justify-between">
                     <span className="text-brand text-sm font-bold">전체 내역 보기</span>
                     <button onClick={() => router.push('/profile/points')} className="bg-brand text-black text-xs px-3 py-1.5 rounded-full font-bold">
                        이동
                     </button>
                  </div>
                  {POINT_HISTORY.map((log) => (
                     <div key={log.id} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0">
                        <div>
                           <div className="font-medium text-sm">{log.title}</div>
                           <div className="text-xs text-white/40 mt-0.5">{log.date}</div>
                        </div>
                        <div className={cn(
                           "font-bold text-sm",
                           log.amount > 0 ? "text-brand" : "text-white"
                        )}>
                           {log.amount > 0 ? '+' : ''}{log.amount.toLocaleString()} P
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>
      </section>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#111] rounded-3xl w-full max-w-sm overflow-hidden border border-white/10"
            >
              <div className="p-4 flex justify-between items-center border-b border-white/5">
                <h3 className="font-bold text-lg">성좌 공유하기</h3>
                <button onClick={() => setShowShareModal(false)} className="p-2 hover:bg-white/10 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 flex flex-col items-center">
                 <div className="w-full aspect-square relative rounded-xl overflow-hidden mb-6 border border-white/10">
                    <ConstellationMap className="pointer-events-none" />
                 </div>
                 
                 <button 
                   onClick={handleShare}
                   disabled={isSharing}
                   className="w-full bg-brand text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   <Share2 className="w-5 h-5" />
                   {isSharing ? '공유 이미지 생성 중...' : '이미지로 공유하기'}
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Level 50 Sheet */}
      <BottomSheet 
        isOpen={!!selectedCategory} 
        onClose={() => setSelectedCategory(null)} 
        title={selectedCategory || ''}
      >
        <div className="pb-10">
           <div className="flex items-center gap-3 mb-6 bg-white/5 p-4 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-brand to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
                 LV.50
              </div>
              <div>
                 <h4 className="font-bold text-lg leading-tight">지식 마스터</h4>
                 <p className="text-white/50 text-xs">상위 1%의 지식 탐구자입니다.</p>
              </div>
           </div>

           <h5 className="font-bold text-md mb-3">학습 리포트</h5>
           <div className="space-y-3">
              {[1, 2, 3].map(i => (
                 <div key={i} className="flex gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center text-white/20">
                       <PlayCircle />
                    </div>
                    <div className="flex-1">
                       <h6 className="font-bold text-sm mb-1">{selectedCategory} 마스터 클래스 {i}</h6>
                       <p className="text-xs text-white/50 mb-2">총 12강 · 3시간 20분</p>
                       <div className="flex items-center gap-2">
                          <div className="flex-1 h-1 bg-white/10 rounded-full">
                             <div className="h-full bg-brand w-3/4 rounded-full" />
                          </div>
                          <span className="text-[10px] text-brand">75%</span>
                       </div>
                    </div>
                 </div>
              ))}
           </div>

           <button 
             onClick={() => router.push('/category/1')}
             className="w-full mt-6 bg-white text-black font-bold py-4 rounded-xl hover:opacity-90 transition-opacity"
           >
             이어서 학습하기
           </button>
        </div>
      </BottomSheet>
    </div>
  );
}
