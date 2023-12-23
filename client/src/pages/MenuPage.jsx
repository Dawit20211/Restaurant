import axios from 'axios';
import { useEffect, useState } from 'react';
import MenuItem from '../components/MenuItem';

const MenuPage = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/menu');
        setMenu(data);
      } catch (error) {
        console.log('Error response:', error.response);
      }
    };
    fetchMenu();
  }, []);

  return (
    <div className='bg-white'>
      <h1 className='text-black p-4 font-bold'>Our Delicious Menu</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {menu.map((item) => (
          <div key={item._id} className='col-span-1'>
            <MenuItem item={item} />
          </div>
        ))}
      </div>
      </div> 
  );
};
export default MenuPage;