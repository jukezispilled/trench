import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [trenchPosition, setTrenchPosition] = useState('right');
  const [isMediumScreen, setIsMediumScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMediumScreen(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleTrenchPosition = () => {
    if (isMediumScreen) {
      setTrenchPosition(prev => prev === 'right' ? 'left' : 'right');
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center relative overflow-hidden">
      <iframe
        src="https://pump.fun/9YBPiKKXUS27bsBH1S9iDDyisWArTsvnG8udgs8GqsA4"
        className="absolute inset-0 w-full h-full border-0 z-0"
        title="Pump.fun Board"
      />
      <img src="cat.png" className='absolute right-0 bottom-[35%] -rotate-[40deg] w-[80%] translate-x-[25%] md:hidden'></img>
      <img 
        src="cat.png" 
        onClick={toggleTrenchPosition}
        className={`absolute bottom-0 w-[85%] md:w-[45%] z-20 transition-all duration-500 cursor-pointer hidden md:flex
                    ${isMediumScreen ? (trenchPosition === 'right' ? 'right-5' : 'left-5') : ''}`}
        alt="Trench" 
      />
    </div>
  );
}

export default App;