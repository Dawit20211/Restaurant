import { Link } from 'react-router-dom';


const Navbar = () => {

  return (
    <nav className="w-full text-sm font-medium bg-white shadow-md">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div>
          <Link to="/" className="text-black text-2xl font-bold">
            <img
              
              alt="logo"
              className="m-3 max-w-[150px] h-auto"
              style={{ maxHeight: '80px' }}
            />
          </Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/contact" className="text-black font-bold flex items-center mt-4">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-black font-bold flex items-center mt-4">
        
              About
            </Link>
          </li>
      
            <li>
              <Link to="/login" className="text-black font-bold flex items-center mt-4">
               
                Sign In
              </Link>
            </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
