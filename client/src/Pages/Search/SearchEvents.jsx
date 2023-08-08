import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeSearchTerm } from "../../store/Slices/Search";
import "./SearchEvents.css"; // Make sure to adjust the path based on your project structure

export const SearchEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState({
    searchTerm: "",
  });

  // Handle the "Enter" key press event
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default "Enter" behavior (e.g., form submission)
      handleSubmit(); // Call the search submission function
    }
  };

  // Handle the search submission
  const handleSubmit = () => {
    dispatch(changeSearchTerm(searchQuery)); // Dispatch the search term to Redux store
    navigate("/DisplaySearchResult"); // Navigate to the search results page
    setSearchQuery({ searchTerm: "" }); // Clear the input field after submission
  };

  return (
    <form>
      <input
        type="text"
        className="input__search" 
        value={searchQuery.searchTerm}
        onChange={(e) =>
          setSearchQuery({
            ...searchQuery,
            searchTerm: e.target.value,
          })
        }
        onKeyDown={handleKeyDown} // Listen for "Enter" key press
        placeholder="Enter search query"
      />
    </form>
  );
};
