import React from 'react'
import MENU from './components/menu';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
   
        <div className="flex-grow">
          <Routes>
          <Route path="/" element={<MENU/>} />
        
          </Routes>
        </div>but if 
       
      </div>
    </Router>
  );
}

export default App