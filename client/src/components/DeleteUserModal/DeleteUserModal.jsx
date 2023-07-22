import React from "react";
import "./DeleteUserModal.css";

const DeleteUserModal = ({ user, onCancel, onConfirm }) => {
  return (
    <div className="delete-user-modal-overlay">
      <div className="delete-user-modal">
        <div className="delete-user-modal-body">
          <span className="close-delete-user-modal" onClick={onCancel}></span>
          <h2 className="modal-title">Are you sure?</h2>
          <p>You are about to delete a user. Please proceed with caution.</p>
          <div className="modal-btns">
            <button className="delete-user-modal-btn" onClick={onConfirm}>
              Delete User
            </button>
            <button className="delete-user-modal-btn" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
