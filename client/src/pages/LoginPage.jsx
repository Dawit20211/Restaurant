import FormContainer from '../components/FormContainer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../slices/userApiSlice'
import { loginUser } from '../slices/userSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster, toast } from 'sonner'

const LoginPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password,  setPassword] = useState('');

  const [login, {loading}] = useLoginMutation();
  const {userDetails} = useSelector((state) => state.user)

  const { search } = useLocation();
  const targetPage = new URLSearchParams(search).get('targetPage') || '/menu';

  useEffect(() =>{
    if(userDetails){
      navigate(targetPage)
    }
  }, [userDetails, targetPage, navigate])

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login({email, password}).unwrap();
      dispatch(loginUser({...response, }))
      navigate(targetPage);
    } catch (error) {
      toast.error(error?.data?.message || error.error,{
        position: 'top-center'
        
      })
    }
  };

  return (
    <FormContainer logo= "SuFlavours" buttonText="Sign In" onSubmit={handleLogin}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            type="email"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
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
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="text-sm">
        <Link to= "/resetpassword" className="font-semibold text-amber-700 hover:text-orange-500">
          Forgot password?
        </Link>
      </div>


      <p className="mt-10 text-center text-sm text-black-500">
        New User? {" "}
        <Link to={targetPage ?  `/register?targetPage=${targetPage}` : '/register'} className="font-semibold leading-6 text-amber-700 hover:text-orange-500">
        Sign Up
        </Link>
      </p>
    </FormContainer>
  );
};

export default LoginPage;
