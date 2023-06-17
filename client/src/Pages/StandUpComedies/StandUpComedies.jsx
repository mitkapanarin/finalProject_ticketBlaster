import React from "react";
import Cards from "../../components/Cards/Cards";
import { concerts } from "../../temporaryDB";
import "./StandUpComedies.css";


const StandUpComedies = () => {
  return (
    <div>
        <div className="comediesHome__pageItems">
          <h3 className="comedies__page__h3">Stand-Up Comedies</h3>
          {concerts?.map((item) => (
            <Cards key={item.id} {...item} />
          ))}
          <button className="comedies__page--exploreBtn">See All</button>
        </div>
      </div>
  );
};

export default StandUpComedies;
