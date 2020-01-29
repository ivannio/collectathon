import React from 'react';
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
        <h1 className="auth-header">login to continue</h1><br></br>
        <button className="btn btn-success" onClick={this.loginEvent}>Login with Google</button>
      </div>
    );
  }
}

export default Auth;
