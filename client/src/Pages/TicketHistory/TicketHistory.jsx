import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/Slices/userSlice";
import "./TicketHistory.css";
import AdminTab from "../../components/Layout/AdminTab/AdminTab";

const TicketHistory = () => {

  const dispatch = useDispatch();

  return (
    <div className="card-ticket-history">
      <AdminTab pageName={"Ticket History"}/>
      
    </div>
  );
};


export default TicketHistory;
