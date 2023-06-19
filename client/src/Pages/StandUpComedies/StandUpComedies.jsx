import React from "react";
import Cards from "../../components/Cards/Cards";
import { concerts } from "../../temporaryDB";
import "./StandUpComedies.css";


const StandUpComedies = () => {
  return (
    <div>
      <h3 className="comedies__page__h3">Stand-Up Comedies</h3>
      <div className="comediesHome__pageItems">
        {concerts?.map((item) => (
          <Cards key={item.id} {...item} />
        ))}
      </div>
      <button className="comedies__page--exploreBtn">See All</button>
    </div>
  );
};

export default StandUpComedies;
