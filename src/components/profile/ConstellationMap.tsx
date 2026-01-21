import React from 'react';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';

interface StarProps {
  cx: number;
  cy: number;
  r: number;
  color: string;
  label: string;
  opacity: number;
  pulse?: boolean;
  onClick?: () => void;
}

function Star({ cx, cy, r, color, label, opacity, pulse, onClick }: StarProps) {
  return (
    <g className="cursor-pointer hover:opacity-100 transition-opacity group" onClick={onClick}>
      {/* Ripple Animation */}
      {pulse && (
        <motion.circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={1}
          initial={{ r: r, opacity: 0.6 }}
          animate={{ r: r * 2.5, opacity: 0 }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeOut",
            repeatDelay: 0.5 
          }}
        />
      )}
      
      {/* Main Star */}
      <circle 
        cx={cx} 
        cy={cy} 
        r={r} 
        fill={color} 
        fillOpacity={opacity} 
        className={cn("transition-all duration-300 group-hover:r-[1.2em]")} 
      />
      
      {/* Hover Glow */}
      <circle 
        cx={cx} 
        cy={cy} 
        r={r * 1.5} 
        fill={color} 
        fillOpacity={0.2} 
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      
      <text 
        x={cx} 
        y={cy + r + 15} 
        textAnchor="middle" 
        fill="white" 
        fontSize="10" 
        opacity="0.7" 
        className="font-medium group-hover:opacity-100 group-hover:font-bold transition-all"
      >
        {label}
      </text>
    </g>
  );
}

interface ConstellationMapProps {
  onStarClick?: (category: string) => void;
  id?: string;
  className?: string;
}

export function ConstellationMap({ onStarClick, id, className }: ConstellationMapProps) {
  // Deterministic random background stars
  const backgroundStars = Array.from({length: 50}).map((_, i) => {
    const seed = i + 1;
    const r1 = Math.sin(seed) * 10000;
    const x = (r1 - Math.floor(r1)) * 400;
    
    const r2 = Math.cos(seed) * 10000;
    const y = (r2 - Math.floor(r2)) * 400;

    return { id: i, x, y, r: (i % 3) * 0.5 + 0.5, opacity: ((i % 5) + 1) * 0.1 };
  });

  return (
    <div 
      id={id}
      className={cn(
        "aspect-square w-full bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/5 relative overflow-hidden shadow-inner flex items-center justify-center select-none", 
        className
      )}
    >
      <svg width="100%" height="100%" viewBox="0 0 400 400" className="absolute inset-0">
        {/* Background Stars */}
        {backgroundStars.map((star) => (
          <circle 
            key={`bg-${star.id}`} 
            cx={star.x} 
            cy={star.y} 
            r={star.r} 
            fill="white" 
            opacity={star.opacity} 
          />
        ))}
        
        {/* Connections */}
        <path d="M200 200 L100 100 L300 120 Z" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
        <path d="M200 200 L150 300 L250 320" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />

        {/* Main Stars (Categories) */}
        {/* Center (Economy) */}
        <Star 
          cx={200} cy={200} r={12} color="#FF9800" label="경제/경영" opacity={1} pulse 
          onClick={() => onStarClick?.('경제/경영')} 
        />
        {/* Tech */}
        <Star 
          cx={100} cy={100} r={8} color="#A855F7" label="테크" opacity={0.7} 
          onClick={() => onStarClick?.('테크')}
        />
        {/* Humanities */}
        <Star 
          cx={300} cy={120} r={6} color="#EAB308" label="인문" opacity={0.5} 
          onClick={() => onStarClick?.('인문')}
        />
        {/* Self-help */}
        <Star 
          cx={150} cy={300} r={10} color="#F97316" label="자기계발" opacity={0.8} 
          onClick={() => onStarClick?.('자기계발')}
        />
        {/* Health */}
        <Star 
          cx={250} cy={320} r={5} color="#EF4444" label="건강" opacity={0.4} 
          onClick={() => onStarClick?.('건강')}
        />
      </svg>
    </div>
  );
}
