import React from 'react'
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../store/Slices/userSlice";
import "./AdminTab.css";

const AdminTab = ({pageName}) => {

    const dispatch = useDispatch()

  return (
    <div className="navbar-admin">
    <div className="h-b">
      <h2>{pageName}</h2>
    </div>
    <nav>
      <ul>
        <li>
          <Link to="/admin-dashboard">Events</Link>
        </li>
        <li>
          <Link to="/all-users">Users</Link>
        </li>
        <li>
          <Link to="/ticket-history">Ticket History</Link>
        </li>
        <li>
          <Link to="/update-user-details">User Details</Link>
        </li>
        <li>
          <a onClick={() => dispatch(logout())}>Logout</a>
        </li>
      </ul>
    </nav>
  </div>
  )
}

export default AdminTab