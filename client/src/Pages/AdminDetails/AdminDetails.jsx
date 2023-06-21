import React, { useState } from "react";
import "./AdminDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateUserMutation } from "../../store/API/userApi";
import { logout } from "../../store/Slices/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const AdminDetails = () => {
  const [updateUser] = useUpdateUserMutation();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const { fullName, email, _id } = useSelector((state) => state.User);

  const [userData, setUserData] = useState({
    fullName,
    email,
    _id
  });

  const handleUserDataChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const handleChangePassword = () => {
    setShowPasswordFields(!showPasswordFields);
  };

  const handleSubmitPassword = () => {
    // Add logic to handle password change submission
    console.log("New Password:", password);
    console.log("Retyped Password:", retypePassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(updateUser(userData), {
        pending: "Updating User Details...",
        success: "User Details Updated Successfully!",
        error: "Error Updating User Details!",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/';
  };
  return (
    <div className="card-user-details">
      <div className="navbar-user-details">
        <h2>User Details</h2>
        <nav>
          <ul>
            <li><a href="/events">Events</a></li>
            <li><a href="/all-users">Users</a></li>
            <li><a href="/ticket-history">Ticket History</a></li>
            <li><a href="/admin-details">User Details</a></li>
            <li><a onClick={() => dispatch(logout())} >Logout</a></li>
          </ul>
        </nav>
      </div>
      <form action="" onSubmit={handleSubmit}>
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
              value={userData?.fullName}
              name="fullName"
              onChange={handleUserDataChange}
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
              name="email"
              className="input-field-user"
              placeholder="Enter your email"
              value={userData?.email}
              onChange={handleUserDataChange}
            />
          </div>
        </div>
        <div className="sub-section-user-details">
          <button type="submit" className="submit-button-user">
            Submit
          </button>
        </div>
      </form>
      <div className="bottom-psw-details">
        <div className="left-botton-psw">
          <h3>Password</h3>
        </div>
        <div className="right-botton-psw">
          <button
            type="button"
            onClick={handleChangePassword}
            className="right-botton-psw"
          >
            {showPasswordFields ? "Close" : "Change Password"}
          </button>
        </div>
      </div>
      {showPasswordFields && (
        <>
          <div className="password-fields">
            <label className="label-psw" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="input-field-user"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="label-psw" htmlFor="retype-password">Re-Type Password</label>
            <input
              id="retype-password"
              type="password"
              className="input-field-user"
              placeholder="Re-type your new password"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
            />
          </div>
          <button
            className="submit-button-user"
            onClick={handleSubmitPassword}
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default AdminDetails;
