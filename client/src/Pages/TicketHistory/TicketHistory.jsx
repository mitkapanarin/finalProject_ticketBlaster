import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/Slices/userSlice";
import "./TicketHistory.css";

const TicketHistory = () => {

  const dispatch = useDispatch();

  return (
    <div className="card-ticket-history">
      <div className="navbar-all-users-details">
        <div className="h-b">
          <h2>Ticket History</h2>
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
      
    </div>
  );
};


export default TicketHistory;
