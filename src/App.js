import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { GoogleLogin } from 'react-google-login';
import { verifyToken } from "./components/auth";
import { signInSuccess, resetAuth } from './components/slices/auth';

function App() {

  //states of the app
  // loading state
  let [signedin, setSignedin] = useState(false);
  // let [googleToken, setGoogleToken] = useState("");
  let googleToken = useSelector(state => state.auth.tokenId);
  const dispatch = useDispatch();

  /**
   * Reset all the states in the app to default values and remove any token in localstorage
   *
   */
  const resetState = () => {
    setSignedin(false);
    dispatch(resetAuth);
    localStorage.removeItem("google_tokenID");
  };

  // useEffect(() => {
  //   const signinCheck = async () => {
  //     let google_tokenId = localStorage.getItem("google_tokenID");
  //     if (google_tokenId) {
  //       let isTokenValid = await verifyToken(google_tokenId);
  //       if (isTokenValid) {
  //         setSignedin(true);
  //         // dispatch(signInSuccess())
  //       }
  //       else {
  //         resetState();
  //       }
  //     }
  //     else {
  //       resetState();
  //     }

  //   };
  //   signinCheck();
  // }, []);


  const handleSignin = (userProfile) => {
    console.log(userProfile);

    //save the tokenId for client
    localStorage.setItem("google_tokenID", userProfile.tokenId);
    const { tokenId, profileObj, tokenObj } = userProfile;
    setSignedin(true);
    dispatch(signInSuccess({ tokenId, profileObj, tokenObj }));
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
            isSignedIn={true}
          />

        }

      </main>
    </div>
  );
}

export default App;
