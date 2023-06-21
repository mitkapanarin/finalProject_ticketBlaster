import React from "react";
import "./Tabs.css";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/Slices/userSlice";
import { useNavigate } from 'react-router-dom';

const Tabs = () => {
const dispatch = useDispatch();
const navigate = useNavigate()
const handleLogout = () => {
  dispatch(logout());
  window.location.href = '/';
};

  return (
    <nav>
      <ul>
        <li>
          <a href="/ticket-history">Ticket History</a>
        </li>
        <li>
          <a href="/user-profile">User Details</a>
        </li>
         <li>
          <a className="logout-button" onClick={handleLogout}>Logout</a>
        </li>
      </ul>
    </nav>
  );
};

export default Tabs;
