import React from 'react';

import './SteamGameCard.scss';

class SteamGameCard extends React.Component {
  render() {
    const { steamGame } = this.props;
    return (
      <div className="steam-game-card">
       <img className="steam-game-img" alt="steam-game-logo" src={`http://media.steampowered.com/steamcommunity/public/images/apps/${steamGame.appid}/${steamGame.img_logo_url}.jpg`}></img><div className="steam-deets"><p className="steam-game-title">{steamGame.name}</p><p className="total-playtime">Total Playtime: {steamGame.playtime_forever} hrs</p></div>
      </div>
    );
  }
}

export default SteamGameCard;
