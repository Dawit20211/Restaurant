import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToFoodCart, removeFoodFromCart } from '../slices/foodCartSlice';
import Button from "../components/Button";

const FoodCartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const foodCart = useSelector((state) => state.foodCart);
  const { foodCartItems } = foodCart;

  const addToFoodCartHandler = async (menu, quantity) => {
    dispatch(addToFoodCart({...menu, quantity}));
  };

  const removeFromFoodCartHandler = async (id) => {
    dispatch(removeFoodFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className="flex">
      <div className="w-8/12">
        {foodCartItems.length === 0 ? (
          <p>
            Your Basket is empty <Link to='/menu' className="rounded text-orange-400">Go Back To Menu</Link>
          </p>
        ) : (
          <div>
            {foodCartItems.map((item) => (
              <div key={item._id} className="border-t border-b mb-4 p-4">
                <div className="flex items-center">
                  <div className="w-1/6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full rounded"
                    />
                  </div>

                  <div className="w-2/6 flex items-center">
                    <Link to={`/menu/${item._id}`} className="underline">
                      <div className="p-3">{item.name}</div>
                    </Link>
                  </div>

                  <div className="w-1/6">£{item.price}</div>

                  <div className="flex items-center">
                      <div className="mr-2">Quantity</div>
                      <div>
                        <select
                          className="border rounded py-1 px-2"
                          value={item.quantity}
                          onChange={(e) => addToFoodCartHandler(item, Number(e.target.value))}
                        >
                          {[1, 2, 3, 4, 5, 6,].map((value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                  <div className="w-1/6">
                    <button
                      type="button"
                      onClick={() => removeFromFoodCartHandler(item._id)}
                      className="text-red-500"
                    >
                         <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-4/12">
        <div className="bg-white p-4 rounded shadow">
          <div className="mb-4">
            <h2 className="text-lg">
            Subtotal ({foodCartItems.reduce((acc, item) => acc + item.quantity, 0)}) items</h2>
            £{foodCartItems.reduce((acc,item)=> acc + item.quantity * item.price, 0)
            .toFixed(2)}
          </div>

          <div>
            <Button
              type="button"
              className="w-full bg-black text-white p-2 rounded"
              disabled={foodCartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCartPage;
