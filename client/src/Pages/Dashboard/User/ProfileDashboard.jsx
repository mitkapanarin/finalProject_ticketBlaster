import React, { useState } from "react";
import "./ProfileDashboard.css";
import AdminTab from "../../../Components/AdminTab/AdminTab";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateUserMutation } from "../../../store/API/userApi";
import { toast } from "react-toastify";
import ChangePassword from "../../ChangePassword/ChangePassword"
import ProfilePictureUpload from "../../../Components/Upload/ProfilePictureUpload";

const ProfileDashboard = () => {
  const [updateUser] = useUpdateUserMutation();
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const { fullName, email, _id } = useSelector((state) => state.User);

  const [userData, setUserData] = useState({
    fullName,
    email,
    _id,
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

  return (
    <div className="card-user-details">
      <div className="navbar-user-details">
        <h2>User Details</h2>
        <AdminTab />
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className="top-user-details">
          <div className="left-user-details">
            <ProfilePictureUpload/>
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
      <ChangePassword email={userData.email} />
    </div>
  );
};


export default ProfileDashboard;
