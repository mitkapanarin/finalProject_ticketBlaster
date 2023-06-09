import React from "react";
import Cards from "../../components/Cards/Cards";
import "../../components/Cards/Cards.css"
import { concerts } from "../../temporaryDB";

const Home = () => {
  return (
    <div>
      <div className="main-home">
        {concerts?.map((item) => {
          return (
            <Cards
              {...item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
