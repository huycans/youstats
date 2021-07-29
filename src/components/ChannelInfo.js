import React from "react";
import { Image, Table } from "react-bootstrap";
import countryCodes from "./lib/countryCodes.json";
import topicList from "./lib/topicList.json";

export default function ChannelInfo({ currentChannel }) {
  const displayCount = (number) => {
    return new Intl.NumberFormat().format(parseInt(number));
  };
  const displaySubCount = (number) => {
    const subCount = parseInt(number);
    if (subCount < 10 ** 3) {
      return number;
    } else if (subCount < 10 ** 6) {
      return (subCount / 10 ** 3).toFixed(2) + "K";
    } else if (subCount < 10 ** 9) {
      return (subCount / 10 ** 6).toFixed(2) + "M";
    }
  };
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  const convertTopicIdsToReadableNames = (topicArray) =>
    topicArray.map((topic) => topicList[topic].name + "");
  const linkToYoutubeChannel = `https://www.youtube.com/channel/${currentChannel.channelId}`;
  return (
    <div className="container current-channel-info">
      {currentChannel.isEmpty ? null : (
        <>
          <div className="row">
            <Image
              rounded
              className="current-channel-banner"
              alt="current channel banner"
              src={currentChannel.bannerURL}
            />
          </div>
          <div className="row">
            <div className="col-12 col-md-3 current-channel-overview text-center">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={linkToYoutubeChannel}
              >
                <Image
                  roundedCircle
                  className="current-channel-thumbnail"
                  alt="current channel thumbnail"
                  src={currentChannel.thumbnailBig}
                />
              </a>

              <div className="channel-title-description">
                <h3>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={linkToYoutubeChannel}
                  >
                    {currentChannel.title}
                  </a>
                </h3>
                <p>{currentChannel.description}</p>
              </div>
            </div>
            <div className="col-12 col-md-9 current-channel-details">
              <Table bordered hover size="sm">
                <tbody>
                  <tr>
                    <td>On youtube since </td>
                    <td>{formatDate(currentChannel.onYoutubeSince)} </td>
                  </tr>
                  <tr>
                    <td>Total viewcount </td>
                    <td>{displayCount(currentChannel.viewCount)} </td>
                  </tr>
                  <tr>
                    <td>Total subscriber </td>
                    <td>{displaySubCount(currentChannel.subscriberCount)} </td>
                  </tr>
                  <tr>
                    <td>Total videos uploaded </td>
                    <td>{displayCount(currentChannel.videoCount)} </td>
                  </tr>
                  <tr>
                    <td>Base country </td>
                    <td>
                      {
                        countryCodes.find(
                          (country) =>
                            country["alpha-2"] === currentChannel.country
                        ).name
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Is kids friendly? </td>
                    <td>{currentChannel.kidsFriendly ? "Yes" : "No"} </td>
                  </tr>
                  <tr>
                    <td>Top topics on this channel </td>
                    <td>
                      <ul className="topic-list">
                        {convertTopicIdsToReadableNames(
                          currentChannel.topics
                        ).map((topic) => (
                          <li className="topic-item">{topic}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
