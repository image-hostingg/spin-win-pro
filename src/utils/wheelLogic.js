// src/utils/wheelLogic.js

export const prizes = [
    { name: "Try Again", color: "#A0A0A0" }, // Grey
    { name: "20 Rupees", color: "#4ECDC4" }, // Light Teal
    { name: "100 Rupees", color: "#1A535C" }, // Dark Teal
    { name: "300 Rupees", color: "#F7B731" }, // Gold
    { name: "500 Rupees", color: "#DC3545" }  // Red
];

const winPrizes = ["20 Rupees", "100 Rupees", "300 Rupees", "500 Rupees"];

export const determinePrize = () => {
    const random = Math.random(); // Generates a number between 0 (inclusive) and 1 (exclusive)

    if (random < 0.7) { // If random number is less than 0.7 (i.e., 0.0 to 0.699...), this is true 70% of the time
        // 70% chance to win a prize
        const winningPrizeIndex = Math.floor(Math.random() * winPrizes.length);
        return winPrizes[winningPrizeIndex]; // Randomly select one of the winning prizes
    } else { // If random number is 0.7 or greater (i.e., 0.7 to 0.999...), this is true 30% of the time
        // 30% chance to 'Try Again'
        return "Try Again";
    }
};

export const getPrizeSegmentIndex = (prizeName) => {
    return prizes.findIndex(p => p.name === prizeName);
};