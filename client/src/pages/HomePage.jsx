import React from 'react';
import { Link } from 'react-router-dom';
import sushi from '../Assets/sushi.jpg';

const HomePage = () => {
  const backgroundImageStyle = {
    backgroundImage: `url(${sushi})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white" style={{ ...backgroundImageStyle}}>
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-t">Welcome to SuFlavours</h1>
      <p className="text-lg mb-8">Discover a world of delicious flavors.</p>
      <Link to="/menu" className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition duration-300">
        Explore Our Menu
      </Link>
    </div>
  );
};

export default HomePage;
