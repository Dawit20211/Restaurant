import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useCreateAnOrderMutation } from '../slices/ordersApiSlice';
import { clearFoodCartItems } from '../slices/foodCartSlice'
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const CheckoutPage = () => {

    const dispatch = useDispatch();
    const navigate =  useNavigate();

    const { deliveryAddress, paymentMethod } = useSelector((state) => state.foodCart);

useEffect(() => {
  if (!deliveryAddress.address) {
    navigate('/delivery');
  } else if (!paymentMethod) {
    navigate('/payment');
  }
}, [deliveryAddress.address, paymentMethod, navigate]);

const foodCart = useSelector((state) => state.foodCart);
const [createAnOrder, { isLoading, error }] = useCreateAnOrderMutation();

const HandelPlaceOrder = async () =>{
    try {
       const res = await createAnOrder({
        orderItems: foodCart.foodCartItems,
        paymentMethod: foodCart.paymentMethod,
        deliveryAddress: foodCart.deliveryAddress,
        deliveryPrice: foodCart.deliveryPrice,
        itemsPrice: foodCart.itemsPrice,
        taxPrice: foodCart.taxPrice,
        totalPrice: foodCart.totalPrice,
        }).unwrap();

        dispatch(clearFoodCartItems());
        navigate(`/order/${res._id}`);
      } catch (err) {
        console.error("Error creating order:", err);

        toast.error(err);
    }
}

return (
      <div className="flex flex-col md:flex-row p-8">
        <div className="md:w-2/3 mx-2">
          <div className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-2xl font-bold mb-4">Deliver To : </h2>
            <p className="mb-2">
              <strong>Address:</strong>{' '}
              {`${foodCart.deliveryAddress.address}, ${foodCart.deliveryAddress.city} ${foodCart.deliveryAddress.postCode}, ${foodCart.deliveryAddress.city}`}
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
            <p>
              
              {foodCart.paymentMethod}
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-bold mb-4"> Orders </h2>
            {foodCart.foodCartItems.length === 0 ? (
            <div> Your Basket Is Empty</div>
            ) : (
              <ul className="list-none p-0 m-0">
                {foodCart.foodCartItems.map((item, index) => (
                  <li key={index} className="border-b border-gray-300 py-4">
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded mr-4"
                      />
                      <div className="flex-1">
                        <Link to={`/menu/${item._id}`}className="font-bold">
                          {item.name}
                        </Link>
                        <p>
                        {item.quantity} x £{item.price} = £
                        {(item.quantity * (item.price * 100))/100}
                        </p> 
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="md:w-1/3 mx-2">
          <div className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Items</span>
              <span>£{foodCart.itemsPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span> Delivery Fee </span>
              <span>£{foodCart.deliveryPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span> Service Charge </span>
              <span>£{foodCart.taxPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Total</span>
              <span>£{foodCart.totalPrice}</span>
            </div>
            {error &&  error.data.message }
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <Button
              type='button'
              className='bg-black text-white '
              disabled={foodCart.foodCartItems === 0}
              onClick={HandelPlaceOrder}
            >
              Place Order
            </Button>
            {isLoading }
          </div>
        </div>
      </div>
  );
};

export default CheckoutPage