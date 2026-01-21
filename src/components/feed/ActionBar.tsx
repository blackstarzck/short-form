import React from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ActionBarProps {
  likes?: number;
  comments?: number;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onSave?: () => void;
  onMore?: () => void;
}

// Format numbers like Instagram (1.3만, 112, etc.)
function formatNumber(num: number): string {
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1)}만`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}천`;
  }
  return num.toString();
}

export function ActionBar({ 
  likes = 0,
  comments = 0,
  onLike,
  onComment,
  onShare,
  onSave,
  onMore 
}: ActionBarProps) {
  return (
    <div className="flex flex-col items-center gap-5">
      {/* Like */}
      <ActionItem 
        icon={<Heart className="w-7 h-7" />} 
        label={formatNumber(likes)}
        onClick={onLike}
      />
      
      {/* Comment */}
      <ActionItem 
        icon={<MessageCircle className="w-7 h-7" />} 
        label={formatNumber(comments)}
        onClick={onComment}
      />
      
      {/* Share */}
      <ActionItem 
        icon={<Send className="w-7 h-7" />} 
        onClick={onShare}
      />
      
      {/* Save/Bookmark */}
      <ActionItem 
        icon={<Bookmark className="w-7 h-7" />} 
        onClick={onSave}
      />

      {/* More */}
      <ActionItem 
        icon={<MoreHorizontal className="w-6 h-6" />} 
        onClick={onMore}
        className="bg-black/30 p-2 rounded-full backdrop-blur-sm hover:bg-black/40"
      />
    </div>
  );
}

function ActionItem({ 
  icon, 
  label, 
  onClick,
  className
}: { 
  icon: React.ReactNode; 
  label?: string; 
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <button 
        onClick={onClick}
        className={cn(
          "text-white drop-shadow-lg transition-all active:scale-95",
          !className && "hover:scale-110", // Only apply scale hover if no custom class (to avoid conflict with bg hover)
          className
        )}
        style={{ filter: className ? 'none' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
      >
        {icon}
      </button>
      {label && (
        <span 
          className="text-xs font-semibold text-white"
          style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
