import React, { useState, useEffect } from 'react';
import { CONFESSION_CONTENT } from '../constants';
import { AppState } from '../types';

interface EnvelopeProps {
  onOpenComplete: () => void;
}

const Envelope: React.FC<EnvelopeProps> = ({ onOpenComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      // Wait for the flap to open before sliding up the letter
      setTimeout(() => {
        setShowContent(true);
        // Signal parent that animation is mostly done
        setTimeout(() => {
            onOpenComplete();
        }, 1500); 
      }, 600);
    }
  };

  return (
    <div className="relative w-full max-w-[90vw] md:max-w-lg h-64 md:h-80 perspective-1000 group mx-auto mt-20 md:mt-0 select-none">
      
      {/* The Envelope Container - Using preserve-3d for realistic folding */}
      <div className={`relative w-full h-full transition-transform duration-1000 ease-in-out transform-style-3d ${isOpen ? 'translate-y-24 md:translate-y-32' : 'hover:scale-105 cursor-pointer'}`}
           onClick={handleOpen}>
        
        {/* Envelope Back Body */}
        <div className="absolute inset-0 bg-[#e0c097] rounded-lg shadow-2xl border-2 border-[#ccb08a] z-0"></div>

        {/* The Letter Inside */}
        <div 
            className={`absolute left-4 right-4 top-2 bottom-2 bg-[#fef3c7] shadow-md transition-all duration-[1500ms] ease-in-out z-10 flex flex-col p-6 overflow-hidden
            ${showContent ? '-translate-y-48 md:-translate-y-64 h-auto min-h-[300px] md:min-h-[400px] rounded-sm' : 'translate-y-0 h-[90%] rounded-lg'}`}
            style={{
                backgroundImage: 'repeating-linear-gradient(#fef3c7, #fef3c7 31px, #94a3b8 32px)',
                backgroundAttachment: 'local',
                lineHeight: '32px',
            }}
        >
            <div className={`transition-opacity duration-1000 delay-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                {CONFESSION_CONTENT.map((line, idx) => (
                    <p key={idx} className="font-handwriting text-xl md:text-2xl text-slate-800 mb-2 leading-8">
                        {line}
                    </p>
                ))}
                <div className="mt-8 text-right font-handwriting text-xl text-rose-600">
                    - Yours Truly
                </div>
            </div>
        </div>

        {/* Envelope Front Left Fold */}
        <div className="absolute top-0 left-0 width-0 height-0 border-t-[128px] md:border-t-[160px] border-l-[160px] md:border-l-[256px] border-b-[128px] md:border-b-[160px] border-transparent border-l-[#e6ccaa] border-b-[#dcbfa0] rounded-bl-lg z-20 pointer-events-none"></div>
        
        {/* Envelope Front Right Fold */}
        <div className="absolute top-0 right-0 width-0 height-0 border-t-[128px] md:border-t-[160px] border-r-[160px] md:border-r-[256px] border-b-[128px] md:border-b-[160px] border-transparent border-r-[#e6ccaa] border-b-[#dcbfa0] rounded-br-lg z-20 pointer-events-none"></div>

        {/* Envelope Top Flap (The animation part) */}
        <div 
            className={`absolute top-0 left-0 w-full h-1/2 origin-top transition-transform duration-700 ease-in-out z-30 ${isOpen ? 'rotate-x-180 z-0' : 'z-30'}`}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* The triangular flap shape */}
            <div className="absolute inset-0 flex justify-center">
                 <div 
                    className="w-0 h-0 border-l-[160px] md:border-l-[256px] border-r-[160px] md:border-r-[256px] border-t-[110px] md:border-t-[140px] border-transparent border-t-[#d6bc98] filter drop-shadow-md"
                 ></div>
            </div>

            {/* The Wax Seal */}
            <div 
                className={`absolute top-[90px] md:top-[120px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-rose-700 rounded-full shadow-lg border-4 border-rose-800 flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
                style={{
                    boxShadow: '0 4px 6px rgba(0,0,0,0.3), inset 0 -4px 4px rgba(0,0,0,0.2)'
                }}
            >
                <span className="text-rose-200 font-serif-display text-2xl font-bold">♥</span>
            </div>
        </div>
        
        {/* Front Bottom Pocket (To hide the letter bottom when closed) */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 z-20 overflow-hidden rounded-b-lg pointer-events-none">
             {/* We simulate the bottom triangle using borders simply to cover the letter */}
             <div className="w-0 h-0 border-l-[160px] md:border-l-[256px] border-r-[160px] md:border-r-[256px] border-b-[110px] md:border-b-[140px] border-transparent border-b-[#dcbfa0] absolute bottom-0 left-1/2 -translate-x-1/2"></div>
        </div>

      </div>
      
      {!isOpen && (
        <div className="absolute -bottom-16 left-0 w-full text-center animate-pulse">
            <p className="text-rose-200 font-serif-display text-lg tracking-widest opacity-80">Click the seal to open</p>
        </div>
      )}
    </div>
  );
};

export default Envelope;
