import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
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

  const handleFlashback = () => {
    if (videoRef.current) {
      if (!isPlaying) {
        videoRef.current.hidden = false;
        videoRef.current.muted = false;
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.hidden = true;
        videoRef.current.muted = true;
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
  };

  const toggleTrenchPosition = () => {
    if (isMediumScreen) {
      setTrenchPosition(prev => prev === 'right' ? 'left' : 'right');
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center relative">
      <iframe
        src="https://pump.fun/board"
        className="absolute inset-0 w-full h-full border-0 z-0"
        title="Pump.fun Board"
      />
      <video
        ref={videoRef}
        loop
        playsInline
        hidden
        className="absolute inset-0 w-full h-full object-cover z-10 opacity-50"
        style={{ pointerEvents: 'none' }}
      >
        <source src={`${process.env.PUBLIC_URL}/vid.mp4`} type="video/mp4" />
      </video>
      <img 
        src="trench.png" 
        onClick={toggleTrenchPosition}
        className={`absolute bottom-0 w-[85%] md:w-[45%] z-20 transition-all duration-500 cursor-pointer
                    ${isMediumScreen ? (trenchPosition === 'right' ? 'right-5' : 'left-5') : ''}`}
        alt="Trench" 
      />
      <button
        onClick={handleFlashback}
        className="absolute font-custom top-5 left-5 z-30 bg-red-600 text-white rounded-md transition-colors md:text-2xl px-3 pt-2 pb-1"
      >
        {isPlaying ? 'Stop' : 'Flashback'}
      </button>
    </div>
  );
}

export default App;