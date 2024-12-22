import React, { useEffect } from "react";
import "./Feed.css";
import thumbnail1 from "../../assets/thumbnail1.png";
import { API_KEY } from "../../data/data";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { value_converter } from "../../data/data";

const Feed = ({ category, data, setData, setSearchQuery, searchData }) => {
  const fetchData = async () => {
    const videoListUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=us&videoCategoryId=${category}&key=${API_KEY}`;

    try {
      const response = await fetch(videoListUrl);
      const result = await response.json();
      setData(result.items);
      console.log(result);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="feed">
      {(searchData && searchData.length > 0 ? searchData : data).map((item) => {
        const { id, snippet } = item;
        const { title, channelTitle, thumbnails } = snippet;

        return (
          <Link
            to={`video/${snippet.categoryId}/${id}`}
            className="video_sec"
            key={id}
          >
            <img src={thumbnails?.medium?.url || thumbnail1} alt={title} />
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
