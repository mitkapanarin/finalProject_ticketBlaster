import './Login.css';
import React, { useState } from 'react';
import InputField from '../../components/Form/InputField';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch(); // initialization
  const store = useSelector((z) => z);
  console.log(store);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    } catch (err) {
      console.log("error occurred");
      toast.error("Couldn't login, please try again");
    }
  };

  const handleInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
      <section>
        <div className="login-form-container">
          <div className="login-form-card">
            <div className="login-form-content">
              <h1 className="login-form-title">Log In</h1>
              <form onSubmit={handleSubmit} className="login-form">
                <InputField
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleInput}
                  label="Email"
                  placeholder="name@company.com"
                  required={true}
                />
                <InputField
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleInput}
                  label="Password"
                  placeholder="Enter your password"
                  required={true}
                />

                <div className="login-remember-forgot">
                  <a href="#" className="login-forgot-link">
                    Forgot password?
                  </a>
                  <button type="submit" className="login-signin-button">
                    Log in
                  </button>
                </div>
                <p className="login-signup-text">
                  <button type="submit" className="login-signup-button">
                    Don't have an account?
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
