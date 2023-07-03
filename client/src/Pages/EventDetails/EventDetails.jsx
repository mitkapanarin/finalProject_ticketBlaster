import React, { useState, useEffect } from 'react';
import './EventDetails.css'
import axios from 'axios';


  const EventDetails = () => {
  const eventID = window.location.pathname.split('/').pop();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch event details from the backend
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9001/api/v1/events/get-one/${eventID}`);
        setEvent(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventID]);

  const handleAddToCart = async () => {
    try {
      await axios.post('http://localhost:9003/api/v1/sales/items', { eventID, email });
      setMessage('Item added to cart successfully!');
    } catch (error) {
      console.error(error);
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div>
      <h2>{event.eventName}</h2>
      <p>{event.eventDescription}</p>
      <p>Date: {event.eventDate}</p>
      <p>Price: {event.price}</p>
      <p>Location: {event.eventLocation}</p>
      <p>Type: {event.eventType}</p>
      <button onClick={() => handleAddToCart(eventID)}>Add to Cart</button>
      {message && <p>{message}</p>}
      {/* Additional event details */}
    </div>
  );
};

export default EventDetails