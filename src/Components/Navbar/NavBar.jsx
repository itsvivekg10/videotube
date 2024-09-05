import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import menu_icon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search.png";
import upload_icon from "../../assets/upload.png";
import more_icon from "../../assets/more.png";
import notification_icon from "../../assets/notification.png";
import profile from "../../assets/profile.jpg";

const NavBar = ({ data }) => {
  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img className="menu-icon" src={menu_icon} alt="menuicon" />
        <Link to="/">
          {" "}
          <img className="logo" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="nav-middile flex-div">
        <div className="search-box flex-div">
          {" "}
          <input type="text" placeholder="search" />
          <img src={search_icon} />
        </div>
      </div>
      <div className="nav-right flex-div">
        <img src={upload_icon} />
        <img src={more_icon} />
        <img src={notification_icon} />
        <img src={profile} className="user-icon" />
      </div>
    </nav>
  );
};

export default NavBar;
