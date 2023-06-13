import React, { useState } from "react";
import InputField from "../../components/Form/InputField";
import "../Events/Events.css";

const Events = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    } catch (err) {
      console.log("error occurred");
      toast.error("Couldn't login, please try again");
    }
  };

  const handleInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="card-events-details">
      <div className="navbar-events-details">
        <h2>Events</h2>
        <nav>
          <ul>
            <li><a href="#">Events</a></li>
            <li><a href="#">Users</a></li>
            <li><a href="#">Ticket History</a></li>
            <li><a href="#">User Details</a></li>
            <li><a href="#">Logout</a></li>
          </ul>
        </nav>
      </div>
      <div>
        <div className="input-row">
          <InputField
            type="text"
            name="name"
            value={data.name}
            onChange={handleInput}
            label="Event Name"
            placeholder="Event Name"
            required={true}
          />
          <label htmlFor="category">Category:</label>
          <select
            name="category"
            value={data.category}
            onChange={handleInput}
            required={true}
          >
            <option value="">Select a category</option>
            <option value="Musical Concert">Musical Concert</option>
            <option value="Stand-Up Comedy">Stand-Up Comedy</option>
          </select>

          <label htmlFor="date">Date:</label>
          <input
            type="date"
            name="date"
            value={data.date}
            onChange={handleInput}
            placeholder="Event Name"
            required={true}
          />
        </div>
      </div>
      <div className="events-content">
        <div className="events-left-section">
          <div className="events-upload-button">
            <button className="events-black-button">Upload Event Art</button>
          </div>
          <div className="events-event-photo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Children_Playing_Violin_Suzuki_Institute_2011.JPG/1280px-Children_Playing_Violin_Suzuki_Institute_2011.JPG"
              alt="Event Art"
              width="150"
              height="150"
            />
          </div>
        </div>
        <div className="events-right-section">
          <div className="events-event-details">
            <label htmlFor="event-details">Event Details:</label>
            <textarea
              name="event-details"
              value={data["event-details"]}
              onChange={handleInput}
              rows="5"
            ></textarea>
          </div>
          <div className="events-price-input">
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              name="price"
              value={data.price}
              onChange={handleInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
