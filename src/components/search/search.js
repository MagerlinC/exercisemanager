import React from "react";
import SearchIcon from "../../assets/search.svg";
import "./search.scss";

function Search({ tooltip: placeholder, onSearchChange }) {
  return (
    <div className={"search"}>
      <img className={"search-icon"} src={SearchIcon} alt="search-icon" />
      <input
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder || "search"}
        className={"search-input"}
      />
    </div>
  );
}
export default Search;
