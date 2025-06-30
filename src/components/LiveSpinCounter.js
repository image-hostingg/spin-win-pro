// src/components/LiveSpinCounter.js
import React, { useState, useEffect } from 'react';

const LiveSpinCounter = () => {
  const [totalSpins, setTotalSpins] = useState(() => Math.floor(Math.random() * (50000 - 5000 + 1)) + 5000 ); // Starting value

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIncrement = Math.floor(Math.random() * 5) + 1; // 1 to 5
      setTotalSpins(prevSpins => prevSpins + randomIncrement);
    }, Math.floor(Math.random() * 3000) + 2000); // Update every 2 to 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary p-4 rounded-xl shadow-lg text-white text-center">
      <h3 className="text-xl font-bold mb-2">Total Spins Globally</h3>
      <p className="text-4xl font-extrabold text-accent">
        {totalSpins.toLocaleString()}
      </p>
    </div>
  );
};

export default LiveSpinCounter;