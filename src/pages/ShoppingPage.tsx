import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/ShoppingPage.css'; // Ensure the CSS file is linked properly
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Define types for products and cart items
interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface CartItem extends Product {
  quantity: number;
}

const ShoppingPage: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState<number>(0);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");


  const handleCartButtonClick = () => {
    navigate("/cart", { state: { cartItems } });
  };



  // Format price to INR currency
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(price);

  // Fetch categories and products on component mount
  useEffect(() => {
    axios.get<string[]>("https://fakestoreapi.com/products/categories").then((response) => {
      response.data.unshift("all");
      setCategories(response.data);
    });
    axios.get<Product[]>("https://fakestoreapi.com/products").then((response) => setProducts(response.data));
  }, []);

  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    const url =
      category === "all"
        ? "https://fakestoreapi.com/products"
        : `https://fakestoreapi.com/products/category/${category}`;
    axios.get<Product[]>(url).then((response) => setProducts(response.data));
  };

  // Add product to cart
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    const productId = parseInt(e.currentTarget.value, 10);
    axios.get<Product>(`https://fakestoreapi.com/products/${productId}`).then((response) => {
      const product = response.data;
      setCartItems((prevItems) => {
        const itemIndex = prevItems.findIndex((item) => item.id === product.id);
        if (itemIndex >= 0) {
          const updatedItems = [...prevItems];
          updatedItems[itemIndex].quantity += 1;
          return updatedItems;
        } else {
          return [...prevItems, { ...product, quantity: 1 }];
        }
      });
      setCartCount((prevCount) => prevCount + 1);
    });
  };

  // Remove item from cart
  const handleRemoveItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    const index = parseInt(e.currentTarget.value, 10);
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      const item = updatedItems[index];
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        updatedItems.splice(index, 1);
      }
      return updatedItems;
    });
    setCartCount((prevCount) => prevCount - 1);
  };

  // Handle login
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage("Login successful!");
    setShowLoginModal(false);
  };

  // Handle registration
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage("Registration successful!");
    setShowRegisterModal(false);
  };



  return (
    <div className="shopping-container">
      {/* Header */}
      <header className="header-one">
        <div className="logo-one">
          <h3>Shopper</h3>
        </div>
        <div className="nav-links">
          <span>Home</span>
          <span>Electronics</span>
          <span>Jewelry</span>
          <span>Men's Clothing</span>
          <span>Women's Clothing</span>
        </div>
        <div className="auth-buttons">
          <button onClick={() => setShowLoginModal(true)} className="auth-button">Sign In</button>
          <button onClick={handleCartButtonClick} className="cart-button">
            Your Cart <span className="cart-count">{cartItems.length}</span>
          </button>
        </div>
      </header>

      {/* Success Message */}
      {successMessage && (
        <div className="success-message">
          <strong>{successMessage}</strong>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-one">
          <div className="modal-content-one">
            <div className="modal-header-one">
              <h5>Login</h5>
              <button onClick={() => setShowLoginModal(false)} className="close-modal-one">×</button>
            </div>
            <form onSubmit={handleLogin}>
              <input type="text" placeholder="Username" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Login</button>
            </form>
            <button onClick={() => { setShowLoginModal(false); setShowRegisterModal(true); }}>Don't have an account? Register</button>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="modal-one">
          <div className="modal-content-one">
            <div className="modal-header-one">
              <h5>Register</h5>
              <button onClick={() => setShowRegisterModal(false)} className="close-modal-one">×</button>
            </div>
            <form onSubmit={handleRegister}>
              <input type="text" placeholder="Username" required />
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Register</button>
            </form>
            <button onClick={() => { setShowRegisterModal(false); setShowLoginModal(true); }}>Already have an account? Login</button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="main-content-two">
        {/* Left Sidebar */}
        <nav className="sidebar-two">
          <label>Category</label>
          <select onChange={handleCategoryChange}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.toUpperCase()}
              </option>
            ))}
          </select>
        </nav>

        {/* Product Listing */}
        {!showCart && (
          <main className="product-listing">
            {
              products.map((product) => (
                <div key={product.id} className="product-card">
                  <Link to={`/product/${product.id}`} className="product-link">
                    <img src={product.image} alt={product.title} className="product-image" />
                    <div className="product-info">
                      <h5>{product.title}</h5>
                      <div className="rating">
                        {Array.from({ length: 5 }, (_, index) => (
                          <span
                            key={index}
                            className={index < Math.round(product.rating.rate) ? "star filled" : "star"}
                          >
                            ★
                          </span>
                        ))}
                        <span className="rating-count">({product.rating.count})</span>
                      </div>
                      <p>{formatPrice(product.price)}</p>
                    </div>
                  </Link>
                  <button onClick={handleAddToCart} value={product.id} className="add-to-cart-button">
                    Add to Cart
                  </button>
                </div>
              ))}
          </main>
        )}


      </section>
    </div>
  );
};

export default ShoppingPage;
