import React, { useState } from "react";
import Events from "../../../Components/Events/Events";
import { useCreateEventMutation } from "../../../store";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const initialEventFormState = {
  role: "",
  eventName: "",
  eventDescription: "",
  price: 0,
  eventLocation: "local, host",
  eventType: "",
  eventDate: new Date(),
};

const AdminDashboard = () => {
  const store = useSelector((state) => state);
  console.log(store);

  const [data, setData] = useState({
    ...initialEventFormState,
    role: store.User.role,
  });

  console.log(data);
  const [createEvent, { isLoading, isError, error }] = useCreateEventMutation();
  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(createEvent(data), {
        pending: "Creating Event",
        success: "Event Created",
        error: "Error Creating Event",
      });
      setData(initialEventFormState);
    } catch (err) {
      console.log(err);
      toast.error("Error Creating Event");
    }
  };
  return (
    <>
      <div>
      <Events
        data={data}
        handleSubmit={handleSubmit}
        handleInput={handleInput}
      />
    </div>
    </>
  );
};

export default AdminDashboard;