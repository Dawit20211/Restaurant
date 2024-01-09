import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../slices/foodCartSlice";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("Stripe");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const foodCart = useSelector((state) => state.foodCart);
  const { deliveryAddress } = foodCart;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  useEffect(() => {
    if (!deliveryAddress) {
      navigate("/delivery");
    }
  }, [deliveryAddress, navigate]);

  return (
    <FormContainer logo="" buttonText="Continue" onSubmit={handleSubmit}>
      <div className="mb-4">
        <div className="text-3xl font-thin text-center p-4">Payment Method</div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Select Method
        </label>
        <div className="mt-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-blue-500"
              value="Stripe"
              checked={paymentMethod === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="ml-2">Stripe</span>
          </label>
        </div>
      </div>
    </FormContainer>
  );
};

export default PaymentPage;
