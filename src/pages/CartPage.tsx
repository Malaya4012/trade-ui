import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../styles/Cart.css';

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

  // State to manage the cart items
  const [cartItems, setCartItems] = useState<CartItem[]>(location.state?.cartItems || []);
  
  
  const [showPaymentMessage, setShowPaymentMessage] = useState(false);

  // Helper function to format price
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(price);

  // Function to remove a product
  const handleRemove = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  // Function to update quantity
  const handleQuantityChange = (id: number, increment: boolean) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: increment ? item.quantity + 1 : Math.max(1, item.quantity - 1),
        };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle payment process
  const handlePayment = () => {
    setShowPaymentMessage(true);
    setTimeout(() => setShowPaymentMessage(false), 3000); // Hide the message after 3 seconds
  };

  return (
    <div className="cart-page">
      <header className="cart-header">
        <h1>Your Cart</h1>
        <button onClick={() => navigate("/shopping")} className="back-button">Back to Shop</button>
      </header>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="cart-animation"></div>
          <p>Your cart is empty!</p>
        </div>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div>
                <h5>{item.title}</h5>
                <p>Price: {formatPrice(item.price * item.quantity)}</p>
                <p>Quantity: {item.quantity}</p>
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, false)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, true)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h3>Total Price: {formatPrice(totalPrice)}</h3>
          </div>
        </div>
      )}
      <button onClick={handlePayment} className="proceed-to-payment">Proceed to Payment</button>

      {showPaymentMessage && <p className="payment-message">Payment Processed Successfully!</p>}
    </div>
  );
};

export default CartPage;
