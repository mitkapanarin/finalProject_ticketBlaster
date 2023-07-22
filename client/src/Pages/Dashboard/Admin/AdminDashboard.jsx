import React, { useState } from "react";
import Events from "../../../Components/Events/Events";
import { useCreateEventMutation } from "../../../store";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialEventFormState = {
  role: "",
  eventName: "",
  eventDescription: "",
  price: 0,
  eventLocation: "",
  eventType: "",
  eventDate: new Date(),
};

const AdminDashboard = () => {
  const store = useSelector((state) => state);
  console.log(store);

  const [eventData, setEventData] = useState({
    ...initialEventFormState,
    role: store.User.role,
  });

  console.log(eventData);

  const navigate = useNavigate(); // Add useNavigate hook

  const [createEvent, { isLoading, isError, error }] = useCreateEventMutation();
  const handleInput = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(createEvent(eventData), {
        pending: "Creating Event",
        success: "Event Created",
        error: "Error Creating Event",
      });
      setEventData(initialEventFormState);
      navigate("/admin-dashboard"); // Navigate to admin dashboard
    } catch (err) {
      console.log(err);
      toast.error("Error Creating Event");
    }
  };
  return (
    <>
      <div>
        <Events
          eventData={eventData} // Pass eventData as prop to Events
          handleSubmit={handleSubmit}
          handleInput={handleInput}
        />
      </div>
    </>
  );
};

export default AdminDashboard;
