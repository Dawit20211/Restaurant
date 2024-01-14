import { Link, useParams } from "react-router-dom";
import {
  useGetOrderByIdQuery,
  useUpdateDeliveryMutation,
  usePayForOrderMutation,
} from "../slices/ordersApiSlice";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { useSelector } from "react-redux";
//import { usePayForOrderMutation } from '../slices/ordersApiSlice';
import StripeCheckout from "react-stripe-checkout";
import { useGetSecretIdQuery } from "../slices/ordersApiSlice";
import Button from "../components/Button";

const OrderPage = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const { userDetails } = useSelector((state) => state.user);

  const [payForOrder] = usePayForOrderMutation();

  const publishableKey =
    "pk_test_51OWiSqLUIWoGMciLmhu9Mn3MJmZre72jYqF9NqtwpP2410LK7NtemmFFgCSno9D0QR5DpHnapfV1QTy0CgbGroFm00p1nQZzwk"; // Replace with your actual Stripe publishable key

  const { id: orderId } = useParams();

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderByIdQuery(orderId);

  const [updateDelivery, { isLoading: loadDelivery }] =
    useUpdateDeliveryMutation();

  const markOrderAsDelivered = async () => {
    try {
      await updateDelivery(orderId);

      toast.success("Order delivered successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
 
  const handlePaymentSuccess = async (paymentResult) => {
    try {
      const res = await payForOrder({
        orderId: order._id,
        paymentResult: paymentResult,
      });

      if (res.data.status === "success") {
        toast.success("Payment successful");
      } else {
        toast.error("Payment failed");
      }

      setPaymentStatus("success");

      toast.success("Payment successful");

      refetch();
    } catch (error) {
      toast.error(error.message);
      setPaymentStatus("failed");
    }
  };

  const markAsDelivered = async () => {};

  return isLoading ? (
    <div>Loading...</div>
  ) : error ? (
    <>{error}</>
  ) : (
    <>
      <h1 className="text-3xl font-semibold mb-6 m-5">
        Order Number : {order._id}
      </h1>
      <div className="flex m-5">
        <div className="w-8/12 pr-4">
          <ul className="list-none p-0">
            <li className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Delivery</h2>
              <p className="mb-1">
                <strong>Name: </strong> {order.user.name}
              </p>
              <p className="mb-1">
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p className="mb-1">
                <strong>Address:</strong>
                {order.deliveryAddress.address}, {order.deliveryAddress.city}{" "}
                {order.deliveryAddress.postCode},{" "}
                {order.deliveryAddress.phoneNumber}
              </p>
              {order.isDelivered ? (
                <div>Delivered on {order.deliveredAt}</div>
              ) : (
                <div>Not Delivered</div>
              )}
            </li>

            <li className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
              <p className="mb-1">
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <div variant="success">Paid on {order.paidAt}</div>
              ) : (
                <div variant="danger">Not Paid</div>
              )}
            </li>

            <li className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Order Items</h2>
              {order.orderItems.map((item, index) => (
                <li key={index} className="mb-4">
                  <div className="flex items-center">
                    <div className="w-1/6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full rounded"
                      />
                    </div>
                    <div className="w-5/6 ml-4">
                      <Link
                        to={`/menu/${item.menu}`}
                        className="text-blue-500 hover:underline"
                      >
                        {item.name}
                      </Link>
                      <p>
                        {item.quantity} x £{item.price} = £
                        {item.quantity * item.price}
                      </p>
                    </div>
                  </div>
                </li>
              ))}

              <div className="status-message">
                {!order.isPaid && (
                  <div className="bg-red-500 p-2 mb-2 text-white rounded-lg">
                    Order is received, waiting for payment.
                  </div>
                )}

                {order.isPaid && !order.isDelivered && (
                  <div className="bg-yellow-500 p-2 mb-2 text-white rounded-lg">
                    Payment received, preparing your order.
                  </div>
                )}

                {order.isPaid && order.isDelivered && (
                  <div className="bg-green-500 p-2 mb-2 text-white rounded-lg">
                    Order delivered successfully.
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>

        <div className="w-4/12">
          <div className="border border-gray-300 p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>

            <div className="flex justify-between mb-2">
              <span>Items</span>
              <span>£{order.itemsPrice}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>£{order.deliveryPrice}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Tax</span>
              <span>£{order.taxPrice}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Total</span>
              <span>£{order.totalPrice}</span>
            </div>

            <div>
              {paymentStatus !== "success" && (
                <StripeCheckout
                  stripeKey={publishableKey}
                  label="Pay Now"
                  name="Pay With Credit Card"
                  token={handlePaymentSuccess}
                  amount={Math.round(order.totalPrice * 100)}
                  description={`Your total is £${order.totalPrice}`}
                />
              )}
              {/* {loadingStripe && <div>Loading Stripe...</div>} */}
            </div>
            <div>
              {userDetails &&
                userDetails.isAdmin &&
                !order.isPaid &&
                !order.isDelivered && (
                  <Button onClick={markOrderAsDelivered}>
                    Mark As Order Delivered
                  </Button>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
