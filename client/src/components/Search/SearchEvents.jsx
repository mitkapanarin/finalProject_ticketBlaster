import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeSearchTerm } from "../../store/Slices/Search";

export const SearchEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState({
    searchTerm: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeSearchTerm(searchQuery));
    navigate("/DisplaySearchResult");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchQuery.searchTerm}
        onChange={(e) =>
          setSearchQuery({
            ...searchQuery,
            searchTerm: e.target.value,
          })
        }
        placeholder="Enter search query"
      />
      <button type="submit">Search</button>
    </form>
  );
};
