import Menu from '../components/Menu';
import Message from '../components/Message';
import { useState } from 'react';
import { useGetMneusQuery } from '../slices/menusApiSlice';


const MenuPage = () => {
  
  const { data : menu, isLoading, error} = useGetMneusQuery();
  return (
    <>
    {isLoading  ? (<h2>Loading...</h2>) : error ? ( <div> {error.data.message || error.error} </div>)  : (<>
      <div className='mn-h-screen bg-white m-10 pt-5'>
        <h1 className='text-orange-500 font-thin text-4xl text-center mb-6 underline'> Choose From Our Finest </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-3 p-3'>
        {menu.map((menu) => (
          <div key={menu._id} className='col-span-1'>
            <Menu menu={menu} />
          </div>
        ))}
      </div>
    </div>
      </>) }
    </>
  );
};
export default MenuPage;