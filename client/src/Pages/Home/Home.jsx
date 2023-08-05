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

  useEffect(() => {
    if (!isLoading && data) {
      // Function to check if an event date has passed
      const isEventDatePassed = (eventDate) => dayjs(eventDate).isBefore(dayjs());

      // Filter events that have not passed, sort them by date, and store them in allEvents.
      const allEvents = data.data
        .filter((item) => !isEventDatePassed(item?.eventDate))
        .sort((a, b) => sortDate(a, b));

      // Separate concerts and comedies from allEvents.
      const concerts = allEvents.filter((item) => item.eventType === "concert");
      const comedies = allEvents.filter((item) => item.eventType === "comedy");

      if (allEvents.length > 0) {
        // Select a random event from allEvents.
        const randomIndex = Math.floor(Math.random() * allEvents.length);
        setRandomEvent(allEvents[randomIndex]);
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
          {data?.data &&
            data.data
              .filter((item) => item.eventType === "concert")
              .slice(0, 5)
              .sort((a, b) => sortDate(a, b))
              .map((item) => <Cards key={item._id} {...item} />)}
          <button className="home__page--exploreBtn" onClick={handleSeeAllConcerts}>
            See All
          </button>
        </div>
        <div className="home__pageItems--right">
          <h3 className="home__page__h3">Standup comedy</h3>
          {/* Display the first 5 sorted comedies */}
          {data?.data &&
            data.data
              .filter((item) => item.eventType === "comedy")
              .slice(0, 5)
              .sort((a, b) => sortDate(a, b))
              .map((item) => <Cards key={item._id} {...item} />)}
          <button className="home__page--exploreBtn" onClick={handleSeeAllComedies}>
            See All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
