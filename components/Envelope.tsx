import React, { useState } from 'react';
import { CONFESSION_CONTENT, THEME_COLORS } from '../constants';

interface EnvelopeProps {
  onOpenComplete: () => void;
}

const Envelope: React.FC<EnvelopeProps> = ({ onOpenComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => {
        setShowContent(true);
        // Wait for letter animation to finish before showing button
        setTimeout(() => {
            onOpenComplete();
        }, 1200); 
      }, 800);
    }
  };

  return (
    <div className="relative w-[320px] md:w-[500px] h-[220px] md:h-[300px] group mx-auto mt-24 perspective-1000 select-none">
      
      {/* 3D Container */}
      <div 
        className={`relative w-full h-full transition-transform duration-1000 ease-in-out transform-style-3d ${isOpen ? 'translate-y-32' : 'cursor-pointer hover:rotate-1'}`}
        onClick={handleOpen}
      >
        
        {/* Envelope Back */}
        <div className="absolute inset-0 bg-[#8b5a2b] rounded-md shadow-2xl border border-[#6b4220] z-0"></div>

        {/* The Letter */}
        <div 
            className={`absolute left-2 right-2 md:left-4 md:right-4 bg-[#f3e5ab] shadow-sm transition-all duration-[1500ms] ease-out z-10 flex flex-col p-6 overflow-hidden
            ${showContent ? '-translate-y-[220px] md:-translate-y-[280px] h-[350px] md:h-[450px] rounded-sm' : 'translate-y-2 h-[90%] rounded-md'}`}
            style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #d4af37 28px)',
                backgroundSize: '100% 28px',
                boxShadow: 'inset 0 0 20px rgba(139, 90, 43, 0.2)'
            }}
        >
            <div className={`transition-opacity duration-1000 delay-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                {CONFESSION_CONTENT.map((line, idx) => (
                    <p key={idx} className="font-handwriting text-lg md:text-2xl text-[#4a3b2a] mb-2 leading-[28px]">
                        {line}
                    </p>
                ))}
                <div className="mt-6 text-right font-handwriting text-xl text-[#8b0000]">
                    - Forever Yours
                </div>
            </div>
        </div>

        {/* Envelope Front Folds (Static) */}
        {/* Left Fold */}
        <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none overflow-hidden rounded-md">
             <div className="absolute top-0 left-0 w-0 h-0 border-t-[110px] md:border-t-[150px] border-r-[160px] md:border-r-[250px] border-b-[110px] md:border-b-[150px] border-transparent border-l-[160px] md:border-l-[250px] border-l-[#a06d3a] border-b-[#966333]"></div>
        </div>
        {/* Right Fold */}
         <div className="absolute top-0 right-0 w-full h-full z-20 pointer-events-none overflow-hidden rounded-md">
             <div className="absolute top-0 right-0 w-0 h-0 border-t-[110px] md:border-t-[150px] border-l-[160px] md:border-l-[250px] border-b-[110px] md:border-b-[150px] border-transparent border-r-[160px] md:border-r-[250px] border-r-[#a06d3a] border-b-[#966333]"></div>
        </div>
        
        {/* Top Flap (Animated) */}
        <div 
            className={`absolute top-0 left-0 w-full h-1/2 z-30 transition-transform duration-700 ease-in-out origin-top ${isOpen ? 'rotate-x-180 z-0' : 'z-30'}`}
            style={{ transformStyle: 'preserve-3d' }}
        >
             {/* Flap Shape */}
            <div className="absolute inset-0 w-full h-full">
                <div className="w-0 h-0 border-l-[160px] md:border-l-[250px] border-r-[160px] md:border-r-[250px] border-t-[110px] md:border-t-[150px] border-transparent border-t-[#8b5a2b] filter drop-shadow-lg"></div>
            </div>

            {/* Wax Seal */}
            <div 
                className={`absolute top-[80px] md:top-[110px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100 hover:scale-110'}`}
                style={{
                    background: 'radial-gradient(circle at 30% 30%, #ff4d4d, #8b0000)',
                    boxShadow: '0 3px 6px rgba(0,0,0,0.4), 0 0 0 4px rgba(139,0,0,0.3)'
                }}
            >
                <div className="w-10 h-10 border-2 border-[#ff9999] rounded-full flex items-center justify-center opacity-70">
                    <span className="text-[#ffcccc] font-serif-display text-xl">♥</span>
                </div>
            </div>
        </div>

      </div>
      
      {!isOpen && (
        <div className="absolute -bottom-12 left-0 w-full text-center">
            <p className="font-serif-display text-[#d4af37] text-md tracking-widest opacity-80 animate-bounce">
                Click the seal
            </p>
        </div>
      )}
    </div>
  );
};

export default Envelope;