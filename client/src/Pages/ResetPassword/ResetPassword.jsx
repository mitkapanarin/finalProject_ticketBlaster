import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import "./ResetPassword.css"

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [resetToken, setResetToken] = useState("");
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  useEffect(() => {
    // Extract the reset token from the URL
    const token = window.location.pathname.split("/").pop();
    console.log(token);
    if (token) {
      // Store the reset token in the component state
      setResetToken(token);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the new password with a regex pattern
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!passwordPattern.test(newPassword)) {
      setMessage(
        "Password must contain at least 6 characters, one uppercase letter, one lowercase letter, one digit, and one special character."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/auth/reset-password",
        {
          resetToken,
          newPassword,
        }
      );

      if (response.status === 200) {
        setMessage(response.data.message);
         navigate("/login");
      } else {
        setMessage("Invalid or expired reset token");
      }
    } catch (error) {
      setMessage("Server Error");
      console.error(error);
    }
  };

  return (
    <div className="psw-reset-containerr ">
      <h2 className=" reset-form-title ">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newPassword">Password</label>
        <input
        className="input-password-resett "
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <label htmlFor="confirmPassword">Re-type password</label>
        <input
        className="input-password-resett "
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button className="btn-password-reset-email" type="submit">Reset Password</button>
         <button className="back-to-login"  onClick={handleNavigateToLogin} >Back to Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
