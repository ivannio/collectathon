import React from 'react';

import './SearchGameCard.scss';

class SearchGameCard extends React.Component {
  render() {
    const { game } = this.props;
    const { genres } = this.props.game;
    const { platforms } = this.props.game;

    return (
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="search-game-card-front" style ={ {
            backgroundImage: `url(${game.background_image})`,
          } }>
            <h1 className="search-game-card-title">{game.name}</h1>
        </div>
        <div className="search-game-card-back">
          <h1 className="game-header-back">{game.name}</h1>
          <p className="genres">{genres.map((g) => g.name).join(', ')}</p>
          <div className="additional-info">
            <p className="released">Released: {game.released}</p>
            <p className="platforms">Platforms: {platforms.map((p) => p.platform.name).join(', ')}</p>
            <p className="metacritic">Metacritic Rating:  {isNaN(game.metacritic) ? 'No score' : game.metacritic}</p>
          </div>
          <div className="add-to-collection">
            <p className="add-to-collection-text">add to collection</p><span className="plus-icon"><i className="far fa-plus-square fa-4x"></i></span>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default SearchGameCard;
