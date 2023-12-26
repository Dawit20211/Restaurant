import React from 'react';

const Menu = ({ item }) => {
  return (
    <div className=' p-4 rounded-md shadow-md mx-3 my-3 bg-black'>
      <img src={item.image} alt={item.name} className='w-full h-32 object-cover mb-4 rounded-md' />
      <h3 className='text-lg font-semibold text-white'>{item.name}</h3>
      <p className='text-gray-200 '>{item.description}</p>
      <div className='flex items-center justify-between mt-2'>
        <span className='text-white font-bold'>{`£${item.price.toFixed(2)}`}</span>
        <div className='flex items-center'>
          <span className='mr-2'>{`Rating: ${item.rating.toFixed(1)}`}</span>
          <span>{`Reviews: ${item.numReviews}`}</span>
        </div>
      </div>
    </div>
  );
};

export default Menu;
