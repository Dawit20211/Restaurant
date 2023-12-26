import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full text-sm font-medium text-amber shadow-md  bg-black">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div>
        <Link to="/" className="font-thin text-2xl hover:bg-orange-500">
            <span style={{ color: 'orange' }}>S</span>
            <span style={{ color: 'white' }}>u</span>
            <span style={{ color: 'orange' }}>F</span>
            <span style={{ color: 'white' }}>l</span>
            <span style={{ color: 'white' }}>avours</span>
          </Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/contact" className="text-white font-thin flex items-center mt-4 hover:bg-orange-500">
              Cart
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white font-thin flex items-center mt-4 hover:bg-orange-500">
              About
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-white font-thin flex items-center mt-4 hover:bg-orange-500">
              Sign In
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
