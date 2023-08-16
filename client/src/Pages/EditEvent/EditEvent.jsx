import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  useUpdateEventMutation,
  useGetAllEventsQuery,
  useGetEventQuery,
} from "../../store/API/eventApi";
import InputField from "../../Components/Form/InputField";
import AdminTab from "../../Components/AdminTab/AdminTab";
import "../../Components/Events/Events.css";
import UploadEventImage from "../../Components/Upload/UploadEventImage";
import RelatedActs from "../../Components/RelatedActs/RelatedActs";
import { useParams } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import { toast } from "react-toastify";

const EditEvent = () => {
  const params = useParams();
  const { data, isLoading: OneEventIsLoading } = useGetEventQuery(
    params?.eventId
  );

  const [formData, setFormData] = useState({
    eventName: "",
    eventDescription: "",
    eventDate: "",
    price: "",
    eventLocation: "",
    eventType: "",
    eventID: "",
    image: ""
  });

  console.log("formData", formData);

  useEffect(() => {
    setFormData({
      ...data?.data,
      eventID: params?.eventId,
      eventDate: dayjs(data?.data?.eventDate).format("YYYY-MM-DD"),
    });
  }, [data]);

  const [updateEvent] = useUpdateEventMutation();

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(updateEvent(formData), {
        pending: "Updating User Details...",
        success: "User Details Updated Successfully!",
        error: "Error Updating User Details!",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const {
    data: allEventsData,
    isLoading,
    isFetching,
    isError,
  } = useGetAllEventsQuery();
  const sortDate = (a, b) => {
    return new Date(a.eventDate) - new Date(b.eventDate);
  };

  const concerts = allEventsData?.data
    ?.filter((item) => item?.eventType === "concert")
    .slice()
    .sort((a, b) => sortDate(a, b));

  const comedies = allEventsData?.data
    ?.filter((item) => item?.eventType === "comedy")
    .slice()
    .sort((a, b) => sortDate(a, b));

  const [relatedEvents, setRelatedEvents] = useState([]);

  const updateRelatedEvents = (eventType) => {
    if (eventType === "concert") {
      setRelatedEvents(concerts);
    } else if (eventType === "comedy") {
      setRelatedEvents(comedies);
    } else {
      setRelatedEvents([]);
    }
  };

  
  const [image, setImage] = useState(null); // New state for image

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]; // Get the selected image file
    setImage(selectedImage); // Update the image state with the selected image
  };

  const handleEventTypeChange = (event) => {
    const selectedEventType = event.target.value;
    handleInput(event);
    updateRelatedEvents(selectedEventType);
  };

  if (OneEventIsLoading || isFetching) return <Loader />;

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
            value={formData?.eventName}
            onChange={handleInput}
            placeholder="Event Name"
            required={true}
            label="Event Name"
          />
          <div>
            <label htmlFor="eventType">Category:</label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleEventTypeChange}
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
            onChange={handleInput}
            placeholder="Event Date"
            required={true}
            label="Event Date"
          />
        </div>
        <div className="events-content">
          <div className="events-left-section">
            <div className="events-event-photo">
              {/* <UploadEventImage /> */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="signup-input"
              />
            </div>
          </div>
          <div className="events-right-section">
            <div className="events-event-details">
              <label htmlFor="event-details">Event Details:</label>
              <textarea
                name="eventDescription"
                value={formData.eventDescription}
                onChange={handleInput}
                rows="5"
              ></textarea>
            </div>
            <div className="events-price-input">
              <InputField
                className="inputField"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInput}
                placeholder="Event price"
                required={true}
                label="Event price"
              />
            </div>
            <InputField
              className="inputField"
              type="text"
              name="eventLocation"
              value={formData.eventLocation}
              onChange={handleInput}
              placeholder="Event Location"
              required={true}
              label="Event Location"
            />
          </div>
        </div>
        <div className="events-content"></div>
        <div className="related-events">
          <label htmlFor="category" className="related-events-label">
            Related Events
          </label>
          <div className="related-events-input">
            <select
              name="relates-events"
              value={formData.eventType}
              onChange={handleInput}
              required={false}
            >
              <option value="">Select a category</option>
              {relatedEvents.map((event) => (
                <option key={event._id} value={event.eventType}>
                  {event.eventName}
                </option>
              ))}
            </select>
            <button type="submit" className="related-events-btn">
              Edit Event
            </button>
          </div>
        </div>
      </form>

      {relatedEvents.map((item) => (
        <RelatedActs key={item._id} {...item} />
      ))}
    </div>
  );
};

export default EditEvent;
