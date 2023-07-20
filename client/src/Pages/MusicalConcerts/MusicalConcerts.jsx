import React from "react";
import Cards from "../../Components/Cards/Cards";
import "./MusicalConcerts.css";
import { useGetAllEventsQuery } from "../../store";
import Loader from "../../Components/Loader/Loader";

const MusicalConcerts = () => {
  const { data, isLoading, isFetching, isError } = useGetAllEventsQuery();
  const sortDate = (a, b) => {
    return new Date(a.eventDate) - new Date(b.eventDate);
  };
  const concerts = data?.data
    ?.filter((item) => item?.eventType === "concert")
    .slice()
    .sort((a, b) => sortDate(a, b));

  if (isLoading || isFetching) return <Loader />;

  if (isError) <h1>Something went wrong</h1>;

  return (
    <div className="home__pageItems--left">
      <h3 className="home__page__h3">Musical concerts</h3>
      <div className="concert__parent">
        {concerts?.map((item) => (
          <Cards key={item._id} {...item} />
        ))}
      </div>
      <button className="home__page--exploreBtn">See All</button>
    </div>
  );
};

export default MusicalConcerts;
