import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { GoogleLogout } from "react-google-login";

import youtubeIcon from "../static/images/youtube-icon.png";

export default function NavigationBar({ signedin, handleSignout }) {
  return (
    <header className="App-header container">
      <Navbar expand="md" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt="Youtube logo"
              src={youtubeIcon}
              width="40"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Stats
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="responsive-navbar-nav"
          >
            <Nav.Item>
              {signedin ? (
                <GoogleLogout
                  clientId={process.env.REACT_APP_CLIENTID}
                  buttonText="Sign out"
                  onLogoutSuccess={handleSignout}
                  render={(renderProps) => (
                    <button
                      className="signout-btn"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      Sign out
                    </button>
                  )}
                ></GoogleLogout>
              ) : null}
            </Nav.Item>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
