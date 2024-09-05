import NavBar from "./Components/Navbar/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Video from "./Pages/Video/Video";
import { useState } from "react";
const App = () => {
  const [data, setData] = useState([]);

  return (
    <div className="app">
      <NavBar data={data} />
      <Routes>
        <Route path="/" element={<Home data={data} setData={setData} />} />
        <Route
          path="/video/:categoryId/:videoId"
          element={<Video data={data} setData={setData} />}
        />
      </Routes>
    </div>
  );
};

export default App;
