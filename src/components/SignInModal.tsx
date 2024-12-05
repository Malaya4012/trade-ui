import React, { useState } from 'react';
import Modal from 'react-modal';
import '../styles/SignInModal.css';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUpClick: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, onSignUpClick }) => {
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle to show/hide password
  const [loginMessage, setLoginMessage] = useState('');
  const [otp, setOtp] = useState(''); // OTP field
   const [otpSent, setOtpSent] = useState(false); // Whether OTP was sent


   const handleOtpClick = async () => {
    setLoginMessage('');
    try {
      // Check if email is entered
      if (!email) {
        setLoginMessage('Please enter an email address.');
        return;
      }
  
      // Fetch registered users from db.json
      const response = await fetch('http://localhost:5000/users'); // Adjust URL based on your setup
      const users = await response.json();
  
      // Check if the email exists in the registered users
      const isRegistered = users.some((user: { email: string }) => user.email === email);
  
      if (!isRegistered) {
        setLoginMessage('Email not found. Please enter a registered email address.');
        return;
      }
  
      // Generate a random 6-digit OTP
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  
      // Store the OTP in db.json
      const otpResponse = await fetch('http://localhost:5000/otps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: generatedOtp, timestamp: Date.now() }),
      });
  
      if (otpResponse.ok) {
        setOtpSent(true);
  
        // Display OTP directly in the UI as a message (for development purposes)
        setLoginMessage(
          `For development purposes, your OTP is: ${generatedOtp}. This simulates email delivery.`
        );
      } else {
        setLoginMessage('Failed to generate OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error during OTP generation:', error);
      setLoginMessage('Unable to generate OTP. Please try again.');
    }
  };
  
  
  const handleOtpVerification = async () => {
    setLoginMessage('');
    try {
      // Fetch stored OTPs from db.json
      const response = await fetch('http://localhost:5000/otps');
      const otps = await response.json();
  
      // Find the matching OTP for the email
      const otpEntry = otps.find(
        (entry: { email: string; otp: string }) => entry.email === email && entry.otp === otp
      );
  
      if (otpEntry) {
        setLoginMessage('OTP verified successfully! Login Successful.');
  
        // Simulate deleting the OTP after verification
        await fetch(`http://localhost:5000/otps/${otpEntry.id}`, { method: 'DELETE' });
  
        onSignInSuccess({ email, fullName: 'User' }); // Replace 'User' with backend response if needed
        onClose();
      } else {
        setLoginMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setLoginMessage('Unable to verify OTP. Please try again.');
    }
  };
  
  

  const handlePasswordClick = () => {
    setShowPasswordField(true);
  };

  const handleLogin = async () => {
    setLoginMessage(''); // Clear previous messages
    try {
      // Fetch users from db.json
      const response = await fetch('http://localhost:5000/users'); // Update with your mock server URL
      const users = await response.json();

      // Find user matching the entered email and password
      const user = users.find(
        (user: { email: string; password: string }) =>
          user.email === email && user.password === password
      );

      if (user) {
        setLoginMessage('Login Successful!');
        console.log('Login Successful!')
        onSignInSuccess(user);
        // Reset fields
        setEmail('');
        setPassword('');
        setShowPasswordField(false);
      } else {
        setLoginMessage('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginMessage('Unable to connect to the server. Please try again later.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <button className="close-btn" onClick={onClose}>
        <i className="fas fa-times"></i>
      </button>
      <h2 className="modal-header">
        <i className="fas fa-user-circle"></i> Sign In
      </h2>

      <div className="input-group">
        <i className="fas fa-envelope input-icon"></i>
        <input
          type="email"
          placeholder="Enter your email"
          className="modal-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {!showPasswordField && (
        <div className="button-group">
          {otpSent ? (
  <>
    <div className="input-group">
      <i className="fas fa-key input-icon"></i>
      <input
        type="text"
        placeholder="Enter OTP"
        className="modal-input"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
    </div>
    <button className="modal-button" onClick={handleOtpVerification}>
      <i className="fas fa-check"></i> Verify OTP
    </button>
  </>
) : (
  <button className="modal-button" onClick={handleOtpClick}>
    <i className="fas fa-mobile-alt"></i> Send OTP
  </button>
)}

          <button className="modal-button" onClick={handlePasswordClick}>
            <i className="fas fa-key"></i> Continue with Password
          </button>
        </div>
      )}

      {showPasswordField && (
        <>
          <div className="input-group">
            <i className="fas fa-lock input-icon"></i>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="modal-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i
              className={`toggle-password fas ${
                showPassword ? 'fa-eye-slash' : 'fa-eye'
              }`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>
          <button className="modal-button" onClick={handleLogin}>
            <i className="fas fa-sign-in-alt"></i> Login
          </button>
        </>
      )}

      {loginMessage && <p className="login-message">{loginMessage}</p>}

      <p className="terms-text">
        By continuing, you agree to Global Trade e-Solutions's{' '}
        <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
      </p>

      <div className="modal-footer">
        <a href="#" onClick={onSignUpClick}>
          <i className="fas fa-user-plus"></i> New User? Sign Up
        </a>
      </div>
    </Modal>
  );
};

export default SignInModal;

// Callback for successful login
function onSignInSuccess(user: { email: string; fullName: string }) {
  console.log(`Welcome ${user.fullName}! Email: ${user.email}`);
}
