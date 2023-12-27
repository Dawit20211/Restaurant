import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetMenuQuery } from '../slices/menusApiSlice';
import { useParams, useNavigate} from 'react-router-dom'
import Rating from '../components/Rating';

const SingleItemPage = () => {
  const { id: menuId } = useParams();
  const { data: menu, isLoading, error } = useGetMenuQuery(menuId);
  
  const navigate = useNavigate();
  const addToCartHandler = () => {

  };

  return (
    <div className="container mx-auto my-8">
      <Link to="/menu" className="text-white bg-black py-2 px-4 mb-4 inline-block">
        Back
      </Link>

      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div className="text-red-500">{error?.data?.message || error.error}</div>
      ) : (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/2">
            <img src={menu.image} alt={menu.name} className="w-full h-auto object-cover" />
          </div>

          <div className="md:w-1/2">
            <h3 className="text-3xl font-bold text-black mb-4">{menu.name}</h3>
            <p className="text-black mb-4">{menu.description}</p>
            
            <div>
            <Rating value={menu.rating} text={`${menu.numReviews} reviews`}/>
            </div>

            <div className="flex items-center mb-4">
              <span className="text-black font-bold text-lg">{`£${menu.price.toFixed(2)}`}</span>
              {menu.isAvailable ? (
                <span className="text-balck-500 ml-2">In Stock</span>
              ) : (
                <span className="text-black-500 ml-2">Out Of Stock </span>
              )}
            </div>
             
            <button
              className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
              disabled={!menu.isAvailable}
              onClick={addToCartHandler}
            >
              Add To Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleItemPage;