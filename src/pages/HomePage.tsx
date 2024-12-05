import React, { useState } from 'react';
import SignInModal from '../components/SignInModal'; // Ensure the path is correct
import SignUpModal from '../components/SignUpModal'; // Import the newly created SignUpModal
import '../styles/HomePage.css'; // Ensure the CSS file is linked properly





const HomePage: React.FC = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  

  

  const openSignInModal = () => {
    setIsSignInOpen(true);
    setIsSignUpOpen(false);
  };

  const openSignUpModal = () => {
    setIsSignUpOpen(true);
    setIsSignInOpen(false);
  };

  const closeModal = () => {
    setIsSignInOpen(false);
    setIsSignUpOpen(false);
  };
 


  return (
    <div className="home-page">
      {/* Header Section */}
      <header className="header">
  <div id="nav-belt">
    {/* Left Section */}
    <div className="nav-left">
      <div className="location">
        <span className="location-text">Delivering to Puri 752118</span>
        <span className="update-location">Update location</span>
      </div>
    </div>

    {/* Center Search Bar */}
    <div className="nav-fill">
      <form className="nav-searchbar">
        <div className="nav-search-bar">
          <select className="nav-search-dropdown">
            <option value="all">All</option>
            <option value="all">All</option>
            <option value="all">All</option>
            <option value="all">All</option>
          </select>
          <input type="text" placeholder="Search Global Trade" className="nav-input" />
          <button type="submit" className="nav-search-submit">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>
    </div>

    {/* Right Section */}
    <div className="nav-right">
    <a className="nav-link" onClick={openSignInModal}>
             Hello, Sign in
          </a>
      <a className="nav-link" href="/cart">
        Cart
      </a>
    </div>
  </div>
</header>


      {/* Modals */}
      <SignInModal isOpen={isSignInOpen} onClose={closeModal} onSignUpClick={openSignUpModal}   />
      <SignUpModal isOpen={isSignUpOpen} onClose={closeModal} onSignInClick={openSignInModal} />
      
      {/* Navigation Section */}
      <nav className="nav-menu">
        <a href="#solution">Solutions</a>
        <a href="#about">About Us</a>
        <a href="#contact">Contact</a>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Global Trade e-Solutions</h1>
          <p>
            Empowering MSMEs to trade globally with ease, through licenses, certifications,
            and market integration for success.
          </p>
          <a href="#signup" className="cta-btn">Get Started</a>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="solution-section">
        <h2>Our Solutions</h2>
        <p>Global Trade e-Solutions helps MSMEs export their products through:</p>
        <ul className="solutions-list">
          <li><i className="fas fa-certificate"></i> Product Certification</li>
          <li><i className="fas fa-bullhorn"></i> Marketing & Branding</li>
          <li><i className="fas fa-boxes"></i> Order Management</li>
          <li><i className="fas fa-truck"></i> Logistics Support</li>
        </ul>
      </section>

      {/* Success Stories Section */}
      <section className="rolling-section">
        <h2>Success Stories</h2>
        <div className="rolling-content">
          <div className="rolling-item">
            <span role="img" aria-label="star">✨</span> MSME X expanded to 10 countries with our export solutions.
          </div>
          <div className="rolling-item">
            <span role="img" aria-label="rocket">🚀</span> MSME Y increased sales by 50% in the global market.
          </div>
          <div className="rolling-item">
            <span role="img" aria-label="trophy">🏆</span> MSME Z achieved global certification in record time.
          </div>
          <div className="rolling-item">
            <span role="img" aria-label="globe">🌍</span> MSME A grew its international presence using our logistics solutions.
          </div>
        </div>
      </section>

      {/* Onboarding Section */}
      <section id="signup" className="onboarding-section">
        <h2>Join Global Trade e-Solutions Today</h2>
        <p>Sign up now to access the best export solutions for MSMEs. Scale your business globally with ease.</p>
        <div className="onboarding-steps">
          <div className="step">
            <i className="fas fa-user-plus"></i>
            <h3>Step 1: Sign Up</h3>
            <p>Create your account and provide basic business details.</p>
          </div>
          <div className="step">
            <i className="fas fa-globe"></i>
            <h3>Step 2: Get Certified</h3>
            <p>Apply for necessary licenses and certifications to start trading globally.</p>
          </div>
          <div className="step">
            <i className="fas fa-chart-line"></i>
            <h3>Step 3: Expand Globally</h3>
            <p>Use our marketing, order management, and logistics tools to scale your business.</p>
          </div>
        </div>
        
        
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Global Trade e-Solutions. All rights reserved.</p>
          <nav className="footer-nav">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms & Conditions</a>
            <a href="/contact">Contact Us</a>
          </nav>
          <div className="social-media">
            <a href="https://facebook.com"><i className="fab fa-facebook"></i></a>
            <a href="https://twitter.com"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
