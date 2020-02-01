import React from 'react';
import { Link } from 'react-router-dom';
import { AwesomeButton } from 'react-awesome-button';
import { PacmanLoader } from 'react-spinners';
import 'react-awesome-button/dist/themes/theme-rickiest.css';
import Modal from 'simple-react-modal';
import steamData from '../../../helpers/data/steamData';
import gameData from '../../../helpers/data/gameData';
import userData from '../../../helpers/data/userData';
import CollectionGameCard from '../CollectionGameCard/CollectionGameCard';
import UpdateForm from '../UpdateForm/UpdateForm';
import SteamForm from '../SteamForm/SteamForm';

import './Collection.scss';

class Collection extends React.Component {
  state = {
    myGames: [],
    selectedGame: {},
    show: false,
    steamImported: false,
    steamShow: false,
    loading: false,
    steamId: '',
    steamGames: [],
    steamUser: {},
  }

  loadingTrue = () => {
    this.setState({ loading: true });
  }

  loadingFalse = () => {
    this.setState({ loading: false });
  }

  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
  }

  showSteamModal = () => {
    this.setState({ steamShow: true });
  }

  hideSteamModal = () => {
    this.setState({ steamShow: false });
  }

  setSelectedGame = (game) => {
    this.setState({ selectedGame: game });
  }

  getSteamGames = (steamId) => {
    steamData.getSteamGamesBySteamId(steamId)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error('error getting Steam games', error));
  }

  getSteamUser = (steamId) => {
    steamData.getSteamUserBySteamId(steamId)
      .then((response) => {
        console.log(response);
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

  getSteamInfo = () => {
    const { uid } = this.props;
    userData.getUserByUid(uid)
      .then((response) => {
        (response.length !== 0) ? this.setState({ steamImported: true, steamId: response[0].steamId }) : this.setState({ steamImported: false });
      })
      .catch((error) => console.error('error getting steam games', error));
  }

  componentDidMount() {
    this.populateGames();
    this.getSteamInfo();
  }

  render() {
    const { myGames } = this.state;
    const { selectedGame } = this.state;
    const { show } = this.state;
    const { steamShow } = this.state;
    const { uid } = this.props;
    const { steamImported } = this.state;
    const { steamId } = this.state;

    return (
      <div className="collection-page">
      {/* {this.getSteamGames(mySteamId)}
      {this.getSteamUser(mySteamId)} */}
      <h1 className="collection-header">My Collection</h1>
      <Modal show={show} onClose={this.close} transitionSpeed={1000} closeOnOuterClick={true}>
          <UpdateForm selectedGame={selectedGame} hideModal={this.hideModal} uid={uid} populateGames={this.populateGames}/>
          </Modal>
      <div className="game-zone">
        {myGames.map((game) => <CollectionGameCard key={game.id} game={game} showModal={this.showModal} hideModal={this.hideModal} populateGames={this.populateGames} setSelectedGame={this.setSelectedGame}/>)}
        </div>
        {
          !steamImported ? <div className="import-steam">
          <h1 className="steam-header">Import Steam Collection</h1><br></br>
          <Link onClick={this.showSteamModal}><AwesomeButton type="github">Import Steam Games</AwesomeButton></Link>
          <Modal show={steamShow} onClose={this.close} transitionSpeed={1000} closeOnOuterClick={true}>
            <SteamForm getSteamGames={this.getSteamGames} loadingTrue={this.loadingTrue} loadingFalse={this.loadingFalse} uid={uid} hideSteamModal={this.hideSteamModal}></SteamForm>
          </Modal>
          </div>
            : <div>

              </div>
        }
        { this.getSteamGames(steamId) }
        { this.getSteamUser(steamId) }
      </div>
    );
  }
}

export default Collection;
