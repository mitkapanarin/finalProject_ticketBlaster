import React, { useState } from "react";
import "./UpdateUserDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateUserMutation } from "../../store/API/userApi";
import { logout } from "../../store/Slices/userSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import ChangePassword from "../../Pages/Dashboard/User/ChangePassword";
import InputField from "../../components/Form/InputField";
import AdminTab from "../../components/Layout/AdminTab/AdminTab";

const UpdateUserDetails = () => {
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

<AdminTab pageName={"User Details"}/>
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
            <InputField
              className="inputField"
              type="text"
              name="fullName"
              value={userData?.fullName}
              onChange={handleUserDataChange}
              placeholder="Full Name"
              required={true}
              label="Full Name"
            />
          </div>
        </div>
        <div className="bottom-user-details">
          <div className="left-user-details">
            <button className="upload-avatar-button-user">Upload Avatar</button>
          </div>
          <div className="right-user-details">
            <InputField
              className="inputField"
              type="email"
              name="email"
              value={userData?.email}
              onChange={handleUserDataChange}
              placeholder="Enter your email"
              required={true}
              label="Email"
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
          <InputField
              className="inputField"
              type="password"
              name="Password"
              value={userData?.password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new Password"
              required={true}
              label="Password"
            />
          <InputField
              className="inputField"
              type="password"
              name="Password"
              value={userData?.password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Re-type your new Password"
              required={true}
              label="Re-Type Password"
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
      <ChangePassword email={userData.email} />
    </div>
  );
};

export default UpdateUserDetails;
