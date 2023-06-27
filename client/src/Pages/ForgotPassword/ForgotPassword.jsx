import React, { useState } from 'react';
import { useForgotPasswordMutation } from '../../store/API/userApi';
import InputField from '../../components/Form/InputField';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const forgotPasswordMutation = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await forgotPasswordMutation.mutateAsync(email);
      toast.success('Password reset instructions sent');
    } catch (error) {
      toast.error('Failed to send password reset instructions');
      console.log(error);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
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
              </form>
              <button className="btn-back-to-login" onClick={handleBackToLogin}>
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
