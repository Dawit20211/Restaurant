import React from 'react';

const MenuItem = ({ item }) => {
  return (
    <div className='bg-white p-4 rounded-md shadow-md'>
      <img src={item.image} alt={item.name} className='w-full h-32 object-cover mb-4 rounded-md' />
      <h3 className='text-lg font-semibold text-black'>{item.name}</h3>
      <p className='text-gray-800 '>{item.description}</p>
      <div className='flex items-center justify-between mt-2'>
        <span className='text-black font-bold'>{`£${item.price.toFixed(2)}`}</span>
        <div className='flex items-center'>
          <span className='mr-2'>{`Rating: ${item.rating.toFixed(1)}`}</span>
          <span>{`Reviews: ${item.numReviews}`}</span>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
