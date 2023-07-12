import React from "react";
import Cards from "../../components/Cards/Cards";
import "./MusicalConcerts.css";
import { useGetAllEventsQuery } from "../../store";

const MusicalConcerts = () => {
  const { data } = useGetAllEventsQuery();
  const sortDate = (a, b) => {
    return new Date(a.eventDate) - new Date(b.eventDate);
  };
  const concerts = data?.data
    ?.filter((item) => item?.eventType === "concert")
    .slice()
    .sort((a, b) => sortDate(a, b));

  return (
    <div className="home__pageItems--left">
      <h3 className="home__page__h3">Musical concerts</h3>
      {concerts?.map((item) => (
        <Cards key={item._id} {...item} />
      ))}
      <button className="home__page--exploreBtn">See All</button>
    </div>
  );
};

export default MusicalConcerts;
