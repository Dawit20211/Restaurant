import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Menu from './pages/MenuPage';
import Home from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SingleItemPage from './pages/SingleItemPage';
import FoodCartPage from './pages/FoodCartPage';
import About from './pages/AboutPage';
import DeliveryPage from './pages/DeliveryPage';
import PrivateRoutes from './components/PrivateRoutes';
import PaymentPage from './pages/PaymentPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
      <Navbar/> 
        <div className="flex-grow">
          <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/menu" element={<Menu/>} />  
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/menu/:id" element={<SingleItemPage/>} />
          <Route path='/foodcart' element={<FoodCartPage/>}/>
          <Route path='/about' element={<About/>}/>

          <Route path='' element={<PrivateRoutes/>}>
          <Route path="/delivery" element={<DeliveryPage />} />   
          <Route path="/payment" element={<PaymentPage/>} />    
 
          </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App