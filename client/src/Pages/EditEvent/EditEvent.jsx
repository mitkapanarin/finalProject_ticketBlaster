import React, { useState } from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { useUpdateEventMutation } from "../../store/API/eventApi";
import InputField from "../../Components/Form/InputField";
import AdminTab from "../../Components/AdminTab/AdminTab";
import "../../Components/Events/Events.css";
import UploadEventImage from "../../Components/Upload/UploadEventImage";

const EditEvent = ({ eventData }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    eventName: eventData.eventName || "",
    eventDescription: eventData.eventDescription || "",
    eventDate: eventData.eventDate || "",
    price: eventData.price || "",
    eventLocation: eventData.eventLocation || "",
    eventType: eventData.eventType || "",
  });

  const updateEventMutation = useUpdateEventMutation();

  const handleInput = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEventMutation.mutateAsync({
        eventID: eventData._id,
        ...formData,
      });
      console.log("Event updated successfully");
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div className="card-events-details">
      <div className="navbar-events-details">
        <h2>Events</h2>
        <AdminTab />
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="input-row">
          <InputField
            className="inputField"
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={(e) => handleInput("eventName", e.target.value)}
            placeholder="Event Name"
            required={true}
            label="Event Name"
          />
          <div>
            <label htmlFor="eventType">Category:</label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={(e) => handleInput("eventType", e.target.value)}
              required={true}
            >
              <option value="">Select a category</option>
              <option value="concert">Musical Concert</option>
              <option value="comedy">Stand-Up Comedy</option>
            </select>
          </div>
          <InputField
            className="inputField"
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={(e) => handleInput("eventDate", e.target.value)}
            placeholder="Event Date"
            required={true}
            label="Event Date"
          />
        </div>
        <div className="events-content">
        </div>
        <div className="related-events">
          <div className="related-events-input">
            <button type="submit" className="related-events-btn">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditEvent;
