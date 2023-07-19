import React from "react";
import Cards from "../../components/Cards/Cards";
import { useGetAllEventsQuery } from "../../store";
import "./StandUpComedies.css";
import Loader from "../../Components/Loader/Loader";

const StandUpComedies = () => {
  const { data, isLoading, isFetching, isError } = useGetAllEventsQuery();
  const sortDate = (a, b) => {
    return new Date(a.eventDate) - new Date(b.eventDate);
  };
  const comedies = data?.data
    ?.filter((item) => item?.eventType === "comedy")
    .slice()
    .sort((a, b) => sortDate(a, b));

    if (isLoading || isFetching) return <Loader />;

    if (isError) <h1>Something went wrong</h1>;

  return (
    <div className="home__pageItems--right">
      <h3 className="home__page__h3">Standup comedy</h3>
      <div className="concert__parent">
        {comedies?.map((item) => (
          <Cards key={item._id} {...item} />
        ))}
      </div>
      <button className="home__page--exploreBtn">See All</button>
    </div>
  );
};

export default StandUpComedies;
