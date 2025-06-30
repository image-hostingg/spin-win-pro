// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-6 bg-primary mt-12 rounded-t-xl shadow-inner">
      <div className="container mx-auto px-4 text-center text-white">
        <h4 className="text-xl font-bold mb-4 text-accent">Contact Us</h4>
        <div className="text-sm space-y-1">
          <p>Email: <span className="font-semibold">support@spinwinpro.com</span></p>
          <p>Helpline: <span className="font-semibold">Not Available</span></p>
          <p>Address: <span className="font-semibold">123 Spin Lane, Win City, Nashik, Maharashtra, India</span></p>
        </div>
        <p className="mt-6 text-xs text-gray-300">
          © {new Date().getFullYear()} Spin Win Pro. All rights reserved.
          <br/>
          (This is a simulated application for demonstration purposes. No real money or data is involved.)
        </p>
      </div>
    </footer>
  );
};

export default Footer;