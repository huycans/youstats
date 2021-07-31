import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import Spinner from "react-bootstrap/Spinner";
import classnames from "classnames";

import { signInSuccess, resetAuth } from "./components/slices/auth";
import NavigationBar from "./components/NavigationBar";

import "./components/styles/App.scss";
import ChannelSearch from "./components/ChannelSearch";
import ChannelInfo from "./components/ChannelInfo";

function App() {
  const dispatch = useDispatch();

  //selectors used

  const currentChannel = useSelector((state) => state.youtube.currentChannel);

  //states of the app
  // loading state
  let [signedin, setSignedin] = useState(false);
  let [loading, setLoading] = useState(() => {
    //check if there's already google auth object in cookie and set loading accordingly
    if (document.cookie.indexOf("G_AUTHUSER_H") != -1) {
      return true;
    }
    return false;
  });

  /**
   * Reset all the states in the app to default values and remove any token in localstorage
   *
   */
  const resetState = () => {
    setSignedin(false);
    dispatch(resetAuth);
  };

  const handleSignin = (userProfile) => {
    setLoading(false);
    const { tokenId, profileObj, tokenObj } = userProfile;
    setSignedin(true);
    dispatch(signInSuccess({ tokenId, profileObj, tokenObj }));
  };

  const handleSignout = () => {
    setLoading(true);
    resetState();
    setLoading(false);
  };

  return (
    <div className="App">
      <NavigationBar
        signedin={signedin}
        handleSignout={handleSignout}
      ></NavigationBar>
      <main className="container">
        <h1 className="app-title"> Welcome to YouStats</h1>
        {loading ? (
          <div className="loading-spinner d-flex justify-content-center align-items-center">
            <Spinner
              data-testid="loading-spinner"
              animation="border"
              variant="primary"
              aria-roledescription="loading spinner"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : null}
        {signedin ? null : (
          <GoogleLogin
            data-testid="google-login-btn"
            clientId={process.env.REACT_APP_CLIENTID}
            buttonText="Sign in with Google"
            onSuccess={handleSignin}
            onFailure={handleSignin}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
            onAutoLoadFinished={() => setLoading(false)}
          />
        )}
        <div className="row">
          <ChannelSearch />
          <ChannelInfo currentChannel={currentChannel} />
        </div>
      </main>
    </div>
  );
}

export default App;
