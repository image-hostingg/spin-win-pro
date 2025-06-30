// src/components/SoundManager.js
import React, { useRef, useEffect } from 'react';

const SoundManager = () => {
  const spinStartAudio = useRef(null);
  const winAudio = useRef(null);
  const loseAudio = useRef(null);

  useEffect(() => {
    // Preload sounds if necessary (though browser handles this mostly)
    // You might want to set .volume for all sounds here
    if (spinStartAudio.current) spinStartAudio.current.volume = 0.5;
    if (winAudio.current) winAudio.current.volume = 0.6;
    if (loseAudio.current) loseAudio.current.volume = 0.5;
  }, []);

  const playSpinStart = () => {
    if (spinStartAudio.current) {
      spinStartAudio.current.currentTime = 0; // Rewind to start
      spinStartAudio.current.play().catch(e => console.error("Error playing spin start sound:", e));
    }
  };

  const playWin = () => {
    if (winAudio.current) {
      winAudio.current.currentTime = 0;
      winAudio.current.play().catch(e => console.error("Error playing win sound:", e));
    }
  };

  const playLose = () => {
    if (loseAudio.current) {
      loseAudio.current.currentTime = 0;
      loseAudio.current.play().catch(e => console.error("Error playing lose sound:", e));
    }
  };

  return (
    <div className="hidden"> {/* Hide audio elements visually */}
      <audio ref={spinStartAudio} src="/sounds/spin_start.mp3" preload="auto"></audio>
      <audio ref={winAudio} src="/sounds/win_sound.mp3" preload="auto"></audio>
      <audio ref={loseAudio} src="/sounds/lose_sound.mp3" preload="auto"></audio>
      {/* Expose playback functions via render props or context if this were a complex manager.
          For this example, App.js will directly call these methods if SoundManager is a child.
          Alternatively, move audio elements and refs directly into App.js for simpler use.
      */}
      {/* This component primarily exists to hold the audio elements. The play functions will be passed down */}
    </div>
  );
};

export default SoundManager;