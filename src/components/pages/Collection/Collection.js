import React from 'react';
import Modal from 'simple-react-modal';
import steamData from '../../../helpers/data/steamData';
import gameData from '../../../helpers/data/gameData';
import CollectionGameCard from '../CollectionGameCard/CollectionGameCard';
import UpdateForm from '../UpdateForm/UpdateForm';

import './Collection.scss';

const mySteamId = '76561197983724084';

class Collection extends React.Component {
  state = {
    myGames: [],
    selectedGame: {},
    show: false,
  }

  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
  }

  setSelectedGame = (game) => {
    this.setState({ selectedGame: game });
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
    const { selectedGame } = this.state;
    const { show } = this.state;
    const { uid } = this.props;
    return (
      <div className="collection-page">
      {/* {this.getSteamGames(mySteamId)}
      {this.getSteamUser(mySteamId)} */}
      <h1 className="collection-header">My Collection</h1>
      <Modal show={show} onClose={this.close} transitionSpeed={3000} closeOnOuterClick={true}>
          <UpdateForm selectedGame={selectedGame} hideModal={this.hideModal} uid={uid} populateGames={this.populateGames}/>
          </Modal>
      <div className="game-zone">
        {myGames.map((game) => <CollectionGameCard key={game.id} game={game} showModal={this.showModal} hideModal={this.hideModal} populateGames={this.populateGames} setSelectedGame={this.setSelectedGame}/>)}
        </div>
      </div>
    );
  }
}

export default Collection;
