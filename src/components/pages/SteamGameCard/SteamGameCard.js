import React from 'react';

import './SteamGameCard.scss';

class SteamGameCard extends React.Component {
  formatPlaytime = (playtime) => {
    let hourString = (playtime / 60).toString();
    const decimalPosition = hourString.indexOf('.');
    const splicePosition = decimalPosition + 2;
    if (decimalPosition !== -1) {
      hourString = hourString.slice(0, splicePosition);
    } else {
      console.log('');
    }
    return hourString;
  }

  render() {
    const { steamGame } = this.props;
    return (
      <div className="steam-game-card">
       <img className="steam-game-img" alt="steam-game-logo" src={`http://media.steampowered.com/steamcommunity/public/images/apps/${steamGame.appid}/${steamGame.img_logo_url}.jpg`}></img><div className="steam-deets"><p className="steam-game-title">{steamGame.name}</p><div className="total-playtime">Total Playtime: {this.formatPlaytime(steamGame.playtime_forever)} hrs</div></div>
      </div>
    );
  }
}

export default SteamGameCard;
