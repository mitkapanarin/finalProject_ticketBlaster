import React from "react";
import { useSearchEventsQuery } from "../../store/API/eventApi";
import { useSelector } from "react-redux";
import Cards from "../../Components/Cards/Cards";
import "./DisplaySearchResult.css"

const DisplaySearchResult = () => {
  const searchTerm = useSelector((state) => state.SearchTerm.searchTerm);
  const { data, error, isLoading } = useSearchEventsQuery(searchTerm);
  console.log(data);
  return (
    <div>
      <h2 className="h2__search">Search Results for: {searchTerm}</h2>
      {data?.events?.map((event) => {
        return <Cards key={event?._id} {...event} />;
      })}
      {data?.events?.length === 0 && <h1>No events found</h1>}
    </div>
  );
};

export default DisplaySearchResult;
