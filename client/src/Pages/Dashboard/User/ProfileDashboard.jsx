import React, { useState } from "react";
import "./ProfileDashboard.css";
import Tabs from "../../../components/Layout/Tabs/Tabs";
import { useSelector, useDispatch } from "react-redux";

const ProfileDashboard = () => {
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const { fullName, email } = useSelector((state) => state.User);

  const handleChangePassword = () => {
    setShowPasswordFields(true);
  };

  const handleSubmitPassword = () => {
    // Add logic to handle password change submission
    console.log("New Password:", password);
    console.log("Retyped Password:", retypePassword);
  };

  return (
    <div className="card-user-details">
      <div className="navbar-user-details">
        <h2>User Details</h2>
        <Tabs />
      </div>
      <div className="top-user-details">
        <div className="left-user-details">
          <img
            className="avatar-user"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg/1280px-Altja_j%C3%B5gi_Lahemaal.jpg"
            alt="Avatar"
          />
        </div>
        <div className="right-user-details">
          <label htmlFor="full-name-user">Full Name</label>
          <input
            id="full-name-user"
            type="text"
            className="input-field-user"
            placeholder="Enter your full name"
          />
        </div>
      </div>
      <div className="bottom-user-details">
        <div className="left-user-details">
          <button className="upload-avatar-button-user">Upload Avatar</button>
        </div>
        <div className="right-user-details">
          <label htmlFor="email-user">Email</label>
          <input
            id="email-user"
            type="email"
            className="input-field-user"
            placeholder="Enter your email"
          />
        </div>
      </div>
      <div className="sub-section-user-details">
        <button className="submit-button-user">Submit</button>
      </div>
      <div className="bottom-psw-details">
        <div className="left-botton-psw">
          <h3>Password</h3>
        </div>
        {showPasswordFields ? (
          <div className="right-botton-psw">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="input-field-user"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="retype-password">Re-Type Password</label>
            <input
              id="retype-password"
              type="password"
              className="input-field-user"
              placeholder="Re-type your new password"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
            />
            <button
              className="submit-button-user"
              onClick={handleSubmitPassword}
            >
              Submit
            </button>
          </div>
        ) : (
          <button
            type="submit"
            onClick={handleChangePassword}
            className="right-botton-psw"
          >
            Change Password
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileDashboard;
