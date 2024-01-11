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
import ListOfOrdersPage from "./pages/AdminPages/ListOfOrdersPage";

function App() {
  return (
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
              <Route path="listorders" element={<ListOfOrdersPage />} />
              <Route path="listmenu" element={<ListMenu/>} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
