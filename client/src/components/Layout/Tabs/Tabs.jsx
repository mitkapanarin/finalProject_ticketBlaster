import React from "react";
import "./Tabs.css";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/Slices/userSlice";


const Tabs = () => {
const dispatch = useDispatch()

  return (
    <nav>
      <ul>
        <li>
          <a href="#">Ticket History</a>
        </li>
        <li>
          <a href="#">User Details</a>
        </li>
        <li>
              <button
                className="logout-button"
                onClick={() => dispatch(logout())}
              >
                Log out
              </button>
        </li>
      </ul>
    </nav>
  );
};

export default Tabs;
