import React, { useEffect, useState } from "react";
import "./Playvideo.css";
import { value_converter } from "../../data/data";
import moment from "moment";
import like from "../../assets/like.png";
import likd from "../../assets/likd.png";
import dislikd from "../../assets/dislikd.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { API_KEY } from "../../data/data";

const PlayVideo = ({ videoId }) => {
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subscribe, setSubscribe] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const handleLike = () => {
    if (liked) {
      setLiked(false); // Unmark like
    } else {
      setLiked(true); // Mark like
      setDisliked(false);
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
      setDisliked("liked");
    } else {
      setDisliked(true);
      setLiked(false);
    }
  };
  const handleSubscribe = () => {
    setSubscribe(true);
  };
  const handleUnsubscribe = () => {
    setSubscribe(false);
  };
  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        const res = await fetch(videoDetails_url);
        const data = await res.json();
        setApiData(data.items[0]);
      } catch (err) {
        setError(err);
      }
    };

    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    const fetchChannelData = async () => {
      if (apiData) {
        try {
          const channelDetail_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
          const res = await fetch(channelDetail_url);
          const data = await res.json();
          setChannelData(data.items[0]); // Fetch the first item directly
          const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
          const commentRes = await fetch(commentUrl);
          const commentData = await commentRes.json();
          setComment(commentData.items);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchChannelData();
  }, [apiData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <div className="play-video-info">
        <div className="video-text">
          <h3>{apiData ? apiData.snippet.title : "title here"}</h3>
        </div>
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : ""}{" "}
          views&bull;
          {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
        </p>

        <div>
          <span onClick={handleLike}>
            <img src={liked ? likd : like} alt="like" />
            {apiData ? value_converter(apiData.statistics.likeCount) : ""}
          </span>
          <span onClick={handleDislike}>
            <img src={disliked ? dislikd : dislike} alt="dislike" />
            {apiData ? value_converter(apiData.statistics.dislikeCount) : ""}
          </span>
          <span>
            <img src={share} alt="share" />
          </span>
          <span>
            <img src={save} alt="save" />
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={channelData ? channelData.snippet.thumbnails.default.url : ""}
          alt="publisher"
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : "description here"}</p>
          <span>
            {channelData
              ? value_converter(channelData.statistics.subscriberCount)
              : ""}{" "}
            Subscribers
          </span>
        </div>
        {subscribe ? (
          <button onClick={handleUnsubscribe}>SUBSCRIBED</button>
        ) : (
          <button onClick={handleSubscribe}>SUBSCRIBE</button>
        )}
      </div>
      <div className="vid_description">
        <p>{apiData ? apiData.snippet.description : "description here"}</p>
        <hr />
        <h4>
          {apiData ? value_converter(apiData.statistics.commentCount) : ""}{" "}
          Comments
        </h4>
        {comment.map((item, index) => {
          return (
            <div key={index} className="comment">
              <img
                src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
                alt="user profile"
              />
              <div>
                <h3>
                  {item.snippet.topLevelComment.snippet.authorDisplayName}
                </h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayVideo;
