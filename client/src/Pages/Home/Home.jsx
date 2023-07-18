import React from "react";
import Cards from "../../components/Cards/Cards";
import TopCard from "../../components/TopCard/TopCard";
import "./Home.css";
import Checkout from "../Checkout/Checkout";
import { useGetAllEventsQuery } from "../../store";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import Purchase from "../Purchase/Purchase";
import PrintModal from "../../components/PrintModal/PrintModal";

const Home = () => {
  const { data } = useGetAllEventsQuery();
  const sortDate = (a, b) => {
    return new Date(a.eventDate) - new Date(b.eventDate);
  };

  const concerts = data?.data
    ?.filter((item) => item?.eventType === "concert")
    .slice()
    .sort((a, b) => sortDate(a, b));
  const comedies = data?.data
    ?.filter((item) => item?.eventType === "comedy")
    .slice()
    .sort((a, b) => sortDate(a, b));

  return (
    <div>
      <TopCard />
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
