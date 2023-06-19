import React from "react";
import Cards from "../../components/Cards/Cards";
import { concerts } from "../../temporaryDB";
import "./MusicalConcerts.css";


const MusicalConcerts = () => {
  return (
    <div>
      <h3 className="musical__page__h3">Musical concerts</h3>
      <div className="musical__pageItems">
        {concerts?.map((item) => (
          <Cards key={item.id} {...item} />
        ))}
      </div>
      <button className="musical__page--exploreBtn">See All</button>
    </div>
  );
};

export default MusicalConcerts;
