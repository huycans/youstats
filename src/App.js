import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Spinner from 'react-bootstrap/Spinner';

import { verifyToken } from "./components/auth";
import { signInSuccess, resetAuth } from './components/slices/auth';
import NavigationBar from './components/NavigationBar';

import './components/styles/App.scss';

function App() {
  const dispatch = useDispatch();

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
  let googleToken = useSelector(state => state.auth.tokenId);

  /**
   * Reset all the states in the app to default values and remove any token in localstorage
   *
   */
  const resetState = () => {
    setSignedin(false);
    dispatch(resetAuth);
  };

  const handleSignin = (userProfile) => {
    console.log(userProfile);

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
      <NavigationBar signedin={signedin} handleSignout={handleSignout}></NavigationBar>
      <main className="container">
        <h1> Main content</h1>
        {loading ?
          <div className="loading-spinner d-flex justify-content-center align-items-center">
            <Spinner animation="border" variant="primary" aria-roledescription="loading spinner" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
          : null
        }
        {signedin ? `You are signed in` :
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENTID}
            buttonText="Sign in with Google"
            onSuccess={handleSignin}
            onFailure={handleSignin}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
            onAutoLoadFinished={() => setLoading(false)}
          />}

      </main>
    </div>
  );
}

export default App;
