import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/Slices/userSlice";
import { useGetAllUsersQuery } from "../../store/API/userApi";
import "./AllUsers.css";
import AdminTab from "../../components/Layout/AdminTab/AdminTab";

const AllUsers = () => {
  const store = useSelector((x) => x);
  console.log(store);
  const dispatch = useDispatch();
  const { data } = useGetAllUsersQuery();
  console.log(data);

  const navigate = useNavigate();


  return (
    <div className="card-all-users-details">
<AdminTab pageName={"Users"}/>
      {/* {Array.isArray(data) &&
          data.map((item) => <AllEventsCard _id={item._id} image={image} eventName={eventName} eventDate={eventDate} eventLocation={eventLocation} button={button} />)} */}
      <div className="botom-all-users-card-container">
        <div className="botom-all-users-card-content">
          <img
            className="botom-all-users-card-image"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/World_Map_%28political%29.svg/1024px-World_Map_%28political%29.svg.png"
            alt="World Map"
            width="200"
            height="153"
          />
          <div className="parent">
            <h5 className="botom-all-users-card-title">Name of user</h5>
            <div className="p-div">
              <p className="botom-all-users-card-location">Email adress</p>
            </div>
          </div>
        </div>
        <div>
          <button className="botom-all-users-action-button">Make Action</button>
          <button className="botom-all-users-card-button">Delete User</button>
        </div>
      </div>
    </div>
  );
};


export default AllUsers;
