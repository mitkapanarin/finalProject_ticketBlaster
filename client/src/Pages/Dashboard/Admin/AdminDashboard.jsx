import React, { useState } from "react";
import Events from "../../../components/Events/Events";
import { useCreateEventMutation } from "../../../store/index";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const initialEventFormState = {
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

  const [data, setData] = useState(initialEventFormState);

  // console.log(data);
  const [createEvent, { isLoading, isError, error }] = useCreateEventMutation();
  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data)
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
    <div>
      <Events
        data={data}
        handleSubmit={handleSubmit}
        handleInput={handleInput}
      />
    </div>
  );
};

export default AdminDashboard;