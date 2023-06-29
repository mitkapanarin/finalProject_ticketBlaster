import React from "react";
import Cards from "../../components/Cards/Cards";
import { useGetAllEventsQuery } from "../../store";
import "./StandUpComedies.css";


const StandUpComedies = () => {
  const { data } = useGetAllEventsQuery();
  console.log(data?.data)
  const comedies = data?.data?.filter((item) => item?.eventType === "comedy");

  return (
    <div className="home__pageItems--right">
    <h3 className="home__page__h3">Standup comedy</h3>
    {comedies?.map((item) => (
      <Cards key={item._id} {...item} />
    ))}
    <button className="home__page--exploreBtn">See All</button>
  </div>
  );
};

export default StandUpComedies;
