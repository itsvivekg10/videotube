import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import menu_icon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search.png";
import upload_icon from "../../assets/upload.png";
import more_icon from "../../assets/more.png";
import notification_icon from "../../assets/notification.png";
import profile from "../../assets/profile.jpg";

const NavBar = ({ data, searchData, setSearchData }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const searchResultsRef = useRef(null); // Create a ref for the search results banner

  // Use effect to debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      const filteredData = data.filter((item) =>
        item.snippet.channelTitle
          .toLowerCase()
          .includes(debouncedQuery.toLowerCase())
      );
      console.log("this is filtered data", filteredData);
      setSearchData(filteredData);
    } else {
      // Clear search data if the query is empty
      setSearchData([]); // Clear the search data when the input is cleared
    }
  }, [debouncedQuery, data, setSearchData]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
  };

  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img className="menu-icon" src={menu_icon} alt="menu icon" />
        <Link to="/">
          <img className="logo" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={handleSearch}
          />
          <img src={search_icon} alt="search icon" />
        </div>
      </div>
      <div className="nav-right">
        <img src={upload_icon} alt="upload icon" />
        <img src={more_icon} alt="more icon" />
        <img src={notification_icon} alt="notification icon" />
        <img src={profile} className="user-icon" alt="profile icon" />
      </div>
    </nav>
  );
};

export default NavBar;
