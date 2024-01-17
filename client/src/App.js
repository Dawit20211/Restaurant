import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./pages/MenuPage";
import Home from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SingleItemPage from "./pages/SingleItemPage";
import FoodCartPage from "./pages/FoodCartPage";
import About from "./pages/AboutPage";
import DeliveryPage from "./pages/DeliveryPage";
import PrivateRoutes from "./components/PrivateRoutes";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import ProfilePage from "./pages/ProfilePage";
import OrderPage from "./pages/OrderPage";
import AdminRoutes from "./components/AdminRoutes";
import ListMenu from "./pages/AdminPages/ListMenu";
import EditMenu from "./pages/AdminPages/EditMenu";
import EditUser from "./pages/AdminPages/EditUser";
import ListAllUsers from "./pages/AdminPages/ListAllUsers";
import ListOfOrders from "./pages/AdminPages/ListOfOrders";

import { useEffect, useState } from "react";
import io from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import SocketContext from "./SocketContext";

function App() {
  const [socket, setSocket] = useState(null);

  const { userDetails } = useSelector((state) => state.user);

  // Establish a socket connection to the server when the component mounts or when the userDetails change
  useEffect(() => {
    const newSocket = io("http://10.86.76.82:8000", {
      query: {
        user: JSON.stringify(userDetails),
      },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    // Listen for adminNotification events and display a toast with the received message
    newSocket.on("adminNotification", (message) => {
      toast.info(message);
    });

    return () => newSocket.close();
  }, [userDetails]);

  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/menu/:id" element={<SingleItemPage />} />
              <Route path="/foodcart" element={<FoodCartPage />} />
              <Route path="/about" element={<About />} />

              {/* these routes below are the protected routes */}
              <Route path="" element={<PrivateRoutes />}>
                <Route path="/delivery" element={<DeliveryPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order/:id" element={<OrderPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>

              {/* these routes below are the Admin only routes */}
              <Route path="/admin/*" element={<AdminRoutes />}>
                <Route path="listorders" element={<ListOfOrders />} />
                <Route path="listmenu" element={<ListMenu />} />
                <Route path="menu/:id/edit" element={<EditMenu />} />
                <Route path="listusers" element={<ListAllUsers />} />
                <Route path="users/:id/edit" element={<EditUser />} />
              </Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
      <ToastContainer limit={1} position="top-right" autoClose={5000} />
    </SocketContext.Provider>
  );
}
export default App;
