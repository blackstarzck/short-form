import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface BookCardProps {
  coverUrl: string;
  title: string;
  author: string;
  purchaseUrl: string;
}

export function BookCard({ coverUrl, title, author, purchaseUrl }: BookCardProps) {
  return (
    <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl text-left border border-white/5 shadow-md">
      <img
        src={coverUrl}
        alt={title}
        className="w-16 h-24 object-cover rounded shadow-md bg-gray-800"
      />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-white/60 mb-0.5">함께 읽으면 좋은 책</p>
        <h3 className="text-white font-bold truncate leading-tight mb-1">{title}</h3>
        <p className="text-sm text-white/70 mb-2">{author}</p>
        <a
          href={purchaseUrl}
          target="_blank"
          rel="noreferrer"
          className="text-brand text-xs font-bold flex items-center gap-1 hover:underline w-fit"
        >
          구매하러 가기
        </a>
      </div>
    </div>
  );
}
