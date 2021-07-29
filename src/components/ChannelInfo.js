import React from "react";
import { Image, Table } from "react-bootstrap";

export default function ChannelInfo({ currentChannel }) {
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
                    <td>{currentChannel.onYoutubeSince} </td>
                  </tr>
                  <tr>
                    <td>Total viewcount </td>
                    <td>{currentChannel.viewCount} </td>
                  </tr>
                  <tr>
                    <td>Total subscriber </td>
                    <td>{currentChannel.subscriberCount} </td>
                  </tr>
                  <tr>
                    <td>Total videos uploaded </td>
                    <td>{currentChannel.videoCount} </td>
                  </tr>
                  <tr>
                    <td>Base country </td>
                    <td>{currentChannel.country} </td>
                  </tr>
                  <tr>
                    <td>Is kids friendly? </td>
                    <td>{currentChannel.kidsFriendly ? "Yes" : "No"} </td>
                  </tr>
                  <tr>
                    <td>Topics </td>
                    <td>
                      {currentChannel.topics.map((topic) => (
                        <span key={topic}>{topic}</span>
                      ))}{" "}
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
