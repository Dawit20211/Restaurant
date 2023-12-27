import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
const Menu = ({ menu }) => {
  return (
    <div className='transform transition-transform hover:scale-105'>
      <Link to={`/menu/${menu._id}`}>
        <img src={menu.image} alt={menu.name} className='w-full h-32 object-cover mb-3 rounded-md mt-0 transform transition-transform hover:scale-105' />
      </Link>
      <Link to={`/menu/${menu._id}`}>
        <h3 className='text-lg font-semibold text-black'>{menu.name}</h3>
      </Link>
      <p className='text-gray-800 h-20 overflow-hidden'>{menu.description}</p>
      <div className='flex items-center mt-2'>
        <span className='text-black font-bold'>{`£${menu.price.toFixed(2)}`}</span>
        <div className='ml-4'>
          <Rating value={menu.rating} text={`Reviews: ${menu.numReviews}`}/>
        </div>
      </div>
    </div>
  );
};

export default Menu;
