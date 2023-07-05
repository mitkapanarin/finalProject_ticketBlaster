import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./AllUsers.css";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../store/API/userApi";
import AdminTab from "../../Components/AdminTab/AdminTab";
import { toast } from "react-toastify";

const AllUsers = () => {
  const store = useSelector((x) => x);
  const currentUserEmail = store.User.email;
  console.log(currentUserEmail);
  console.log(store);
  const dispatch = useDispatch();
  const { data } = useGetAllUsersQuery();
  console.log(data);

  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const deleteUserHandler = async (id) => {
    try {
      await toast.promise(deleteUser(id), {
        pending: "Deleting...",
        success: "User Deleted",
        error: "Error Deleting User",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const changeAdminHandler = async (data) => {
    console.log("payload", data);
    try {
      await toast.promise(updateUser(data), {
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
    <div className="card-all-users-details">
      <AdminTab pageName={"Users"} />
      {filterData?.map((user) => {
        return (
          <div key={user?._id} className="botom-all-users-card-container">
            <div className="botom-all-users-card-content">
              <img
                className="botom-all-users-card-image"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/World_Map_%28political%29.svg/1024px-World_Map_%28political%29.svg.png"
                alt="World Map"
                width="200"
                height="153"
              />
              <div className="parent">
                <h5 className="botom-all-users-card-title">{user.fullName}</h5>
                <div className="p-div">
                  <p className="botom-all-users-card-location">{user.email}</p>
                </div>
              </div>
            </div>
            <div>
              {user?.role === "admin" ? (
                <button
                  onClick={() => changeAdminHandler({ ...user, role: "user" })}
                  className="botom-all-users-action-button"
                >
                  Make User
                </button>
              ) : (
                <button
                  onClick={() => changeAdminHandler({ ...user, role: "admin" })}
                  className="botom-all-users-action-button"
                >
                  Make Admin
                </button>
              )}
              <button
                onClick={() => deleteUserHandler(user?._id)}
                className="botom-all-users-card-button"
              >
                Delete User
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllUsers;
