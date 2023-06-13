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
          <div>
            <label htmlFor="name">Event Name:</label>
            <InputField
              className="inputField"
              type="text"
              name="name"
              value={data.name}
              onChange={handleInput}
              placeholder="Event Name"
              required={true}
            />
          </div>

          <div>
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
          </div>

          <div>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              name="date"
              value={data.date}
              onChange={handleInput}
              required={true}
            />
          </div>
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
            <label htmlFor="price">Total Price:</label>
            <input
              type="text"
              name="price"
              value={data.price}
              onChange={handleInput}
            />
          </div>
        </div>
      </div>
      <div className="related-events">
        <label htmlFor="category" className="related-events-label">
          Related Events
        </label>
        <div className="related-events-input">
          <select
            name="category"
            value={data.category}
            onChange={handleInput}
            required={true}
          >
            <option value="">Select a category</option>
            <option value="Concert1">Concert1</option>
            <option value="Concert2">Concert2</option>
          </select>
          <button className="related-events-btn">Add</button>
        </div>
      </div>
      <div className="bottom-cards">
        <div className="botom-event-card-container">
          <img
            className="botom-event-card-image"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/World_Map_%28political%29.svg/1024px-World_Map_%28political%29.svg.png"
            alt="World Map"
            width="200"
            height="153"
          />
          <div className="botom-event-card-content">
            <h5 className="botom-event-card-title">Name of artist</h5>
            <p className="botom-event-card-date">
              June 9th 2023
            </p>
            <p className="botom-event-card-location">
              Skopje, Macedonia
            </p>
            <button className="botom-event-card-button">Remove</button>
          </div>
        </div>
        <div className="botom-event-card-container">
          <img
            className="botom-event-card-image"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/World_Map_%28political%29.svg/1024px-World_Map_%28political%29.svg.png"
            alt="World Map"
            width="200"
            height="153"
          />
          <div className="botom-event-card-content">
            <h5 className="botom-event-card-title">Name of artist</h5>
            <p className="botom-event-card-date">
              June 9th 2023
            </p>
            <p className="botom-event-card-location">
              Skopje, Macedonia
            </p>
            <button className="botom-event-card-button">Remove</button>
          </div>
        </div>
      <button className="botom-right-btn">Save</button>
      </div>
    </div>
  );
};

export default Events;
