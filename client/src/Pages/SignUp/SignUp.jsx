import React, { useState } from "react";
import { useCreateUserMutation } from "../../store/API/userApi";
import InputField from "../../Components/Form/InputField";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    retypePassword: "",
    image: null,
  });

  const [createUser, { isLoading, isError, isSuccess }] = useCreateUserMutation();

  const handleInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setData({
      ...data,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const fullNameRegex = /^[A-Za-z]+(\s[A-Za-z]+)+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    const { fullName, email, password, retypePassword, image } = data;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!fullNameRegex.test(fullName)) {
      toast.error("Please enter a valid full name");
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error("Password must meet the criteria");
      return;
    }

    if (password !== retypePassword) {
      toast.error("Retyped password does not match");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("retypePassword", retypePassword);

      await createUser(formData);

      if (isError) {
        toast.error("Some error occurred");
      } else {
        toast.success("Account created successfully");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      toast.error("Couldn't create account, please try again");
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
                  name="retypePassword"
                  value={data.retypePassword}
                  onChange={handleInput}
                  label="Re-type Password"
                  placeholder="Re-enter your password"
                  required={true}
                  className="signup-input"
                />
                <InputField
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  label="Profile Image"
                  required={true}
                  className="signup-input"
                />
                <button type="submit" className="signup-button">
                  Create account
                </button>
                <button
                  type="button"
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
