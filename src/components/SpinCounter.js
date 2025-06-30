// src/components/SpinCounter.js
import React from 'react';

const SpinCounter = ({ spinsLeft }) => {
  return (
    <div className="bg-secondary p-3 rounded-lg shadow-md text-white font-semibold text-lg sm:text-xl flex items-center justify-center space-x-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 0020 13a8 8 0 01-8 8h-1c-1.33 0-2.592-.486-3.56-1.341M12 2v5h.582m15.356 2A8.001 8.001 0 0020 13a8 8 0 01-8 8h-1c-1.33 0-2.592-.486-3.56-1.341m0-7.915a7.99 7.99 0 01-.89 3.655M22 12h-2.54a4 4 0 01-.36-1.07l-1.03-2.6A4 4 0 0014.885 9H11m8.582 0l1.35 2.596M4 12h2.54a4 4 0 00.36 1.07l1.03 2.6A4 4 0 009.115 15H12m-8.582 0L2.1 12.404" />
      </svg>
      <span>Spins Left: {spinsLeft}/5</span>
    </div>
  );
};

export default SpinCounter;