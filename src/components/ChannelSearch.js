import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchYoutubeChannelsByKeyword } from './slices/youtube';
import { useDebounce } from "./utils";

export default function ChannelSearch() {
  const debouncedTime = 500;
  const channelResults = useSelector(state => state.youtube.channelResults);
  let [searchTerm, setSearchTerm] = useState("");

  let debouncedSearchTerm = useDebounce(searchTerm, debouncedTime);

  const dispatch = useDispatch();

  //handle calling API when debouncedSearchTerm changes
  useEffect(() => {
    if (debouncedSearchTerm.length > 1) dispatch(fetchYoutubeChannelsByKeyword(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  //handle user typing
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChannelClick = (e, channelTitle) => {
    console.log("You choose ", channelTitle);
  };

  return (
    <>
      <div className="channel-search">
        <label htmlFor="channel-search-input"> Search for a channel by name: &nbsp;&nbsp;
          <input id="channel-search-input" type="text" onChange={handleChange} />
        </label>
      </div>
      <ul className="channel-results-lists">
        {channelResults.map(result => {
          return (
            <li className="container channel-results-item" key={result.id.channelId} onClick={(e) => handleChannelClick(e, result.snippet.channelTitle)}>
              <div className="row">
                <div className="col-2">
                  <img alt={result.snippet.thumbnails.title} src={result.snippet.thumbnails.default.url} />
                </div>
                <div className="col-10">
                  <div className="row channel-title">{result.snippet.channelTitle}</div>
                  <div className="row channel-">{result.snippet.description.slice(0, 80) + "..."}</div>
                </div>
              </div>
            </li>);
        })}
      </ul>
    </>
  );
}
