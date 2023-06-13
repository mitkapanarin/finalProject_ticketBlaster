import React from "react";
import "./Tabs.css";

const Tabs = () => {
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
          <a href="#">Logout</a>
        </li>
      </ul>
    </nav>
  );
};

export default Tabs;
