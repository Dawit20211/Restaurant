import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveDeliveryAddress } from '../slices/foodCartSlice';
import FormContainer from '../components/FormContainer';

const DeliveryPage = () => {

    const { handleSubmit, register, setValue} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    // Use useSelector to get the delivery address from the Redux store
    const deliveryAddress = useSelector((state) => state.foodCart.deliveryAddress);
  
    useEffect(() => {
      // If there's a delivery address in the Redux store, set the form values
      if (deliveryAddress) {
        Object.keys(deliveryAddress).forEach((key) => {
          setValue(key, deliveryAddress[key]);
        });
      }
    }, [deliveryAddress, setValue]);
  
    const onSubmit = (data) => {
      dispatch(saveDeliveryAddress(data));
      localStorage.setItem('deliveryAddress', JSON.stringify(data));
      navigate('/payment');
    };
  
  return (
    <FormContainer logo="SuFlavours" buttonText="Proceed" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="text-3xl text-center font-thin text p-2">Delivery Information</div>
        <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
          Address
        </label>
        <div className="mt-2">
          <input
            id="address"
            type="text"
            {...register('address', { required: 'Address is required' })}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label htmlFor="postcode" className="block text-sm font-medium leading-6 text-gray-900">
          Post code
        </label>
        <div className="mt-2">
          <input
            id="postcode"
            type="text"
            {...register('postCode', { required: 'Post code is required' })}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
          City
        </label>
        <div className="mt-2">
          <input
            id="city"
            type="text"
            {...register('city', { required: 'City is required' })}
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
            type="text"
            {...register('phoneNumber', { required: 'Phone Number is required' })}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </FormContainer>
  );
};

export default DeliveryPage;
