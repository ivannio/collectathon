import React from 'react';
import steamData from '../../../helpers/data/steamData';

import './Collection.scss';

const mySteamId = '76561197983724084';

class Collection extends React.Component {
  getSteamGames = (steamId) => {
    steamData.getSteamGamesBySteamId(steamId)
      .then((response) => {
        const { games } = response.response;
        console.log(games);
      })
      .catch((error) => console.error('error getting Steam games', error));
  }

  getSteamUser = (steamId) => {
    steamData.getSteamUserBySteamId(steamId)
      .then((response) => {
        const userData = response.response.players;
        console.log(userData);
      })
      .catch((error) => console.error('error getting Steam profile', error));
  }

  render() {
    return (
      <>
      {this.getSteamGames(mySteamId)}
      {this.getSteamUser(mySteamId)}
      <h1>My Collection</h1>
      </>
    );
  }
}

export default Collection;
