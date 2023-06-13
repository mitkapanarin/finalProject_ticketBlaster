import React from "react";
import Cards from "../../components/Cards/Cards";
import { concerts } from "../../temporaryDB";
import { comedies } from "../../comediesTemporaryDb";
import TopCard from "../../components/TopCard/TopCard";
import ProfileDashboard from "../Dashboard/User/ProfileDashboard";
import Events from "../Events/Events";
import "./Home.css";

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
      <Events />
    </div>
  );
};

export default Home;
