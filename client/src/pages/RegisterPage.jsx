// RegisterPage.js
import React, { useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import { useForm, Controller } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { loginUser } from '../slices/userSlice';

const RegisterPage = () => {
  const { control, handleSubmit, setError, formState: { errors }, clearErrors } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerUser, { loading }] = useRegisterUserMutation();
  const { userDetails } = useSelector((state) => state.user);
  const { search } = useLocation();
  const targetPage = new URLSearchParams(search).get('targetPage') || '/menu';

  useEffect(() => {
    if (userDetails) {
      navigate(targetPage);
    }
  }, [userDetails, targetPage, navigate]);

  const onSubmit = async (data) => {
    try {

      if (data.password !== data.confirmPassword) {
        setError("confirmPassword", {
          type: "manual",
          message: "Passwords do not match",
        });
        return;
      }
      
      const response = await registerUser(data).unwrap();
      //console.log('Server Response:', response);
      dispatch(loginUser({ ...response }));
  
      // Check if the form is valid before redirecting
      if (response && response.success) {
        navigate(targetPage);
      }
    } catch (error) {
      if (error?.data && error?.data?.errors) {
        // Clear existing errors
        Object.keys(errors).forEach((field) => {
          clearErrors(field);
        });
  
        // Set new errors
        error?.data?.errors.forEach(({ path, msg }) => {
          setError(path, { type: 'manual', message: msg });
        });
      } else {
        toast.error(
          error?.data?.message || error.error || 'An error occurred during registration.'
        );
      }
    }
  };
  
  return (
    <FormContainer logo="SuFlavours" buttonText="Sign Up" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
          Name
        </label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <div>
              <input
                {...field}
                type="text"
                className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
              />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>
          )}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Email address
        </label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <div>
              <input
                {...field}
                type="email"
                className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
              />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
          )}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
          Phone Number
        </label>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <div>
              <input
                {...field}
                type="tel"
                className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
              />
              {errors.phoneNumber && (
                <span className="text-red-500">{errors.phoneNumber.message}</span>
              )}
            </div>
          )}
        />
      </div>


      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
          Password
        </label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <div>
              <input
                {...field}
                type="password"
                className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
              />
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>
          )}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
          Confirm Password
        </label>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <div>
              <input
                {...field}
                type="password"
                className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
              />
              {errors.confirmPassword && (
                <span className="text-red-500">{errors.confirmPassword.message}</span>
              )}
            </div>
          )}
        />
      </div>

      <div className="text-sm">
        <Link to="/resetpassword" className="font-semibold text-amber-700 hover:text-orange-500">
          Forgot password?
        </Link>
      </div>

      <p className="mt-10 text-center text-sm text-black-500">
        Already have an account?{' '}
        <Link to={targetPage ? `/login?targetPage=${targetPage}`: '/login'}className="font-semibold leading-6 text-amber-700 hover:text-orange-500">
          Sign In
        </Link>
      </p>
    </FormContainer>
  );
};

export default RegisterPage;
