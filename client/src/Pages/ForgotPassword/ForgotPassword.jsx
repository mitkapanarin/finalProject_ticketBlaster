import './ForgotPassword.css';
import React, { useState } from 'react';
import InputField from '../../components/Form/InputField';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to the server to initiate the password reset process
      await axios.post('/api/v1/auth/forgot-password', { email });
      alert('Password reset instructions sent');
    } catch (error) {
      alert('Failed to send password reset instructions');
      console.log(error);
    }
  };

  const handleBackToLogin = () => {
    // Handle navigation to the login page
  };

  return (
    <div className="psw-reset-container">
      <section>
        <div className="reset-form-container">
          <div className="reset-form-card">
            <div className="reset-form-content">
              <h1 className="reset-form-title">Forgot Password</h1>
              <form onSubmit={handleSubmit} className="login-form">
                <InputField
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                  placeholder="name@company.com"
                  required={true}
                />
                <button type="submit" className="btn-password-reset-email">
                  Send password reset email
                </button>
                <button type="button" className="back-to-login" onClick={handleBackToLogin}>
                  Back to login
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;