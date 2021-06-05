import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';




if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
function App() {
  var provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  var gitProvider = new firebase.auth.GithubAuthProvider();
  const [user, setUser] = useState({})
  const handleGoogleSignIn = () => {
    firebase.auth().signInWithPopup(provider)


      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        setUser(user)
        console.log('google user', user);
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  }
  const handleFacebookSignIn = () => {
    firebase.auth().signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        console.log('facebook user', user);
        setUser(user)

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  }
  const handleGithubSignIn = () => {
    firebase.auth().signInWithPopup(gitProvider)
    .then((result) => {
      var credential = result.credential;
      var token = credential.accessToken;
      var user = result.user;
      setUser(user)
      console.log('git hub user', user);
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }
  return (

    <div className="App">
      <button onClick={handleGoogleSignIn}>sign in google</button><br />
      <button onClick={handleGithubSignIn}>sign in github</button><br />
      <button onClick={handleFacebookSignIn}>sign in facebook</button>
      <h3>hello mister {user.displayName}</h3>
      <img src={user.photoURL} alt="" />

    </div>
  );
}

export default App;
