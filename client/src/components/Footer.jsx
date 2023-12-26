import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-orange-500 to-black text-white py-12">
      <div className="container mx-auto text-center">
        <p className="text-2xl font-bold mb-2">
          <Link to="/" className="font-light">
            <span style={{ color: 'white' }}>S</span>
            <span style={{ color: 'white' }}>u</span>
            <span style={{ color: 'white' }}>F</span>
            <span style={{ color: 'white' }}>l</span>
            <span style={{ color: 'white' }}>avours</span>
          </Link>
        </p>
        <p className="text-sm mb-4">Land of Sushi </p> 
        <p className="text-xs">123 Sushi Street, Plymouth PL1 1PZ</p>
        <p className="text-xs mb-4">Phone: (+44) 123-4567 | Email: info@suflavours.com</p>
        <div className="border-t border-white mt-4 pt-4">
          <p className="text-xs">&copy; {currentYear} SuFlavours. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
