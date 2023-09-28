import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css"

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

   const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateEmail(email)) {
    setMessage("Please enter a valid email address");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:9000/api/v1/auth/forgot-password",
      { email },
    );

    if (response.status === 200) {
      setMessage(response.data.message);
    } else {
      setMessage("Server Error");
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      setMessage("User not found");
    } else {
      setMessage("Server Error");
      console.error(error);
    }
  }
};


  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div>
      <h2 className="reset-form-title-first" >Forgot Password</h2>
      <form className="psw-reset-container" onSubmit={handleSubmit}>
        <label className="reset-form-title" htmlFor="email">Email</label>
        <input
          className="input-password-reset"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn-password-reset-email" type="submit">Send Password Reset Email</button>
        <button className="back-to-login"  onClick={handleNavigateToLogin} >Back to Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
