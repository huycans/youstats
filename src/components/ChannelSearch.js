import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";

import {
  fetchYoutubeChannelsByKeyword,
  fetchYoutubeChannelInfo,
  fetchYoutubePlaylistById
} from "./slices/youtube";
import { collapseSearchSection, expandSearchSection } from "./slices/display";
import { useDebounce } from "./utils";

export default function ChannelSearch() {
  const debouncedTime = 500;

  const shouldExpandSearchSection = useSelector(
    (state) => state.display.shouldExpandSearchSection
  );
  const channelResults = useSelector((state) => state.youtube.channelResults);
  let [searchTerm, setSearchTerm] = useState("");

  let debouncedSearchTerm = useDebounce(searchTerm, debouncedTime);

  const dispatch = useDispatch();

  //handle calling API when debouncedSearchTerm changes
  useEffect(() => {
    if (debouncedSearchTerm.length > 1) {
      dispatch(fetchYoutubeChannelsByKeyword(debouncedSearchTerm));
    }
  }, [debouncedSearchTerm, dispatch]);

  //handle user typing
  const handleChange = (event) => {
    dispatch(expandSearchSection());
    setSearchTerm(event.target.value);
  };

  const handleChannelClick = (e, channelId, playlistId) => {
    dispatch(collapseSearchSection());
    dispatch(fetchYoutubeChannelInfo(channelId));
    dispatch(fetchYoutubePlaylistById(playlistId));
  };

  return (
    <div
      className={classnames("col-12 channel-search-container", {
        "col-lg-3": !shouldExpandSearchSection,
        "col-lg-6": shouldExpandSearchSection
      })}
    >
      <div className="row channel-search">
        <h3>Search for a youtube channel by name</h3>
        <input
          data-testid="channel-search-input"
          id="channel-search-input"
          className="channel-search-input"
          type="text"
          onChange={handleChange}
        />
      </div>
      {channelResults.length > 0 ? (
        <>
          <h3>Search results: </h3>
          <ul
            className="channel-results-lists"
            data-testid="channel-result-lists"
          >
            {channelResults.map((result, index) => {
              return (
                <li
                  data-testid="channel-result-items"
                  className="container channel-results-item"
                  key={result.id.channelId}
                  onClick={(e) =>
                    handleChannelClick(
                      e,
                      result.id.channelId,
                      result.contentDetails.relatedPlaylists.uploads
                    )
                  }
                >
                  <div className="row">
                    <div
                      className={classnames({
                        "col-2": shouldExpandSearchSection,
                        "col-6": !shouldExpandSearchSection
                      })}
                    >
                      <img
                        className="channel-results-logo"
                        alt={result.snippet.thumbnails.title}
                        src={result.snippet.thumbnails.default.url}
                        data-testid={"channel-result-items-logo"}
                      />
                    </div>
                    <div
                      className={classnames({
                        "col-10": shouldExpandSearchSection,
                        "col-6": !shouldExpandSearchSection
                      })}
                    >
                      <div
                        className="row channel-title"
                        data-testid={"channel-result-items-title"}
                      >
                        {result.snippet.title}
                      </div>
                      {shouldExpandSearchSection ? (
                        <div className="row channel-">
                          {result.snippet.description.slice(0, 80) + "..."}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
    </div>
  );
}
