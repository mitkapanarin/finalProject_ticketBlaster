import React, { useState } from 'react'
import InputField from '../../components/Form/InputField'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch() // initialization
  const store = useSelector((z) => z)
  console.log(store)
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
    }
    catch (err) {
      console.log("error occured")
      toast.error("Couldn't login, please try again")
    }
  }

  const handleInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="custom-container">
      <section>
        <div className="custom-form-container">
          <div className="custom-form-card">
            <div className="custom-form-content">
              <h1 className="custom-form-title">Sign in to your account</h1>
              <form onSubmit={handleSubmit} className="custom-form">
                <InputField
                  label="Your email"
                  name="email"
                  onChange={handleInput}
                  placeholder="Enter your email"
                  required={true}
                  value={data.email}
                />
                <InputField
                  label="Your password"
                  name="password"
                  onChange={handleInput}
                  placeholder="Enter your password"
                  required={true}
                  type="password"
                  value={data.password}
                />
                <div className="custom-remember-forgot">
                  <div className="custom-remember-me">
                    <input
                      id="custom-remember"
                      aria-describedby="custom-remember"
                      type="checkbox"
                      className="custom-remember-checkbox"
                      required=""
                    />
                    <label htmlFor="custom-remember" className="custom-remember-label">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="custom-forgot-link">
                    Forgot password?
                  </a>
                </div>
                <button type="submit" className="custom-signin-button">
                  Sign in
                </button>
                <p className="custom-signup-text">
                  Don't have an account yet?{' '}
                  <a href="#" className="custom-signup-link">
                    Sign up
                  </a>
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