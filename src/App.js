import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

import { signInSuccess, resetAuth } from "./components/slices/auth";
import NavigationBar from "./components/NavigationBar";

import "./components/styles/App.scss";
import ChannelSearch from "./components/ChannelSearch";
import ChannelInfo from "./components/ChannelInfo";
import Footer from "./components/Footer";
function App() {
  const dispatch = useDispatch();

  //selectors used
  const currentChannel = useSelector((state) => state.youtube.currentChannel);

  let [signedin, setSignedin] = useState(false);
  let [loading, setLoading] = useState(false);
  // let [loading, setLoading] = useState(() => {
  //   //check if there's already google auth object in cookie and set loading accordingly
  //   if (document.cookie.indexOf("G_AUTHUSER_H") != -1) {
  //     return true;
  //   }
  //   return false;
  // });

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
        handleSignin={handleSignin}
        setLoading={setLoading}
      ></NavigationBar>
      <main id="main-content" className="container">
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
        <div className="row">
          <ChannelSearch />
          <ChannelInfo currentChannel={currentChannel} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
