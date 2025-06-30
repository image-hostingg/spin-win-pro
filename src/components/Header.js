// src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="w-full py-4 bg-primary shadow-lg rounded-b-xl">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-accent tracking-wider">
          Spin Win Pro
        </h1>
        <p className="text-white text-lg mt-2 hidden sm:block">Spin the wheel, win big!</p>
      </div>
    </header>
  );
};

export default Header;