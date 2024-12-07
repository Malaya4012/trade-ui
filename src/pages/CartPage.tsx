import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../styles/Cart.css';

// Assuming CartItem type is already defined in your code
interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

const CartPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems: CartItem[] = location.state?.cartItems || [];

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(price);

  return (
    <div className="cart-page">
      <header className="cart-header">
        <h1>Your Cart</h1>
        <button onClick={() => navigate("/")} className="back-button">Back to Shop</button>
      </header>

      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div>
                <h5>{item.title}</h5>
                <p>Price: {formatPrice(item.price)}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="proceed-to-payment">Proceed to Payment</button>
    </div>
  );
};

export default CartPage;
