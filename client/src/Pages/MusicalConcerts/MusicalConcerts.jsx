import React from "react";
import Cards from "../../components/Cards/Cards";
import { concerts } from "../../temporaryDB";
import "./MusicalConcerts.css";


const MusicalConcerts = () => {
  return (
    <div>
        <div className="musical__pageItems">
          <h3 className="musical__page__h3">Musical concerts</h3>
          {concerts?.map((item) => (
            <Cards key={item.id} {...item} />
          ))}
          <button className="musical__page--exploreBtn">See All</button>
        </div>
      </div>
  );
};

export default MusicalConcerts;
