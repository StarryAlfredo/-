import React from 'react';

interface NextButtonProps {
  onClick: () => void;
  visible: boolean;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick, visible }) => {
  return (
    <div 
      className={`fixed bottom-10 left-0 w-full flex justify-center transition-all duration-1000 transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
    >
      <button
        onClick={onClick}
        className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-full border border-rose-400/50 hover:border-rose-400 transition-all duration-300"
      >
         <div className="absolute inset-0 w-0 bg-rose-600/20 transition-all duration-[250ms] ease-out group-hover:w-full opacity-0 group-hover:opacity-100"></div>
         <span className="relative text-rose-100 font-serif-display text-lg tracking-widest group-hover:text-white transition-colors">
            ENTER NEXT PAGE
         </span>
         <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-[1px] bg-rose-500/50 blur-[2px]"></div>
      </button>
    </div>
  );
};

export default NextButton;
