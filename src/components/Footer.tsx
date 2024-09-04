// src/components/Footer.tsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Texte du pied de page */}
        <p className="text-sm">&copy; 2024 MyApp. All rigths reserved.</p>

      
      </div>
    </footer>
  );
};

export default Footer;
