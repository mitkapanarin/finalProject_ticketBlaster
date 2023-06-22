import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="main-footer container">
        <div className="left-footer">
          <p>
            <b>ticketBlaster</b>
          </p>
          <p>Musical Concerts</p>
          <p>Stand Up Comedies</p>
        </div>
        <div className="right-footer">
          <p>&copy; TicketBlaster 2023</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
