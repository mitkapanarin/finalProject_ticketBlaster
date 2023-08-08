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

  const sortDate = (a, b) => {
    return new Date(a.eventDate) - new Date(b.eventDate);
  };

  const isEventDatePassed = (eventDate) => {
    return dayjs(eventDate).isBefore(dayjs());
  };

  useEffect(() => {
    if (!isLoading && data) {
      const allEvents = [...data.data].sort((a, b) => sortDate(a, b));
      const upcomingEvents = allEvents.filter((item) => !isEventDatePassed(item?.eventDate));

      if (upcomingEvents.length > 0) {
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

  // Filter and display events
  const upcomingConcerts = data?.data
    ?.filter((item) => item?.eventType === "concert" && !isEventDatePassed(item?.eventDate))
    .sort((a, b) => sortDate(a, b))
    .slice(0, 5);

  const upcomingComedies = data?.data
    ?.filter((item) => item?.eventType === "comedy" && !isEventDatePassed(item?.eventDate))
    .sort((a, b) => sortDate(a, b))
    .slice(0, 5);

  return (
    <div>
      {randomEvent && <TopCard {...randomEvent} />}

      <div className="home__pageItems">
        <div className="home__pageItems--left">
          <h3 className="home__page__h3">Musical concerts</h3>
          {upcomingConcerts?.map((item) => (
            <Cards key={item._id} {...item} />
          ))}
          <button className="home__page--exploreBtn" onClick={handleSeeAllConcerts}>
            See All
          </button>
        </div>

        <div className="home__pageItems--right">
          <h3 className="home__page__h3">Standup comedy</h3>
          {upcomingComedies?.map((item) => (
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
