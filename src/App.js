// src/App.js
import { Analytics } from "@vercel/analytics/react";
import React, { useState, useRef } from 'react';
import Header from './components/Header';
import SpinWheel from './components/SpinWheel';
import SpinCounter from './components/SpinCounter';
import ActionButton from './components/ActionButton';
import PrizeModal from './components/PrizeModal';
import NothingWonModal from './components/NothingWonModal'; // Import new modal
import LiveSpinCounter from './components/LiveSpinCounter';
import Leaderboard from './components/Leaderboard';
import Footer from './components/Footer';
import { determinePrize, getPrizeSegmentIndex, prizes } from './utils/wheelLogic';

function App() {
  const [spinsLeft, setSpinsLeft] = useState(5);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showPrizeModal, setShowPrizeModal] = useState(false);
  const [showNothingWonModal, setShowNothingWonModal] = useState(false); // New state for "Try Again"
  const [wonPrize, setWonPrize] = useState(null);

  // Audio refs
  const spinStartAudio = useRef(null);
  const winAudio = useRef(null);
  const loseAudio = useRef(null);

  const spinWheelRef = useRef(null);

  const handleSpin = () => {
    if (spinsLeft <= 0 || isSpinning) return;

    setSpinsLeft(prev => prev - 1);
    const resultPrize = determinePrize(); // This determines the logical prize
    
    // Make sure the index passed to SpinWheel matches the determined prize consistently
    const finalPrizeIndex = getPrizeSegmentIndex(resultPrize); 

    if (spinStartAudio.current) {
        spinStartAudio.current.currentTime = 0;
        spinStartAudio.current.play().catch(e => console.error("Error playing spin start sound:", e));
    }
    
    // Pass the index to the spin function
    spinWheelRef.current.spin(finalPrizeIndex);
  };

  const handleSpinEnd = (prizeNameFromWheel) => { // prizeNameFromWheel is what the wheel *actually* landed on
    setIsSpinning(false);

    // Set the wonPrize state based on what the wheel reported back
    setWonPrize(prizeNameFromWheel);

    if (prizeNameFromWheel !== "Try Again") {
      setShowPrizeModal(true);
      if (winAudio.current) {
          winAudio.current.currentTime = 0;
          winAudio.current.play().catch(e => console.error("Error playing win sound:", e));
      }
    } else {
      setShowNothingWonModal(true); // Show the "Nothing Won" modal
      if (loseAudio.current) {
          loseAudio.current.currentTime = 0;
          loseAudio.current.play().catch(e => console.error("Error playing lose sound:", e));
      }
    }
  };

  const handleShareForSpin = () => {
    const APP_URL = window.location.origin;
    const message = `I just got a free spin on Spin Win Pro! Join the fun: ${APP_URL}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    
    setSpinsLeft(prev => prev + 1);
    alert("Great! You've received 1 free spin. Go back and try your luck!");
  };

  const handlePrizeModalClose = () => {
    setShowPrizeModal(false);
    setWonPrize(null); // Clear won prize
    alert("Your reward request has been submitted! Please allow some time for processing.");
  };

  const handleNothingWonModalClose = () => {
    setShowNothingWonModal(false);
    setWonPrize(null); // Clear won prize
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-background font-inter">
      <Header />

      <main className="flex flex-col items-center p-4 w-full max-w-screen-xl mx-auto flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {/* Left Column (or top on mobile) */}
          <div className="flex flex-col items-center justify-start py-8 space-y-8 order-2 md:order-1">
            <LiveSpinCounter />
            <Leaderboard />
          </div>

          {/* Center Column (Main Game) */}
          <div className="flex flex-col items-center col-span-1 md:col-span-1 order-1 md:order-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6 mt-4 text-center">
              Spin to Win!
            </h2>
            <SpinWheel
              ref={spinWheelRef}
              onSpinEnd={handleSpinEnd}
              isSpinning={isSpinning}
              setIsSpinning={setIsSpinning}
            />
            <SpinCounter spinsLeft={spinsLeft} />
            <ActionButton
              spinsLeft={spinsLeft}
              isSpinning={isSpinning}
              onSpin={handleSpin}
              onShareForSpin={handleShareForSpin}
            />
          </div>

          {/* Right Column (or bottom on mobile) - Placeholder for future content or empty */}
          <div className="hidden md:flex flex-col items-center justify-start py-8 space-y-8 order-3">
             {/* Can add ads, instructions, or other content here */}
          </div>
        </div>
      </main>

      <Footer />

      {/* Modals */}
      {showPrizeModal && wonPrize && (
        <PrizeModal
          prize={wonPrize}
          onClose={handlePrizeModalClose}
        />
      )}

      {showNothingWonModal && ( // Render NothingWonModal based on its state
        <NothingWonModal
          onClose={handleNothingWonModalClose}
        />
      )}

      {/* Hidden Audio Elements */}
      <audio ref={spinStartAudio} src="/sounds/spin_start.mp3" preload="auto"></audio>
      <audio ref={winAudio} src="/sounds/win_sound.mp3" preload="auto"></audio>
      <audio ref={loseAudio} src="/sounds/lose_sound.mp3" preload="auto"></audio>
    </div>
  );
}

export default App;