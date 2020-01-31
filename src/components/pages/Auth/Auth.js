import React from 'react';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-rickiest.css';
import firebase from 'firebase/app';
import 'firebase/auth';

import './Auth.scss';

class Auth extends React.Component {
  loginEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <div className="Auth">
        <h1 className="auth-header">Login to Continue</h1><br></br>
        <div className="butt" onClick={this.loginEvent}>
        <AwesomeButton type="primary"><i className="fab fa-google fa-2x"></i>Login with Google</AwesomeButton>
        </div>
      </div>
    );
  }
}

export default Auth;
