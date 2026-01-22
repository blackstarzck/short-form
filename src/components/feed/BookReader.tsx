import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Settings, Bookmark, Share2, Menu } from 'lucide-react';
import { cn } from '@/utils/cn';

interface BookReaderProps {
  isOpen: boolean;
  onClose: () => void;
  bookTitle?: string;
  chapterTitle?: string;
}

export function BookReader({ isOpen, onClose, bookTitle = "돈의 속성", chapterTitle = "1장. 돈은 인격체다" }: BookReaderProps) {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      exit={{ x: '100%' }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 bg-[#F9F7F1] text-gray-900 flex flex-col h-[100dvh]"
    >
      {/* Header */}
      <header className="flex items-center justify-between px-4 h-14 border-b border-gray-200 bg-[#F9F7F1] shrink-0 sticky top-0 z-10">
        <button 
          onClick={onClose}
          className="p-2 -ml-2 text-gray-600 hover:bg-black/5 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex flex-col items-center max-w-[60%]">
          <span className="text-xs text-gray-500 font-medium truncate w-full text-center">{bookTitle}</span>
          <span className="text-sm font-bold text-gray-800 truncate w-full text-center">{chapterTitle}</span>
        </div>
        <div className="flex items-center gap-1 -mr-2">
          <button className="p-2 text-gray-600 hover:bg-black/5 rounded-full transition-colors">
            <Settings size={20} />
          </button>
          <button className="p-2 text-gray-600 hover:bg-black/5 rounded-full transition-colors">
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar bg-[#F9F7F1]">
        <div className="max-w-2xl mx-auto px-6 py-8">
          <div className="prose prose-lg prose-gray max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 leading-tight font-serif">
              {chapterTitle}
            </h2>
            
            <p className="text-[17px] leading-[1.8] text-gray-800 font-serif mb-6 text-justify">
              돈은 인격체다. 돈을 다루는 태도는 사람을 대하는 태도와 같다. 돈을 소중히 여기고, 좋은 곳에 보내주면 돈은 다시 친구를 데리고 돌아온다. 하지만 돈을 함부로 대하거나, 가치 없는 곳에 낭비하면 돈은 영영 떠나버린다.
            </p>

            <p className="text-[17px] leading-[1.8] text-gray-800 font-serif mb-6 text-justify">
              어떤 사람은 돈이 차가운 금속이나 종이 조각에 불과하다고 생각한다. 그러나 돈은 스스로 감정을 가진 실체처럼 움직인다. 자기를 좋아하는 사람에게 붙어 있으려 하고, 자기를 하대하는 사람에게서는 도망치려 한다. 작은 돈을 함부로 하는 사람에게선 큰 돈이 몰려오지 않으며, 돈을 감정적으로 대하는 사람에게는 돈이 오랫동안 머물지 않는다.
            </p>

            <div className="my-8 pl-4 border-l-4 border-brand italic text-gray-600 font-serif">
              "부자가 되는 방법은 간단하다. 돈을 인격체로 대하라."
            </div>

            <p className="text-[17px] leading-[1.8] text-gray-800 font-serif mb-6 text-justify">
              나는 돈을 벌기 위해 남을 해치거나 사기 치지 않았다. 정당한 방법으로 벌어들인 돈은 그 자체로 품위가 있다. 그런 돈은 나를 보호해주고, 내가 사랑하는 사람들을 지켜준다. 반면 부정한 방법으로 번 돈은 주인을 해치고, 결국엔 주인까지 파멸로 이끈다. 이것이 내가 돈을 인격체라고 부르는 이유다.
            </p>

            <p className="text-[17px] leading-[1.8] text-gray-800 font-serif mb-6 text-justify">
              돈에게도 시간이 필요하다. 씨앗을 심고 나무가 자라 열매를 맺기까지 시간이 걸리듯, 자산이 불어나는 데에도 절대적인 시간이 필요하다. 조급한 마음으로 돈을 좇으면 돈은 더 멀리 도망간다. 여유를 가지고 돈이 일할 수 있는 환경을 만들어주는 것, 그것이 바로 돈을 존중하는 태도다.
            </p>
            
            <p className="text-[17px] leading-[1.8] text-gray-800 font-serif mb-6 text-justify">
              이제 당신의 지갑 속에 있는 돈을 꺼내어 보라. 그 돈이 당신에게 어떤 의미인지 생각해보라. 단순히 물건을 교환하는 수단인가, 아니면 당신의 삶을 지탱해주는 소중한 파트너인가? 관점을 바꾸는 순간, 부의 흐름이 바뀌기 시작할 것이다.
            </p>
          </div>

          <div className="mt-12 flex items-center justify-center gap-2 text-gray-400 text-sm">
             <span>16 / 324 페이지</span>
          </div>
        </div>
      </div>

      {/* Footer / Progress */}
      <div className="h-1 bg-gray-200 shrink-0">
        <div className="h-full bg-brand w-[5%]"></div>
      </div>
    </motion.div>
  );
}
