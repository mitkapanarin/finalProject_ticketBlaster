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

  const navigate = useNavigate();

  const [image, setImage] = useState(null); // New state for image

  const [createEvent, { isLoading, isError, error }] = useCreateEventMutation();

  const handleInput = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]; // Get the selected image file
    setImage(selectedImage); // Update the image state with the selected image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    for (const key in eventData) {
      formData.append(key, eventData[key]);
    }
    formData.append("image", image); // Add the image file to the form data
  
    try {
      await toast.promise(createEvent(formData), {
        pending: "Creating Event",
        success: "Event Created",
        error: "Error Creating Event",
      });
      setEventData(initialEventFormState);
      setImage(null); // Clear the image after successful submission
      navigate("/admin-dashboard");
    } catch (err) {
      console.log(err);
      toast.error("Error Creating Event");
    }
  };
  

  return (
    <div>
      <Events
        eventData={eventData}
        handleSubmit={handleSubmit}
        handleInput={handleInput}
        handleImageChange={handleImageChange} // Pass the image change handler
      />
    </div>
  );
};

export default AdminDashboard;




