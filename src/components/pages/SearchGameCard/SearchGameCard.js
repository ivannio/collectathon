import React from 'react';

import './SearchGameCard.scss';

class SearchGameCard extends React.Component {
  render() {
    const { game } = this.props;
    const { genres } = this.props.game;
    const printGenres = () => genres.map((g) => g.name).join(', ');

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
          <p className="genres">{printGenres()}</p>
        </div>
        </div>
      </div>
    );
  }
}

export default SearchGameCard;
