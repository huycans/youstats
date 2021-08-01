import React from "react";

export default function EmbedYoutubeVideo({ videoId }) {
  if (videoId && videoId != "NA") {
    return (
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  } else return "No video found for this channel";
}
