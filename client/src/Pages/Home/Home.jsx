import React from "react";
import Cards from "../../components/Cards/Cards";
import TopCard from "../../components/TopCard/TopCard";
import "./Home.css";
import Checkout from "../Checkout/Checkout";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import Purchase from "../Purchase/Purchase";
import PrintModal from "../../components/PrintModal/PrintModal";
import EventDetails from "../EventDetails/EventDetails";
import {useGetAllEventsQuery} from "../../store/API/eventApi"

const Home = () => {
  const { data } = useGetAllEventsQuery();
  console.log(data?.data)
  const concerts = data?.data?.filter((item) => item?.eventType === "concert");
  const comedies = data?.data?.filter((item) => item?.eventType === "comedy");

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
          <h3 className="home__page__h3">standup comedy</h3>
          {comedies?.map((item) => (
            <Cards key={item._id} {...item} />
          ))}
          <button className="home__page--exploreBtn">See All</button>
        </div>
      </div>
      <Checkout/>
      <ShoppingCart/>
      <Purchase/>
      <PrintModal/>
      <EventDetails/>
    </div>
  );
};

export default Home;
