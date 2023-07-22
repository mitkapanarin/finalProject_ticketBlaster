import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./AllUsers.css";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../store/API/userApi";
import AdminTab from "../../Components/AdminTab/AdminTab";
import { toast } from "react-toastify";
import ChangeRole from "../../Components/ChangeRole/ChangeRole";
import DeleteUserModal from "../../Components/DeleteUserModal/DeleteUserModal";

const AllUsers = () => {
  const store = useSelector((x) => x);
  const currentUserEmail = store.User.email;
  const dispatch = useDispatch();
  const { data } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [showChangeRoleModal, setShowChangeRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("user");

  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const deleteUserHandler = (user) => {
    setUserToDelete(user);
    setShowDeleteUserModal(true);
  };

  const cancelDeleteUserHandler = () => {
    setShowDeleteUserModal(false);
    setUserToDelete(null);
  };

  const confirmDeleteUserHandler = async () => {
    try {
      await toast.promise(deleteUser(userToDelete._id), {
        pending: "Deleting...",
        success: "User Deleted",
        error: "Error Deleting User",
      });
    } catch (err) {
      console.log(err);
    }
    setShowDeleteUserModal(false);
    setUserToDelete(null);
  };

  const openChangeRoleModal = (user, role) => {
    setSelectedUser(user);
    setNewRole(role);
    setShowChangeRoleModal(true);
  };

  const closeChangeRoleModal = () => {
    setSelectedUser(null);
    setShowChangeRoleModal(false);
  };

  const saveChangeRole = async (updatedUser) => {
    try {
      await toast.promise(updateUser(updatedUser), {
        pending: "Updating...",
        success: "User Updated",
        error: "Error Updating User",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const filterData = data?.filter((item) => item.email !== currentUserEmail);

  return (
    <div className="all-users-container">
      <AdminTab pageName={"Users"} />
      <div className="all-users-cards">
        {filterData?.map((user) => (
          <div className="user-card" key={user?._id}>
            <img
              className="user-card-image"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/World_Map_%28political%29.svg/1024px-World_Map_%28political%29.svg.png"
              alt="World Map"
              width="100"
              height="100"
            />
            <div className="user-card-details">
              <div className="user-card-info">
                <h5 className="user-card-title">{user.fullName}</h5>
                <div className="user-card-location">
                  <p>{user.email}</p>
                </div>
              </div>
              <div className="user-card-actions">
                {user?.role === "admin" ? (
                  <button
                    onClick={() => openChangeRoleModal(user, "user")}
                    className="user-card-action-button make-user-button"
                  >
                    Make User
                  </button>
                ) : (
                  <button
                    onClick={() => openChangeRoleModal(user, "admin")}
                    className="user-card-action-button make-admin-button"
                  >
                    Make Admin
                  </button>
                )}
                <button
                  onClick={() => deleteUserHandler(user)}
                  className="user-card-action-button delete-button"
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showChangeRoleModal && (
        <ChangeRole
          user={selectedUser}
          onSave={saveChangeRole}
          onClose={closeChangeRoleModal}
          newRole={newRole}
        />
      )}

      {showDeleteUserModal && (
        <DeleteUserModal
          user={userToDelete}
          onCancel={cancelDeleteUserHandler}
          onConfirm={confirmDeleteUserHandler}
        />
      )}
    </div>
  );
};

export default AllUsers;