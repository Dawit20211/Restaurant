import axios from 'axios';
import { useEffect, useState } from 'react';
import Menu from '../components/Menu';

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
    <div className='bg-interesting-color min-h-screen'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-3'>
        {menu.map((item) => (
          <div key={item._id} className='col-span-1'>
            <Menu item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default MenuPage;