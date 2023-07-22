import React from "react";
import "./ChangeRole.css";

const ChangeRole = ({ user, onSave, onClose, newRole }) => {
  const handleSave = () => {
    onSave({ ...user, role: newRole });
    onClose();
  };

  return (
    <div className="change-role-modal-overlay">
      <div className="change-role-modal">
        <div className="change-role-modal-body">
          <span className="close-change-role-modal" onClick={onClose}></span>
          <h2 className="modal-title">
            Are you sure?</h2>
           <p> {newRole === "admin"
              ? "You are about to make a user administrator of the system. Please proceed with caution."
              : "You are about to downgrade auser from administrator. Please proceed with caution."}
          </p>
          <div className="modal-btns">
            <button className="change-role-modal-btn" onClick={handleSave}>
              {newRole === "admin" ? "Make User Admin" : "Downgrade User"}
            </button>
            <button className="change-role-modal-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeRole;
