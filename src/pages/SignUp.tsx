import React from 'react';

const SignUp = () => {
  return (
    <div className="signup-page">
      <h1>Sign Up</h1>
      <p>Create your account and start accessing our global trade solutions.</p>
      {/* Implement your sign-up form here */}
      <form>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" required />
        <button type="submit">Sign Up </button>
      </form>
    </div>
  );
};

export default SignUp;
