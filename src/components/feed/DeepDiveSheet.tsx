import React from 'react';
import { BottomSheet } from '@/components/shared/BottomSheet';
import { Insight } from '@/types';
import { Button } from '@/components/shared/Button';
import { BookOpen, CheckCircle, Share2 } from 'lucide-react';

interface DeepDiveSheetProps {
  isOpen: boolean;
  onClose: () => void;
  insight: Insight | undefined;
}

export function DeepDiveSheet({ isOpen, onClose, insight }: DeepDiveSheetProps) {
  if (!insight) return null;

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="심화 학습">
      <div className="space-y-6 pb-20">
        {/* Title Section */}
        <div className="space-y-2">
          <span className="inline-block px-2 py-1 bg-brand/10 text-brand text-xs font-bold rounded-full">
            핵심 인사이트
          </span>
          <h3 className="text-2xl font-bold text-white leading-tight">
            {insight.title}
          </h3>
        </div>

        {/* Summary Card */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-white/80">
            <BookOpen size={18} className="text-brand" />
            <h4 className="font-semibold">요약</h4>
          </div>
          <p className="text-white/70 leading-relaxed text-sm">
            {insight.summary}
          </p>
        </div>

        {/* Key Points */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-white">핵심 포인트</h4>
          <ul className="space-y-3">
            {insight.key_points.map((point, idx) => (
              <li key={idx} className="flex gap-3 items-start">
                <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button variant="brand" className="flex-1 font-bold" onClick={() => console.log('Complete')}>
            학습 완료
          </Button>
          <Button variant="outline" size="icon" onClick={() => console.log('Share')}>
            <Share2 size={18} />
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}
