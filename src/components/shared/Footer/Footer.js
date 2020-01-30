import React from 'react';

import './Footer.scss';

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <img src="https://i.imgur.com/peqIIOH.png" alt="collectathon-logo" className="footer-logo"></img><i class="far fa-copyright"></i><span><p className="twenty-twenty">2020</p></span><br></br>
        <p className="rawg-link">Search results powered by <a target="_blank" rel="noopener noreferrer" className="rawg-a" href="https://rawg.io/apidocs">RAWG Video Games Database</a></p>
      </div>
    );
  }
}

export default Footer;
