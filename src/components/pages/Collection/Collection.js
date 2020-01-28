import React from 'react';
import steamData from '../../../helpers/data/steamData';
import gameData from '../../../helpers/data/gameData';
import CollectionGameCard from '../CollectionGameCard/CollectionGameCard';

import './Collection.scss';

const mySteamId = '76561197983724084';

class Collection extends React.Component {
  state = {
    myGames: [],
  }

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

  populateGames = () => {
    const { uid } = this.props;
    gameData.getGamesByUid(uid)
      .then((response) => {
        this.setState({ myGames: response });
      })
      .catch((error) => console.error('error getting games', error));
  }

  componentDidMount() {
    this.populateGames();
  }

  render() {
    const { myGames } = this.state;
    return (
      <>
      {/* {this.getSteamGames(mySteamId)}
      {this.getSteamUser(mySteamId)} */}
      <h1>My Collection</h1>
      <div className="game-zone">
        {myGames.map((game) => <CollectionGameCard key={game.name} game={game} populateGames={this.populateGames} />)}
        </div>
      </>
    );
  }
}

export default Collection;
