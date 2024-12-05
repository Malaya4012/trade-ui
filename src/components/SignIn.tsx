import React, { useState } from 'react';
import '../styles/SignIn.css'; // Ensure you create a separate CSS file for styling


const SignIn: React.FC = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [otpRequested, setOtpRequested] = useState(false);
  const [otp, setOtp] = useState('');
  
  const handleRequestOtp = () => {
    setOtpRequested(true);
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-box">
        <h2>{forgotPassword ? 'Forgot Password' : 'Sign In'}</h2>

        {!forgotPassword && !otpRequested && (
          <form className="sign-in-form"  >
            <div className="form-group">
              <label>Email:</label>
              <input type="email" placeholder="Enter your email"  required />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" placeholder="Enter your password"  required />
            </div>
            <button type="submit" className="sign-in-btn">Sign In</button>
          </form>
        )}

        {forgotPassword && !otpRequested && (
          <div className="forgot-password-section">
            <div className="form-group">
              <label>Email:</label>
              <input type="email" placeholder="Enter your email" required />
            </div>
            <button onClick={handleRequestOtp} className="sign-in-btn">
              Request OTP
            </button>
          </div>
        )}

        {otpRequested && (
          <div className="otp-section">
            <div className="form-group">
              <label>Enter OTP:</label>
              <input
                type="text"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter the OTP"
                required
              />
            </div>
            <button type="submit" className="sign-in-btn">
              Verify OTP
            </button>
          </div>
        )}

        <div className="terms-section">
          <p>
            By continuing, you agree to Global Trade eSolutions's{' '}
            <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Use</a> and{' '}
            <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
          </p>
        </div>

        {!forgotPassword && (
          <div className="forgot-password-link">
            <p onClick={() => setForgotPassword(true)} className="forgot-password-text">
              Forgot Password?
            </p>
          </div>
        )}

        {forgotPassword && !otpRequested && (
          <div className="forgot-password-link">
            <p className="forgot-password-text">
              <span className="sign-in-link" onClick={() => setForgotPassword(false)}>Sign in as an existing user</span>
            </p>
          </div>
        )}

        <div className="sign-up-section">
          <p>
            Don't have an account?{' '}
            <span className="sign-up-link" onClick={() => window.location.href='/signup'}>
              Activate or Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
