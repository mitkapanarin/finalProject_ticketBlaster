import React, { useState } from "react";
import { useLoginUserMutation } from "../../store/API/userApi";
import InputField from "../../Components/Form/InputField";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/Slices/userSlice";
import { useDispatch } from "react-redux";
import "./Login.css"

const Login = () => {
  const dispatch = useDispatch(); // initialization
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [loginUser] = useLoginUserMutation();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await loginUser(data);
    // Check if the response contains an error and handle accordingly
    if (response.error) {
      toast.error("Failed to log in");
    } else {
      toast.success("Logged in successfully");
      dispatch(login(response.data)); // Dispatch action only on success
      navigate("/");
    }
  } catch (error) {
    toast.error("An error occurred while logging in");
  }
};


  const handleInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleSignup = () => {
    navigate("/create-user");
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
                  <a
                    href="#"
                    className="login-forgot-link"
                    onClick={handleForgotPassword}
                  >
                    Forgot password?
                  </a>
                  <button type="submit" className="login-signin-button">
                    Log in
                  </button>
                </div>
                <p className="login-signup-text">
                  <button
                    type="submit"
                    className="login-signup-button"
                    onClick={handleSignup}
                  >
                    {`Don't have an account?`}
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
