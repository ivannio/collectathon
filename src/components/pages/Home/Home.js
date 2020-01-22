import React from 'react';
import { Link } from 'react-router-dom';

import './Home.scss';

class Home extends React.Component {
  render() {
    return (
      <>
      <h1>Home Page</h1>
      <Link className="btn btn-primary" to="/search">Go to search Page</Link>
      <Link className="btn btn-secondary" to={`/collection/${this.props.uid}`}>Go to My Colletion</Link>
      </>
    );
  }
}

export default Home;
