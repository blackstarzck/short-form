import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/utils/cn';

export function ActionBar({ 
  onMore
}: { onMore?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <ActionItem 
        icon={<MoreHorizontal className="w-8 h-8" />} 
        onClick={onMore}
      />
    </div>
  );
}

function ActionItem({ icon, label, onClick }: { icon: React.ReactNode, label?: string, onClick?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <button 
        onClick={onClick}
        className="p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors active:scale-90"
      >
        <div className="text-white drop-shadow-md">
          {icon}
        </div>
      </button>
      {label && <span className="text-xs font-medium text-white drop-shadow-md">{label}</span>}
    </div>
  );
}
