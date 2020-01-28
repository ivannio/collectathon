import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';

import './MyNavBar.scss';

class MyNavBar extends React.Component {
  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;
    const { uid } = this.props;
    const buildNavBar = (props) => {
      if (authed) {
        return (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/search">Game Search</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to={`collection/${uid}`}>My Collection</Link>
            </li>
            <li className="nav-item">
            <button className="nav-link btn btn-warning" onClick={this.logMeOut}>Logout</button>
            </li>
          </ul>
        );
      }
      return (<ul className="navbar-nav ml-auto"></ul>);
    };

    return (
      <div className="MyNavbar">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link className="navbar-brand" to="/"><img className="brand" src="https://i.imgur.com/peqIIOH.png" alt="collectathon brand"></img></Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            { buildNavBar() }
          </div>
        </nav>
      </div>
    );
  }
}

export default MyNavBar;
