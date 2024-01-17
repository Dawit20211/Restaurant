import React from "react";
import { useGetAllOrdersQuery } from "../../slices/ordersApiSlice";
import Button from "../../components/Button";
import { Link } from "react-router-dom";


const ListOfOrdersPage = () => {
  const { data } = useGetAllOrdersQuery();
   
  console.log(data)

  if (!data) {
    return <div>Loading...</div>;
  }
  

  return (
    <div>
      <h1 className="text-center mt-5 text-3xl font-thin text-orange-500">
        Orders
      </h1>
      <table className="w-full border-collapse mb-8 mt-8 ml-4 mr-6">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-orange-300">ID</th>
            <th className="py-2 px-4 border border-orange-300">NAME</th>
            <th className="py-2 px-4 border border-orange-300">DATE</th>
            <th className="py-2 px-4 border border-orange-300">TOTAL</th>
            <th className="py-2 px-4 border border-orange-300">DELIVERED</th>
            <th className="py-2 px-4 border border-orange-300"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order._id}>
              <td className="py-2 px-4 border border-orange-300">
                {order._id}
              </td>
              <td className="py-2 px-4 border border-orange-300">
                {order.user && order.user.name}
              </td>
              <td className="py-2 px-4 border border-orange-300">
                {order.createdAt.substring(0, 10)}
              </td>
              <td className="py-2 px-4 border border-orange-300">
                {order.totalPrice}
              </td>
              <td className="py-2 px-4 border border-orange-300">
                <input
                  type="checkbox"
                  checked={order.isDelivered}
                  readOnly
                  className="m-2"
                />
              </td>
              <td className="py-2 px-4 border border-orange-300">
                <Link to={`/order/${order._id}`}>
                  <Button>Order Details</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 
export default ListOfOrdersPage;
