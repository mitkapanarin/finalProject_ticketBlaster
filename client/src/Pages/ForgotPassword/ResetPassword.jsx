import React, { useState } from 'react';
import { useResetPasswordMutation } from '../../store/API/userApi';
import InputField from '../../components/Form/InputField';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState('');

  const [resetPassword] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await resetPassword({ token, password });
      toast.success('Password reset successful');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to reset password');
      console.log(error);
    }
  };

  return (
    <div className="reset-password-container">
      <section>
        <div className="reset-password-form-container">
          <div className="reset-password-form-card">
            <div className="reset-password-form-content">
              <h1 className="reset-password-form-title">Reset Password</h1>
              <form onSubmit={handleSubmit} className="reset-password-form">
                <InputField
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="New Password"
                  placeholder="Enter your new password"
                  required={true}
                />
                <button type="submit" className="btn-reset-password">
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
