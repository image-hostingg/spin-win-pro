// src/components/PhonePeModal.js
import React, { useState } from 'react';

const PhonePeModal = ({ onReceiveReward, onBack }) => {
    const [phonePeNumber, setPhonePeNumber] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');

    const handleSubmit = () => {
        if (phonePeNumber.length < 10) {
            setConfirmationMessage('Please enter a valid 10-digit number.');
            return;
        }
        setConfirmationMessage('Your request has been submitted!');
        setTimeout(() => {
            onReceiveReward(); // Close modal after showing message
        }, 1500); // Show message for 1.5 seconds
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full text-center relative">
                <button
                    onClick={onBack}
                    className="absolute top-4 left-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-all duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>

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
                    onClick={handleSubmit}
                    disabled={!phonePeNumber || phonePeNumber.length !== 10}
                    className={`
                        ${(!phonePeNumber || phonePeNumber.length !== 10) ? 'bg-gray-400 cursor-not-allowed' : 'bg-success hover:bg-green-600'}
                        text-white font-bold py-3 px-6 rounded-xl shadow-md
                        text-xl w-full transition-all duration-300 transform
                        ${(phonePeNumber && phonePeNumber.length === 10) ? 'hover:scale-105' : ''}
                    `}
                >
                    Receive Reward
                </button>

                {confirmationMessage && (
                    <p className={`mt-4 text-lg font-semibold ${confirmationMessage.includes('valid') ? 'text-danger' : 'text-success'}`}>
                        {confirmationMessage}
                    </p>
                )}
            </div>
        </div>
    );
};

export default PhonePeModal;