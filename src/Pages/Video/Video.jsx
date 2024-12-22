import React from "react";
import "./Video.css";
import PlayVideo from "../../Components/Playvideo/PlayVideo";
import Recomended from "../../Components/Recomended/Recomended";
import { useParams } from "react-router-dom";
const Video = ({ data, setData }) => {
  const { videoId, categoryId } = useParams();
  return (
    <div className="play_container">
      <div className="left_side">
        <PlayVideo videoId={videoId} />
      </div>
      <div className="rigth_side">
        <Recomended data={data} setData={setData} />
      </div>
    </div>
  );
};

export default Video;
