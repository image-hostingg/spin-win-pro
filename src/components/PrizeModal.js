// src/components/PrizeModal.js
import React, { useState } from 'react'; // <-- Ensure useState is imported

const Confetti = () => (
    <>
        {Array.from({ length: 20 }).map((_, i) => (
            <div
                key={i}
                className="confetti"
                style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    backgroundColor: ['#F7B731', '#4ECDC4', '#DC3545', '#1A535C'][Math.floor(Math.random() * 4)]
                }}
            ></div>
        ))}
    </>
);

// Updated PrizeModal component to manage its own sharing/PhonePe states
const PrizeModal = ({ prize, onClose }) => { // Removed simulatedShareCount, onShareClick, onUnlockPrize
    const [simulatedShareCount, setSimulatedShareCount] = useState(0);
    const [showPhonePeInput, setShowPhonePeInput] = useState(false);
    const [phonePeNumber, setPhonePeNumber] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');

    const isSharingComplete = simulatedShareCount >= 5;
    const APP_URL = window.location.origin;

    const getShareButtonText = () => {
        if (isSharingComplete) {
            return "Sharing Complete!";
        }
        return `Share to WhatsApp (${simulatedShareCount}/5)`;
    };

    const handleShareClick = () => {
        const message = `I just won ${prize} on Spin Win Pro! Try your luck here: ${APP_URL}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
        setSimulatedShareCount(prev => prev + 1); // Increment simulated count
    };

    const handleUnlockPrizeClick = () => {
        setShowPhonePeInput(true); // Show PhonePe input section
    };

    const handlePhonePeSubmit = () => {
        if (phonePeNumber.length < 10) {
            setConfirmationMessage('Please enter a valid 10-digit number.');
            return;
        }
        setConfirmationMessage('Your request has been submitted!');
        // Call the parent's onClose which also handles the final alert
        setTimeout(() => {
            onClose(); // Call parent to close modal and trigger success alert
        }, 1500); // Show message for 1.5 seconds
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <Confetti />
            <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-lg w-full text-center relative overflow-hidden">
                <button
                    onClick={onClose} // Use onClose prop from App.js
                    className="absolute top-4 left-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-all duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>

                {!showPhonePeInput ? ( // Initial state: Show share requirements
                    <>
                        <h2 className="text-4xl font-extrabold text-success mb-4 animate-bounce-in">Congratulations!</h2>
                        <p className="text-3xl font-bold text-primary mb-6">
                            You have won <span className="text-accent">{prize}!</span>
                        </p>

                        <p className="text-lg text-text mb-6">
                            To unlock your prize, share this app with 5 WhatsApp groups.
                        </p>

                        <button
                            onClick={handleShareClick}
                            disabled={isSharingComplete}
                            className={`
                                ${isSharingComplete ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}
                                text-white font-bold py-3 px-6 rounded-xl shadow-md
                                text-xl w-full transition-all duration-300 transform mb-4
                                ${!isSharingComplete ? 'hover:scale-105' : ''}
                            `}
                        >
                            {getShareButtonText()}
                        </button>

                        <button
                            onClick={handleUnlockPrizeClick} // Now shows PhonePe input
                            disabled={!isSharingComplete}
                            className={`
                                ${!isSharingComplete ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-teal-700'}
                                text-white font-bold py-3 px-6 rounded-xl shadow-md
                                text-xl w-full transition-all duration-300 transform
                                ${isSharingComplete ? 'hover:scale-105' : ''}
                            `}
                        >
                            Unlock Prize
                        </button>
                    </>
                ) : ( // After "Unlock Prize" is clicked: Show PhonePe input
                    <>
                        <h2 className="text-3xl font-bold text-primary mb-4">Enter PhonePe Number</h2>
                        
                        <p className="text-lg text-text mb-2">
                            Enter your PhonePe number to receive your reward.
                        </p>
                        <p className="text-lg text-text mb-6 font-semibold text-gray-600">
                            अपना PhonePe नंबर दर्ज करें ताकि आपको इनाम मिल सके।
                        </p>

                        <input
                            type="tel"
                            value={phonePeNumber}
                            onChange={(e) => setPhonePeNumber(e.target.value.replace(/\D/g, '').slice(0, 10))} // Only digits, max 10
                            placeholder="e.g., 9876543210"
                            className="w-full p-3 border-2 border-gray-300 rounded-xl mb-4 text-lg focus:outline-none focus:border-accent shadow-sm"
                            maxLength="10"
                        />

                        <button
                            onClick={handlePhonePeSubmit}
                            disabled={!phonePeNumber || phonePeNumber.length !== 10}
                            className={`
                                ${(!phonePeNumber || phonePeNumber.length !== 10) ? 'bg-gray-400 cursor-not-allowed' : 'bg-success hover:bg-green-600'}
                                text-white font-bold py-3 px-6 rounded-xl shadow-md
                                text-xl w-full transition-all duration-300 transform
                                ${ (phonePeNumber && phonePeNumber.length === 10) ? 'hover:scale-105' : ''}
                            `}
                        >
                            Receive Reward
                        </button>

                        {confirmationMessage && (
                            <p className={`mt-4 text-lg font-semibold ${confirmationMessage.includes('valid') ? 'text-danger' : 'text-success'}`}>
                                {confirmationMessage}
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default PrizeModal;