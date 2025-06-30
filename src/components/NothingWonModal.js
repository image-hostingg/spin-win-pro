// src/components/NothingWonModal.js
import React, { useEffect } from 'react';

const NothingWonModal = ({ onClose }) => {
  // Optional: Add a brief timeout before closing automatically, or let user close
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2500); // Closes after 2.5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        <p className="text-6xl mb-4 animate-bounce-in">😞</p> {/* Sad emoji */}
        <h2 className="text-3xl font-extrabold text-danger mb-4">Better Luck Next Time!</h2>
        <p className="text-lg text-text mb-6">
          Don't worry, you can try again!
        </p>
        <button
          onClick={onClose}
          className="bg-primary hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-xl shadow-md text-xl w-full transition-all duration-300 transform hover:scale-105"
        >
          Spin Again
        </button>
      </div>
    </div>
  );
};

export default NothingWonModal;