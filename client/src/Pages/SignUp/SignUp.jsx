import React, { useState } from "react";
import { useCreateUserMutation } from "../../store/API/userApi";
import InputField from "../../Components/Form/InputField";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch(); // initialization
  const navigate = useNavigate();
  const store = useSelector((z) => z);
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [createUser, { isLoading, isError, isSuccess }] =
    useCreateUserMutation(); // since this is not query, but it is mutation we put [] and since we are Signup we put the name of the functin createUser

  const handleInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        createUser(data),
        toast.success("Account created successfully 👌"),
      );
      console.log(data);
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error("Couldn't create acount, please try again");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <section className="signup-section">
        <div className="signup-container">
          <div className="signup-card">
            <div className="signup-card-content">
              <h1 className="signup-title">Create account</h1>
              <form className="signup-form" onSubmit={handleSubmit}>
                <InputField
                  type="text"
                  name="fullName"
                  value={data.fullName}
                  onChange={handleInput}
                  label="Full Name"
                  placeholder="Enter Your name here..."
                  required={true}
                  className="signup-input"
                />
                <InputField
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleInput}
                  label="Email"
                  placeholder="name@company.com"
                  required={true}
                  className="signup-input"
                />
                <InputField
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleInput}
                  label="Password"
                  placeholder="Enter your password"
                  required={true}
                  className="signup-input"
                />
                <InputField
                  type="password"
                  name="reTypePassword"
                  value={data.password}
                  onChange={handleInput}
                  label="Re-type Password"
                  placeholder="Re-enter your password"
                  required={true}
                  className="signup-input"
                />
                <button type="submit" className="signup-button">
                  Create account
                </button>
                <button
                  type="submit"
                  className="signup-button"
                  onClick={handleLogin}
                >
                  Already have an account?
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
