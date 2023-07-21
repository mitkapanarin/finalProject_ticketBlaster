import React from "react";
import { useDispatch } from "react-redux";
import AdminTab from "../../Components/AdminTab/AdminTab";
import { useNavigate } from "react-router-dom";
import { useGetAllEventsQuery } from "../../store";
import Loader from "../../Components/Loader/Loader";
import "./GetAllEvents.css";
import GetAllEventsCard from "../../Components/GetAllEventsCard/GetAllEventsCard";

const GetAllEvents = () => {
  const navigate = useNavigate(); // Move this hook outside the if statements

  const { data, isLoading, isFetching, isError } = useGetAllEventsQuery();
  console.log(data)
  const sortDate = (a, b) => {
    return new Date(a.eventDate) - new Date(b.eventDate);
  };

  const allEvents = data?.data?.slice().sort((a, b) => sortDate(a, b));

  if (isLoading || isFetching) return <Loader />;

  if (isError) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <div className="card-all-events-details">
      <div className="navbar-all-events-details">
        <div className="h-b">
          <h2>Events</h2>
          <button className="all-events-btn" onClick={() => navigate("/create-event")}>
            Create Event
          </button>
        </div>
        <AdminTab />
      </div>
      <div>
        {allEvents?.map((item) => (
          <GetAllEventsCard key={item._id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default GetAllEvents;
