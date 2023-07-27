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
    retypePassword: ""
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

    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Regular expression to validate full name format
    const fullNameRegex = /^[A-Za-z]+(\s[A-Za-z]+)+$/;

    // Regular expression to validate password format (at least 6 characters, at least one uppercase letter, one lowercase letter, and one digit)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    // Extract the data from the form
    const { fullName, email, password, retypePassword } = data;

    // Verify if the provided email follows a valid format
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Verify if the provided full name follows a valid format
    if (!fullNameRegex.test(fullName)) {
      toast.error("Please enter a valid full name (at least two words without special characters or numbers)");
      return;
    }

    // Verify if the provided password follows a valid format
    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one digit");
      return;
    }

    // Verify if the retype password matches the original password
    if (password !== retypePassword) {
      toast.error("Retyped password does not match the original password");
      return;
    }

    try {
      await createUser(data);

      if (isError) {
        toast.error("Some error occurred");
      } else {
        toast.success("Account created successfully 👌");
        navigate("/login");
      }
      console.log(data);
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
