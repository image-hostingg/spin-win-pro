// src/components/ActionButton.js
import React from 'react';

const ActionButton = ({ spinsLeft, isSpinning, onSpin, onShareForSpin }) => {
  const isDisabled = isSpinning;
  const buttonText = spinsLeft > 0 ? "Spin Now" : "Get 1 Free Spin by Sharing";
  const buttonAction = spinsLeft > 0 ? onSpin : onShareForSpin;
  const buttonColorClass = spinsLeft > 0 ? "bg-accent hover:bg-yellow-500" : "bg-blue-600 hover:bg-blue-700";

  return (
    <button
      onClick={buttonAction}
      disabled={isDisabled}
      className={`
        ${buttonColorClass}
        text-white font-bold py-3 px-6 rounded-xl shadow-lg
        text-xl sm:text-2xl mt-8 w-full max-w-sm
        transition-all duration-300 transform
        ${isDisabled ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}
      `}
    >
      {buttonText}
    </button>
  );
};

export default ActionButton;