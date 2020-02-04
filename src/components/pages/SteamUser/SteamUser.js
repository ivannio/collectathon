import React from 'react';

import './SteamUser.scss';

class SteamUser extends React.Component {
  render() {
    const { steamUser } = this.props;
    return (
      <div className="steam-user-details">
        <img src={steamUser.avatarmedium} alt="user-avatar" className="avatar-img"></img><h1 className="user-persona">{steamUser.personaname}</h1>
        <a className="profile-link" target="_blank" rel="noopener noreferrer" href={steamUser.profileurl}>View Steam Profile</a>
        { steamUser.personastate === 1 ? <div className="online">
          <p className="online-now">Online now</p><span><i className="fas fa-power-off fa-4x"></i></span>
        </div> : <div className="offline">
          <p className="offline-now">Offline</p><span><i className="fas fa-power-off fa-4x"></i></span>
        </div>
        }
      </div>
    );
  }
}

export default SteamUser;
