import React, { useEffect, useState } from 'react';

import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from 'react-google-login';
import { verifyToken } from "./components/auth";

function App() {

  //states of the app
  let [signedin, setSignedin] = useState(false);
  let [googleToken, setGoogleToken] = useState("");

  /**
   * Reset all the states in the app to default values and remove any token in localstorage
   *
   */
  const resetState = () => {
    setSignedin(false);
    setGoogleToken("");
    localStorage.removeItem("google_tokenID");
  };

  useEffect(() => {
    const signinCheck = async () => {
      let google_tokenId = localStorage.getItem("google_tokenID");
      if (google_tokenId) {
        let isTokenValid = await verifyToken(google_tokenId);
        if (isTokenValid) {
          setSignedin(true);
          setGoogleToken(google_tokenId);
        }
        else {
          resetState();
        }
      }
      else {
        resetState();
      }

    };
    signinCheck();
  }, []);


  const handleSignin = (userProfile) => {
    console.log(userProfile);

    //save the tokenId for client
    localStorage.setItem("google_tokenID", userProfile.tokenId);
    setSignedin(true);
    setGoogleToken(userProfile.tokenId);
  };

  return (
    <div className="App">
      <header className="App-header">
        Header
      </header>
      <main>
        <h1>Main content</h1>
        {signedin ? `Your token is ${googleToken}` :
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENTID}
            buttonText="Sign in with Google"
            onSuccess={handleSignin}
            onFailure={handleSignin}
            cookiePolicy={'single_host_origin'}
          />

        }

      </main>
    </div>
  );
}

export default App;
