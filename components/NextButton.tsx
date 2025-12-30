import React from 'react';
import { THEME_COLORS } from '../constants';

interface NextButtonProps {
  onClick: () => void;
  visible: boolean;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick, visible }) => {
  return (
    <div 
      className={`fixed bottom-12 left-0 w-full flex justify-center transition-all duration-1000 transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
    >
      <button
        onClick={onClick}
        className="group relative px-10 py-4 bg-transparent overflow-hidden transition-all duration-300"
      >
         {/* Border Container */}
         <div className="absolute inset-0 border border-[#d4af37] opacity-50 rounded-sm"></div>
         <div className="absolute inset-[3px] border border-[#d4af37] opacity-30 rounded-sm"></div>
         
         {/* Hover Fill */}
         <div className="absolute inset-0 bg-[#d4af37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out opacity-20"></div>

         <span className="relative text-[#d4af37] font-serif-display text-xl tracking-[0.2em] uppercase group-hover:text-[#f3e5ab] transition-colors">
            Enter Next Page
         </span>
      </button>
    </div>
  );
};

export default NextButton;