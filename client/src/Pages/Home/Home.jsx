import React from "react";
import Cards from "../../components/Cards/Cards";
import { concerts } from "../../temporaryDB";
import TopCard from "../../components/TopCard/TopCard";
import "./Home.css";
import Checkout from "../Checkout/Checkout";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import Purchase from "../Purchase/Purchase";
import PrintModal from "../../components/PrintModal/PrintModal";

const Home = () => {
  return (
    <div>
      <TopCard />
      <div className="home__pageItems">
        <div className="home__pageItems--left">
          <h3 className="home__page__h3">Musical concerts</h3>
          {concerts?.map((item) => (
            <Cards key={item.id} {...item} />
          ))}
          <button className="home__page--exploreBtn">See All</button>
        </div>
        <div className="home__pageItems--right">
          <h3 className="home__page__h3">standup comedy</h3>
          {concerts?.map((item) => (
            <Cards key={item.id} {...item} />
          ))}
          <button className="home__page--exploreBtn">See All</button>
        </div>
      </div>
      <Checkout/>
      <ShoppingCart/>
      <Purchase/>
      <PrintModal/>
    </div>
  );
};

export default Home;
