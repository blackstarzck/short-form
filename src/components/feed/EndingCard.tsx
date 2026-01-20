import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/shared/Button';
import { PlayCircle, RotateCcw } from 'lucide-react';
import { Video } from '@/types';
import { BookCard } from '@/components/shared/BookCard';

interface EndingCardProps {
  isVisible: boolean;
  video: Video;
  onReplay: () => void;
  onNext: () => void;
}

export function EndingCard({ isVisible, video, onReplay, onNext }: EndingCardProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isVisible) return null;

  return (
    <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fade-in">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="w-full max-w-sm space-y-6"
      >
        <div className="space-y-2">
          <p className="text-brand font-bold">학습 완료!</p>
          <h2 className="text-2xl font-bold text-white leading-tight">
            다음 지식이 기다리고 있어요
          </h2>
        </div>

        {/* Book Info (If exists) */}
        {video.related_book && (
          <BookCard
            coverUrl={video.related_book.cover_url}
            title={video.related_book.title}
            author={video.related_book.author}
            purchaseUrl={video.related_book.purchase_url}
          />
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 w-full">
          <Button
            variant="brand"
            size="lg"
            className="w-full font-bold text-lg h-14"
            onClick={onNext}
          >
            다음 클립 재생
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-white/60 hover:text-white"
            onClick={onReplay}
          >
            <RotateCcw size={16} className="mr-2" />
            다시 보기
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
