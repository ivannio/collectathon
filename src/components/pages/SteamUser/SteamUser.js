import React from 'react';

import './SteamUser.scss';

class SteamUser extends React.Component {
  render() {
    const { totalGames } = this.props;
    const { steamUser } = this.props;
    return (
      <div className="steam-user-details">
        <img src={steamUser.avatarmedium} alt="user-avatar" className="avatar-img"></img><h1 className="user-persona">{steamUser.personaname}</h1>
        <a className="profile-link" target="_blank" rel="noopener noreferrer" href={steamUser.profileurl}>View Steam Profile</a>
        <div className="game-count-div">
        <h3 className="game-count">Game count:</h3>
        <h3 className="game-count-num">{totalGames}</h3>
        </div>
      </div>
    );
  }
}

export default SteamUser;
