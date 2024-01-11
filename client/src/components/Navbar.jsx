import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser, FaInfoCircle } from 'react-icons/fa';
import { useState } from 'react';
import { logout } from '../slices/userSlice'
import { useLogoutMutation } from '../slices/usersApiSlice';
const Navbar = () => {

  const { foodCartItems } = useSelector((state) => state.foodCart)
  const { userDetails } = useSelector((state) => state.user)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [logoutApi] = useLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);

  const toggleAdminDropdown = () => {
    setIsAdminDropdownOpen((prev) => !prev);
  };



  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const logoutHandler = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="w-full text-sm font-medium bg-black shadow-md text-amber">
    <div className="flex items-center justify-between max-w-screen-xl p-4 mx-auto">
      <div className="flex items-center">
        <Link
          to="/"
          className="text-2xl font-thin transition duration-300 hover:bg-orange-500"
        >
          <span style={{ color: 'orange' }}>S</span>
          <span style={{ color: 'white' }}>u</span>
          <span style={{ color: 'orange' }}>F</span>
          <span style={{ color: 'white' }}>l</span>
          <span style={{ color: 'white' }}>avours</span>
        </Link>
      </div>            
        <ul className="flex space-x-4">
          <li>
            <Link to="/foodcart" className="flex items-center mt-4 mr-8 font-thin text-white transition duration-300 hover:bg-orange-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          {foodCartItems.length > 0 && (
          <span className="ml-1">
            <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-orange-500 text-white">
              {foodCartItems.reduce((accumulator, current) => accumulator + current.quantity, 0)}
            </div>
          </span>
          )}
            </Link>
          </li>
          <li>
            <Link to="/about" className="flex items-center mt-4 mr-4 font-thin text-white transition duration-300 hover:bg-orange-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
              About
            </Link>
          </li>

            {userDetails ? ( <li className="relative" onClick={toggleDropdown}>
              <button className="text-white font-bold flex items-center mt-4">
                {userDetails.name} <FaUser className="ml-1" />
              </button>
              <ul
                className={`absolute right-0 mt-2 bg-white border rounded shadow-md ${
                  isDropdownOpen ? '' : 'hidden'
                }`}
              >
                <li>
                  <Link to="/profile" className="block px-4 py-2 text-black">
                    Profile
                  </Link>
                </li>
                <li>
                  <button onClick={logoutHandler} className="block px-4 py-2 text-black">
                    Logout
                  </button>
                </li>
              </ul>
            </li>) : (<li>
            <Link to="/login" className="flex items-center mt-4 ml-3 font-thin text-white transition duration-300 hover:bg-orange-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
              Sign In
            </Link>
          </li>)}
          {userDetails && userDetails.isAdmin && (
          <li className="relative" onClick={toggleAdminDropdown}>
            <button className="text-white font-bold flex items-center mt-4">
              Admin Actions <FaUser className="ml-1" />
            </button>
            {isAdminDropdownOpen && (
              <ul className="absolute right-0 mt-2 bg-white border rounded shadow-md">
                <li>
                  <Link
                    to="/admin/listorders"
                    className="block px-4 py-2 text-black"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/manageusers"
                    className="block px-4 py-2 text-black"
                  >
                    Manage Users
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/managemenu"
                    className="block px-4 py-2 text-black"
                  >
                    Manage Menu
                  </Link>
                </li>
              </ul>
            )}
          </li>
        )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
