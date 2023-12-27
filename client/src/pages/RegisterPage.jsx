import FormContainer from '../components/FormContainer';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const handleRegister = async (e) => {
    e.preventDefault();
};

  return (
    
    <FormContainer logo="SuFlavours" buttonText="Sign Up" onSubmit={handleRegister}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
          Name
        </label>
        <div className="mt-2">
          <input
            id="name"
            name="name"
            type="text"
            onChange={(e) => e.target.value}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            onChange={(e) => e.target.value}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
          Phone Number
        </label>
        <div className="mt-2">
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            onChange={(e) => e.target.value}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
          Password
        </label>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            onChange={(e) => e.target.value}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="text-sm">
        <Link to="/resetpassword" className="font-semibold text-amber-700 hover:text-orange-500">
          Forgot password?
        </Link>
      </div>

      <p className="mt-10 text-center text-sm text-black-500">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold leading-6 text-amber-700 hover:text-orange-500">
          Sign In
        </Link>
      </p>
    </FormContainer>
  );
};

export default RegisterPage;
