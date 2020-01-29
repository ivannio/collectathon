import React from 'react';
import gameData from '../../../helpers/data/gameData';

import './CollectionGameCard.scss';

class CollectionGameCard extends React.Component {
  handleDeleteClick = (e) => {
    e.preventDefault();
    gameData.deleteGame(this.props.game.id)
      .then(() => {
        this.props.populateGames();
      })
      .catch((error) => console.error('error deleting game', error));
  }

  handleEditClick = (e) => {
    e.preventDefault();
    this.props.showModal();
    this.props.setSelectedGame(this.props.game);
  }

  render() {
    const { game } = this.props;

    return (
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="collection-game-card-front" style ={ {
            backgroundImage: `url(${game.background_image})`,
          } }>
            <h1 className="collection-game-card-title">{game.name}</h1>
        </div>
        <div className="collection-game-card-back">
          <h1 className="game-header-back">{game.name}</h1>
          <p className="genres">{game.genres}</p>
          <div className="additional-info">
            <p className="released details-text">Released: {game.released}</p>
            <p className="platform details-text">Platform: {game.platform}</p>
            <p className="condition details-text">Condition: {game.condition}</p>
            <p className="hasBox details-text">Has Box?: {game.hasBox}</p>
            <p className="hasManual details-text">Has Manual?: {game.hasManual}</p>
          </div>
          <div className="delete">
            <p className="delete-text">remove from collection</p><span className="delete-icon"><i className="fas fa-minus-circle fa-4x" onClick={this.handleDeleteClick}></i></span>
          </div>
          <div className="edit">
            <p className="edit-text">edit details</p><span className="edit-icon"><i className="edit-icon fas fa-edit fa-4x" onClick={this.handleEditClick}></i></span>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default CollectionGameCard;
