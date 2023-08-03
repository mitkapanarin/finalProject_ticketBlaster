import React, { useState } from "react";
import axios from "axios";
import "./ChangePassword.css"
import { toast } from 'react-toastify';
import InputField from "../../Components/Form/InputField";
import { useNavigate } from "react-router-dom"; 


const ChangePasswordForm = ({ email }) => {
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = () => {
    setShowPasswordFields((prevShowPasswordFields) => !prevShowPasswordFields);
    setMessage(""); // Clear the previous message when toggling the form
    // navigate("/change-password");
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    // Password validation regex pattern
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    if (!passwordPattern.test(newPassword)) {
      setMessage(
        "Password must contain at least 6 characters, one uppercase letter, one lowercase letter, one digit, and one special character."
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/auth/change-password",
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
          email: email,
        }
      );

      if (response.status === 200) {
        setMessage(response.data.message);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        toast.success("Password updated successfully 👌");
      } else {
        setMessage("Failed to change password");
      }
    } catch (error) {
      setMessage("Server Error");
      console.error(error);
    }
  };


  return (
    <div>
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
              name="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter Current Password"
              required={true}
              label="Current Password"
            />
            <InputField
              className="inputField"
              type="password"
              name="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter New Password"
              required={true}
              label="New Password"
            />
            <InputField
              className="inputField"
              type="password"
              name="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Your Password"
              required={true}
              label="Confirm Password"
            />
          </div>
          <button className="submit-button-user" onClick={handleSubmitPassword}>
            Submit
          </button>
        </>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default ChangePasswordForm;