import React, { useEffect, useState } from "react";
import { useUpdateProfileMutation } from "../slices/usersApiSlice";
import { loginUser } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import FormContainer from "../components/FormContainer";
import { useGetAllMyOrdersQuery } from "../slices/ordersApiSlice";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [updateProfile] = useUpdateProfileMutation();
  const { data: order, isLoading, isError } = useGetAllMyOrdersQuery();
  console.log(order);

  const { userDetails } = useSelector((state) => state.user);

  useEffect(() => {
    if (userDetails) setEmail(userDetails.email);
    setName(userDetails.name);
    setPhoneNumber(userDetails.phoneNumber);
  }, [
    userDetails,
    userDetails.name,
    userDetails.email,
    userDetails.phoneNumber,
  ]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password does not match");
    } else {
      try {
        const response = await updateProfile({
          id: userDetails._id,
          name,
          email,
          phoneNumber,
          password,
        }).unwrap();
        dispatch(loginUser(response));
      } catch (error) {
        toast.error(error.data?.message || error.error);
      }
    }
  };

  return (
    <div>
      <FormContainer logo="" buttonText="Update Profile" onSubmit={onSubmit}>
        <div className="text-3xl text-orange-500 text-center font-extralight">
          Profile
        </div> 
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-900"
          >
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900"
          >
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-900"
          >
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full rounded-md border px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            type= "password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-900"
          >
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-md border px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </FormContainer>

      <div className="w-full md:w-1/2 lg:w-2/3 mt-8 mx-auto mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-center">My Orders</h2>
          {isLoading ? (
            <p>Loading orders...</p>
          ) : isError ? (
            <p></p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="py-2 border border-orange-300">ID</th>
                  <th className="py-2 border border-orange-300">DATE</th>
                  <th className="py-2 border border-orange-300">TOTAL</th>
                  <th className="py-2 border border-orange-300"></th> 
                </tr>
              </thead>
              <tbody>
                {order.map((order) => (
                  <tr key={order._id}>
                    <td className="py-2 border border-orange-300">{order._id}</td>
                    <td className="py-2 border border-orange-300">
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className="py-2 border border-orange-300">{order.totalPrice}</td>
   
                    <td className="py-2 border border-orange-300">
                      <Link to={`/order/${order._id}`}>
                      <Button className="ml-6">
                        Order Details 
                      </Button>
                      </Link>
                    </td> 
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
