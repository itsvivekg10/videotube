import React, { useState } from "react";
import "./Home.css";
import SideBar from "../../Components/Sidebar/SideBar";
import Feed from "../../Components/Feed/Feed";
const Home = ({ data, setData }) => {
  const [category, setCategory] = useState(0);
  return (
    <div className="main_container">
      <SideBar category={category} setCategory={setCategory} />
      <div className="feed_container">
        <Feed category={category} data={data} setData={setData} />
      </div>
    </div>
  );
};

export default Home;
