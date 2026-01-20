'use client';

import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface KnowledgeGraphProps {
  data: {
    subject: string;
    A: number;
    fullMark: number;
  }[];
}

export function KnowledgeGraph({ data }: KnowledgeGraphProps) {
  return (
    <div className="w-full h-[300px] bg-black/50 rounded-xl p-4 border border-white/10">
      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-brand"/>
        지식 성좌 (Knowledge Constellation)
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#3f3f46" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#a1a1aa', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
          <Radar
            name="숙련도"
            dataKey="A"
            stroke="#FF9800"
            strokeWidth={2}
            fill="#FF9800"
            fillOpacity={0.3}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
            itemStyle={{ color: '#FF9800' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
