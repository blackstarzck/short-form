import React from 'react';
import { BottomSheet } from '@/components/shared/BottomSheet';
import { Video } from '@/types';
import { BookCard } from '@/components/shared/BookCard';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Flag,
  Info,
  Link,
  ArrowUpRight
} from 'lucide-react';
import { cn } from '@/utils/cn';

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  video: Video;
  onLike?: () => void;
  onComment?: () => void;
  onSave?: () => void;
  onShare?: () => void;
}

export function ActionSheet({ 
  isOpen, 
  onClose, 
  video,
  onLike,
  onComment,
  onSave,
  onShare
}: ActionSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="더보기">
      <div className="space-y-1 pb-10">
        {/* Book Purchase Link (High Priority) */}
        {video.related_book && (
          <div className="mb-6">
            <BookCard
              coverUrl={video.related_book.cover_url}
              title={video.related_book.title}
              author={video.related_book.author}
              purchaseUrl={video.related_book.purchase_url}
            />
          </div>
        )}

        <ActionRow 
          icon={<Heart className={cn(video.stats.likes > 0 ? "fill-red-500 text-red-500" : "")} />} 
          label={`좋아요 ${video.stats.likes > 0 ? video.stats.likes : ''}`} 
          subLabel="이 영상이 마음에 드시나요?" 
          onClick={onLike}
        />
        <ActionRow 
          icon={<MessageCircle />} 
          label="댓글 달기" 
          subLabel="의견을 남겨주세요." 
          onClick={onComment}
        />
        <ActionRow 
          icon={<Bookmark />} 
          label="나중에 보기" 
          subLabel="보관함에 저장합니다." 
          onClick={onSave}
        />
        <ActionRow 
          icon={<Share2 />} 
          label="공유하기" 
          subLabel="친구들에게 지식을 공유하세요." 
          onClick={onShare}
        />
        
        <div className="h-px bg-white/10 my-2" />
        
        <ActionRow icon={<Info />} label="이 계정 정보" />
        <ActionRow icon={<Link />} label="링크 복사" onClick={() => console.log('Copy Link')} />
        <ActionRow icon={<ArrowUpRight />} label="게시물로 이동" onClick={() => console.log('Go to post')} />
        
        <div className="h-px bg-white/10 my-2" />
        <ActionRow icon={<Flag className="text-red-400" />} label="신고하기" labelColor="text-red-400" />
      </div>
    </BottomSheet>
  );
}

function ActionRow({ 
  icon, 
  label, 
  subLabel, 
  labelColor = "text-white",
  onClick
}: { 
  icon: React.ReactNode, 
  label: string, 
  subLabel?: string,
  labelColor?: string,
  onClick?: () => void
}) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 hover:bg-white/5 rounded-lg transition-colors text-left"
    >
      <div className="text-white/80">
        {icon}
      </div>
      <div>
        <span className={`block font-medium ${labelColor}`}>{label}</span>
        {subLabel && <span className="block text-xs text-white/50">{subLabel}</span>}
      </div>
    </button>
  );
}
