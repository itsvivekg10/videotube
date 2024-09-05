import React from "react";
import "./Recomended.css"; // Make sure this file exists and is correctly set up
import { Link } from "react-router-dom";

const Recomended = ({ data, setData }) => {
  return (
    <div className="recomended">
      <div className="side-video-list">
        {data.map((item, index) => {
          const { id, snippet } = item;
          const { title, channelTitle, thumbnails } = snippet;
          const thumbnailUrl = thumbnails.default.url; // You can use medium or high resolution as needed

          return (
            <div key={id} className="video-item">
              <Link to={`/video/${snippet.categoryId}/${id}`} key={id}>
                <img src={thumbnailUrl} alt={title} />
              </Link>
              <div className="video-info">
                <h4>{title}</h4>
                <p>{channelTitle}</p>
                {/* You may want to add view count and other dynamic info here */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recomended;
