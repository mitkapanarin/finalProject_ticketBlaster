import React, {useState, useEffect} from "react";
import Cards from "../../Components/Cards/Cards";
import TopCard from "../../components/TopCard/TopCard";
import "./Home.css";
import { useGetAllEventsQuery } from "../../store";
import Loader from "../../Components/Loader/Loader";
import dayjs from "dayjs";


const Home = () => {
  const { data, isLoading, isFetching, isError } = useGetAllEventsQuery();
  const sortDate = (a, b) => {
    return new Date(a.eventDate) - new Date(b.eventDate);
  };

  const isEventDatePassed = (eventDate) => {
    return dayjs(eventDate).isBefore(dayjs());
  };

  const concerts = data?.data
    ?.filter((item) => item?.eventType === "concert" && !isEventDatePassed(item?.eventDate))
    .slice()
    .sort((a, b) => sortDate(a, b));

  const comedies = data?.data
    ?.filter((item) => item?.eventType === "comedy" && !isEventDatePassed(item?.eventDate))
    .slice()
    .sort((a, b) => sortDate(a, b));

  if (isLoading || isFetching) return <Loader />;

  if (isError) {
    return <h1>Something went wrong</h1>;
  }

  const allEvents = [...concerts, ...comedies];
  const [randomEvent, setRandomEvent] = useState(null);

  useEffect(() => {
    if (allEvents.length > 0) {
      const randomIndex = Math.floor(Math.random() * allEvents.length);
      setRandomEvent(allEvents[randomIndex]);
    }
  }, [allEvents]);

  return (
    <div>
      {randomEvent && <TopCard {...randomEvent} />}
      <div className="home__pageItems">
        <div className="home__pageItems--left">
          <h3 className="home__page__h3">Musical concerts</h3>
          {concerts?.map((item) => (
            <Cards key={item._id} {...item} />
          ))}
          <button className="home__page--exploreBtn">See All</button>
        </div>
        <div className="home__pageItems--right">
          <h3 className="home__page__h3">Standup comedy</h3>
          {comedies?.map((item) => (
            <Cards key={item._id} {...item} />
          ))}
          <button className="home__page--exploreBtn">See All</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
