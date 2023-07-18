import React from "react";
import "./Ticket.css";
import dayjs from "dayjs";

const Ticket = ({ eventDate, eventDescription, eventName, eventType }) => {
  const date1 = dayjs("2019-01-25");
  const date2 = dayjs("2018-06-05");
  const countDown = date1.diff(date2, "day");

  return (
    <div
      className={
        countDown > 0 ? "ticket_parent" : "ticket_parent ticket_parent_fade"
      }
    >
      {eventName}
    </div>
  );
};

export default Ticket;
