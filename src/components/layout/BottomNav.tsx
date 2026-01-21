'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Home, User, Compass } from 'lucide-react';
import { cn } from '@/utils/cn';

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { icon: <Home size={24} />, label: '홈', path: '/' },
    { icon: <Compass size={24} />, label: '탐색', path: '/discover' }, // Placeholder
    { icon: <User size={24} />, label: '프로필', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] h-16 bg-black border-t border-white/10 flex items-center justify-around z-40 pb-safe-bottom">
      {navItems.map((item) => {
        const isActive = pathname ? (pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path))) : false;
        return (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
              isActive ? "text-white" : "text-white/40 hover:text-white/60"
            )}
          >
            {item.icon}
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
