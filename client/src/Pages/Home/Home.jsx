import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import Cards from "../../Components/Cards/Cards";
import TopCard from "../../components/TopCard/TopCard";
import "./Home.css";
import { useGetAllEventsQuery } from "../../store";
import Loader from "../../Components/Loader/Loader";
import dayjs from "dayjs";

const Home = () => {
  const { data, isLoading, isFetching, isError } = useGetAllEventsQuery();
  const [randomEvent, setRandomEvent] = useState(null);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    // The useEffect hook runs on initial render and whenever the data or isLoading changes.

    if (!isLoading && data) {
      // When isLoading is false and data is available, process the events.

      // Function to sort events based on their eventDate.
      const sortDate = (a, b) => new Date(a.eventDate) - new Date(b.eventDate);

      // Function to check if the event date has passed.
      const isEventDatePassed = (eventDate) => dayjs(eventDate).isBefore(dayjs());

      // Filter events that have not passed, sort them by date, and store them in allEvents.
      const allEvents = data.data
        .filter((item) => !isEventDatePassed(item.eventDate))
        .slice()
        .sort((a, b) => sortDate(a, b));

      // Filter concerts and comedies separately from allEvents.
      const concerts = allEvents.filter((item) => item.eventType === "concert");
      const comedies = allEvents.filter((item) => item.eventType === "comedy");

      if (allEvents.length > 0) {
        // If there are events left after filtering, select a random event from allEvents.
        const randomIndex = Math.floor(Math.random() * allEvents.length);
        setRandomEvent(allEvents[randomIndex]);
      }
    }
  }, [data, isLoading]); // The useEffect hook will re-run whenever data or isLoading changes.

  if (isLoading || isFetching) return <Loader />;

  if (isError) {
    return <h1>Something went wrong</h1>;
  }

  // Event handler to navigate to the "Standup comedy" page
  const handleSeeAllComedies = () => {
    navigate("/stand-up-comedies");
  };

  // Event handler to navigate to the "Musical concerts" page
  const handleSeeAllConcerts = () => {
    navigate("/musical-concerts");
  };

  return (
    <div>
      {randomEvent && <TopCard {...randomEvent} />}

      <div className="home__pageItems">
        <div className="home__pageItems--left">
          <h3 className="home__page__h3">Musical concerts</h3>
          {/* Conditional rendering for concerts */}
          {data?.data &&
            data.data
              .filter((item) => item.eventType === "concert")
              .map((item) => <Cards key={item._id} {...item} />)}
          <button className="home__page--exploreBtn" onClick={handleSeeAllConcerts}>
            See All
          </button>
        </div>
        <div className="home__pageItems--right">
          <h3 className="home__page__h3">Standup comedy</h3>
          {/* Conditional rendering for comedies */}
          {data?.data &&
            data.data
              .filter((item) => item.eventType === "comedy")
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
