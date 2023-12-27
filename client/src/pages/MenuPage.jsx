import Menu from '../components/Menu';
import { useGetMneusQuery } from '../slices/menusApiSlice';


const MenuPage = () => {

    const { data : menu, isLoading, error} = useGetMneusQuery();
  return (
    <>
    {isLoading  ? (<h2>Loading...</h2>) : error ? ( <div> {error.data.message || error.error} </div>)  : (<>
      <div className='mn-h-screen bg-white'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-3'>
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