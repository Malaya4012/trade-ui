import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import SignIn from './components/SignIn'; // Import the new SignIn component
import ShoppingPage from './pages/ShoppingPage';
import CartPage from "./pages/CartPage";
import ProductDetail from "./components/ProductDetail";
import '@fortawesome/fontawesome-free/css/all.min.css';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shopping" element={<ShoppingPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        {/* Link the login route */}
      </Routes>
    </Router>
  );
};

export default App;

