import React from 'react';

import './CollectionGameCard.scss';

class CollectionGameCard extends React.Component {
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
          {/* <p className="genres">{genres.map((g) => g.name).join(', ')}</p> */}
          <div className="additional-info">
            <p className="released">Released: {game.released}</p>
            {/* { platforms === null ? <p></p> : <p className="platforms">Platforms: {platforms.map((p) => p.platform.name).join(', ')}</p>}
            { metacritic === null ? <p></p> : <p className="metacritic">Metacritic Rating: {metacritic}</p>} */}
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default CollectionGameCard;
