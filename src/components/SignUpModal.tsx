import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../styles/SignUpModal.css';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignInClick: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose, onSignInClick }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page reload on form submission
    setErrorMessage(''); // Reset any previous error messages
    setSuccessMessage(''); // Reset any previous success messages

    const signupData = {
        fullName, // Full name entered by the user
        email,    // Email entered by the user
        password, // Password entered by the user
    };

    try {
        // Fetch existing users from the backend
        const response = await axios.get('http://localhost:5000/users'); 
        const existingUsers = response.data;

        // Check if the email already exists
        const userExists = existingUsers.some(
            (user: { email: string }) => user.email === signupData.email
        );

        if (userExists) {
            setErrorMessage('Email already exists. Please use a different email.');
        } else {
            // Send a POST request to register the user
            const result = await axios.post('http://localhost:5000/users', signupData);

            if (result.status === 201) {
                setSuccessMessage('Registration successful!');
                setFullName(''); // Reset the form fields
                setEmail('');
                setPassword('');
            } else {
                setErrorMessage('Unexpected response from the server.');
            }
        }
    } catch (error: any) {
        // Handle errors, such as network issues or backend errors
        console.error('Error during signup:', error);
        if (error.response && error.response.data) {
            setErrorMessage(error.response.data.message || 'Error during signup.');
        } else {
            setErrorMessage('Something went wrong. Please try again.');
        }
    }
};

  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      contentLabel="Sign Up Modal"
    >
      <button className="close-btn" onClick={onClose}>
        <i className="fas fa-times"></i>
      </button>
      <h2 className="modal-header">
        <i className="fas fa-user-plus"></i> Sign Up
      </h2>
      <form action='' method='' onSubmit={handleSignUp}>
        <div className="input-group">
          <i className="fas fa-user input-icon"></i>
          <input
            type="text"
            placeholder="Enter your full name"
            className="modal-input"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <i className="fas fa-envelope input-icon"></i>
          <input
            type="email"
            placeholder="Enter your email"
            className="modal-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <i className="fas fa-lock input-icon"></i>
          <input
            type="password"
            placeholder="Create password"
            className="modal-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="modal-button">
          <i className="fas fa-user-plus"></i> Sign Up
        </button>
      </form>

      {errorMessage && <p className="error-text">{errorMessage}</p>}
      {successMessage && <p className="success-text">{successMessage}</p>}

      <p className="terms-text">
        By continuing, you agree to Global Trade eSolutions's{' '}
        <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
      </p>

      <p className="modal-footer">
        Already have an account?{' '}
        <a onClick={onSignInClick}>
          <i className="fas fa-sign-in-alt"></i> Sign In
        </a>
      </p>
    </Modal>
  );
};

export default SignUpModal;
