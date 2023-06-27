import React from "react";
import "./Tabs.css";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/Slices/userSlice";
import { Link } from "react-router-dom";

const Tabs = () => {
const dispatch = useDispatch();

  return (
    <nav>
      <ul>
      <li>
          <Link to="/ticket-history">Ticket History</Link>
        </li>
        <li>
          <Link to="/user-profile">User Details</Link>
        </li>
        <li>
          <a onClick={() => dispatch(logout())}>Logout</a>
        </li>
      </ul>
    </nav>
  );
};

export default Tabs;
