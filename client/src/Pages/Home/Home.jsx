import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cards from "../../Components/Cards/Cards";
import TopCard from "../../components/TopCard/TopCard";
import "./Home.css";
import { useGetAllEventsQuery } from "../../store";
import Loader from "../../Components/Loader/Loader";
import dayjs from "dayjs";

const Home = () => {
  const { data, isLoading, isFetching, isError } = useGetAllEventsQuery();
  const [randomEvent, setRandomEvent] = useState(null);

  const navigate = useNavigate();

  // Function to compare event dates for sorting
  const sortDate = (a, b) => {
    return new Date(a.eventDate) - new Date(b.eventDate);
  };

  // Function to check if an event date has passed
  const isEventDatePassed = (eventDate) => {
    return dayjs(eventDate).isBefore(dayjs());
  };

  useEffect(() => {
    if (!isLoading && data) {
      
      // Create a copy of all events and sort them by date
      const allEvents = [...data.data].sort((a, b) => sortDate(a, b));

      // Filter events that have not passed.
      const upcomingEvents = allEvents.filter((item) => !isEventDatePassed(item?.eventDate));

      if (upcomingEvents.length > 0) {
        // Select a random event from upcomingEvents.
        const randomIndex = Math.floor(Math.random() * upcomingEvents.length);
        setRandomEvent(upcomingEvents[randomIndex]);
      }
    }
  }, [data, isLoading]);

  if (isLoading || isFetching) return <Loader />;

  if (isError) {
    return <h1>Something went wrong</h1>;
  }

  const handleSeeAllComedies = () => {
    navigate("/stand-up-comedies");
  };

  const handleSeeAllConcerts = () => {
    navigate("/musical-concerts");
  };

  return (
    <div>
      {randomEvent && <TopCard {...randomEvent} />}

      <div className="home__pageItems">
        <div className="home__pageItems--left">
          <h3 className="home__page__h3">Musical concerts</h3>
          {/* Display the first 5 sorted concerts */}
          {data?.data
            ?.filter((item) => item?.eventType === "concert" && !isEventDatePassed(item?.eventDate))
            .slice(0, 5)
            .sort((a, b) => sortDate(a, b))
            .map((item) => (
              <Cards key={item._id} {...item} />
            ))}
          <button className="home__page--exploreBtn" onClick={handleSeeAllConcerts}>
            See All
          </button>
        </div>
        <div className="home__pageItems--right">
          <h3 className="home__page__h3">Standup comedy</h3>
          {/* Display the first 5 sorted comedies */}
          {data?.data
            ?.filter((item) => item?.eventType === "comedy" && !isEventDatePassed(item?.eventDate))
            .slice(0, 5)
            .sort((a, b) => sortDate(a, b))
            .map((item) => (
              <Cards key={item._id} {...item} />
            ))}
          <button className="home__page--exploreBtn" onClick={handleSeeAllComedies}>
            See All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
