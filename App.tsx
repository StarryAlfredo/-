import React, { useState } from 'react';
import FlowingGrid from './components/FlowingGrid';
import Envelope from './components/Envelope';
import NextButton from './components/NextButton';
import { AppState } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.CLOSED);

  const handleOpenComplete = () => {
    setAppState(AppState.OPEN);
  };

  const handleNextPage = () => {
    setAppState(AppState.NEXT_PAGE);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background - Pure JS Canvas Logic */}
      <FlowingGrid />

      {/* Main Content Layer */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-[600px]">
        
        {appState !== AppState.NEXT_PAGE ? (
             <Envelope onOpenComplete={handleOpenComplete} />
        ) : (
            <div className="text-center animate-fade-in">
                <h1 className="text-4xl md:text-6xl font-serif-display text-rose-200 mb-4">
                    Chapter Two
                </h1>
                <p className="text-rose-400/80 font-handwriting text-2xl">
                    (To be continued...)
                </p>
            </div>
        )}

      </div>

      {/* Sticky Bottom Button */}
      <NextButton 
        visible={appState === AppState.OPEN} 
        onClick={handleNextPage} 
      />

    </div>
  );
};

export default App;
