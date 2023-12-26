import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full text-sm font-medium text-amber shadow-md  bg-black">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div>
        <Link to="/" className="font-thin text-2xl hover:bg-orange-500 transition duration-300">
            <span style={{ color: 'orange' }}>S</span>
            <span style={{ color: 'white' }}>u</span>
            <span style={{ color: 'orange' }}>F</span>
            <span style={{ color: 'white' }}>l</span>
            <span style={{ color: 'white' }}>avours</span>
          </Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/contact" className="text-white font-thin flex items-center mt-4 hover:bg-orange-500 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white font-thin flex items-center mt-4 hover:bg-orange-500 transition duration-300">
              About
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-white font-thin flex items-center mt-4 hover:bg-orange-500 transition duration-300">
              Sign In
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
