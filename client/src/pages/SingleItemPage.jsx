import { Link } from "react-router-dom";
import { useGetMenuQuery } from "../slices/menusApiSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Rating from "../components/Rating";
import { useDispatch } from "react-redux";
import { addToFoodCart } from "../slices/foodCartSlice";
import Button from "../components/Button";

//import Message from '../components/Message';

const SingleItemPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id: menuId } = useParams();
  const { data: menu, isLoading, error } = useGetMenuQuery(menuId);

  const [quantity, setQuantity] = useState(1);

  const addToFoodCartHandler = () => {
    dispatch(addToFoodCart({ ...menu, quantity }));
    navigate("/foodcart");
  };

  return (
    <div className="container mx-auto my-8">
      <div className="p-3 mr-">
        <Link to="/menu" className="text-white bg-black py-2 px-4 rounded mt-4">
          Back
        </Link>
      </div>

      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div>{error.data.message || error.error}</div>
      ) : (
        <div className="flex flex-col md:flex-row gap-28">
          <div className="md:w-1/2">
            <img
              src={menu.image}
              alt={menu.name}
              className="w-full h-auto object-cover rounded-lg mb-4 md:mb-0"
              style={{ maxHeight: "300px" }} // Set a consistent height
            />
          </div>

          <div className="md:w-1/2">
            <h3 className="text-3xl font-bold text-black mb-4">{menu.name}</h3>
            <p className="text-black mb-4">{menu.description}</p>
            <div>
              <Rating value={menu.rating} text={`${menu.numReviews} reviews`} />
            </div>

            <div className="flex items-center mb-4">
              <span className="text-black font-bold text-lg">{`£${menu.price.toFixed(
                2
              )}`}</span>
              {menu.isAvailable ? (
                <span className="text-balck-500 ml-2"> Available </span>
              ) : (
                <span className="text-black-500 ml-2"> Not Available </span>
              )}
            </div>
            {menu.isAvailable && (
              <div className="flex items-center">
                <div className="mr-2">Quantity</div>
                <div>
                  <select
                    className="border rounded py-1 px-2"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            <Button
              className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 mt-3"
              disabled={!menu.isAvailable}
              onClick={addToFoodCartHandler}
            >
              Add To Basket
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleItemPage;
