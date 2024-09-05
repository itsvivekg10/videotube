import React, { useEffect, useState } from "react";
import "./Feed.css";
import thumbnail1 from "../../assets/thumbnail1.png";
import { API_KEY } from "../../data/data";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { value_converter } from "../../data/data";
const Feed = ({ category, data, setData }) => {
  // State to store fetched data
  // const [data, setData] = useState([]);

  // Fetch data from YouTube API
  const fetchData = async () => {
    const videoListUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=us&videoCategoryId=${category}&key=${API_KEY}`;

    try {
      const response = await fetch(videoListUrl);
      const result = await response.json();
      setData(result.items); // Update state with fetched data
      console.log(result);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  // Call fetchData when the component mounts or when the category changes
  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="feed">
      {data.map((item, index) => {
        const { id, snippet } = item;
        const { title, channelTitle, thumbnails } = snippet;

        return (
          <Link
            to={`video/${snippet.categoryId}/${id}`}
            className="video_sec"
            key={id} // Add a unique key prop
          >
            <img
              src={thumbnails?.medium?.url || thumbnail1} // Use API thumbnail or fallback
              alt={title}
            />
            <div className="video-info">
              <h2>{title}</h2>
              <h3>{channelTitle}</h3>
              <p>
                {value_converter(item.statistics.viewCount)} views&bull;
                {moment(item.snippet.publishedAt).fromNow()}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Feed;
