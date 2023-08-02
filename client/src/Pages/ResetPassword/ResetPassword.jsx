import React, { useState, useEffect } from "react";
import axios from "axios";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [resetToken, setResetToken] = useState("");
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
      } else {
        setMessage("Invalid or expired reset token");
      }
    } catch (error) {
      setMessage("Server Error");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
