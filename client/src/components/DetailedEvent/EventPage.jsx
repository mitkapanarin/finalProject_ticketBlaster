import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from "react-redux";
// import { useGetAllEventsQuery } from "../../store/API/eventApi"

import axios from 'axios';

export const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // const store = useSelector(x => x)
  // console.log(store)
  // const dispatch = useDispatch()
  // const { data } = useGetAllEventsQuery()
  // console.log(data)

 
  // return (
  //   <div>
  //     <h2>Events</h2>
  //     {data.map((item) => (
  //       <Link key={item._id} to={`/events/${item._id}`}>
  //         {item.eventName}
  //       </Link>
  //     ))}
  //   </div>
  // );

  useEffect(() => {
    // Fetch events from the backend
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:9001/api/v1/events/get-all-events');
        setEvents(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (events.length === 0) {
    return <div>No events found</div>;
  }

  return (
    <div>
      <h2>Events</h2>
      {events.map((event) => (
        <Link key={event._id} to={`/events/${event._id}`}>
          {event.eventName}
        </Link>
      ))}
    </div>
  );
};
