// src/components/Leaderboard.js
import React, { useState, useEffect } from 'react';

const initialPlayers = [
  { name: "Ananya S.", winnings: 15250, mobile: "85XXXXX123" },
  { name: "Rohit P.", winnings: 12800, mobile: "99XXXXX789" },
  { name: "Priya G.", winnings: 10500, mobile: "77XXXXX456" },
  { name: "Saurabh M.", winnings: 9750, mobile: "90XXXXX012" },
  { name: "Kavita R.", winnings: 8900, mobile: "93XXXXX345" },
  { name: "Amit K.", winnings: 7200, mobile: "81XXXXX678" },
  { name: "Deepa L.", winnings: 6500, mobile: "95XXXXX901" },
  { name: "Vivek J.", winnings: 5800, mobile: "70XXXXX234" },
  { name: "Neha S.", winnings: 5100, mobile: "88XXXXX567" },
  { name: "Gaurav H.", winnings: 4500, mobile: "72XXXXX890" },
];

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Simulate slight dynamic changes on refresh
    const randomizedPlayers = initialPlayers.map(player => ({
      ...player,
      winnings: player.winnings + Math.floor((Math.random() - 0.5) * 200) // +/- 100
    }));
    setPlayers(randomizedPlayers.sort((a, b) => b.winnings - a.winnings)); // Re-sort by winnings
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full mx-auto sm:max-w-md">
      <h3 className="text-2xl font-bold text-primary mb-4 text-center">Top 10 Players</h3>
      <ul className="space-y-3">
        {players.map((player, index) => (
          <li key={index} className="flex items-center justify-between p-3 bg-background rounded-lg shadow-sm">
            <div className="flex items-center space-x-3">
              <span className="text-xl font-bold text-accent">{index + 1}.</span>
              <div>
                <p className="text-lg font-semibold text-text">{player.name}</p>
                <p className="text-sm text-gray-500">{player.mobile}</p>
              </div>
            </div>
            <p className="text-lg font-bold text-success">₹ {player.winnings.toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;