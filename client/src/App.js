import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Menu from './pages/MenuPage';
import Home from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
      <Navbar /> 
        <div className="flex-grow">
          <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/menu" element={<Menu/>} />  
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App