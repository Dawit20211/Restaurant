import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full text-sm font-medium text-amber shadow-md  bg-black">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div>
          <Link to="/" className="text-white text-2xl font-light">
            SuFlavours
          </Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/contact" className="text-white font-bold flex items-center mt-4">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white font-bold flex items-center mt-4">
              About
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-white font-bold flex items-center mt-4">
              Sign In
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
