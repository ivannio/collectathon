import React from 'react';
import rawgData from '../../../helpers/data/rawgData';

import './Search.scss';

import SearchGameCard from '../SearchGameCard/SearchGameCard';

class Search extends React.Component {
  state = {
    input: '',
    games: [],
  }

  getRawgSearch = (searchQuery) => {
    rawgData.getSearchResults(searchQuery)
      .then((response) => {
        const searchResults = response.results;
        this.setState({ games: searchResults });
      })
      .catch((error) => console.error('error retreiving rawg data', error));
  };

   handleChange = (e) => {
     e.preventDefault();
     this.setState({ input: e.target.value });
   }

   getSearchResults = (e) => {
     e.preventDefault();
     const { input } = this.state;
     this.getRawgSearch(input);
   }

   render() {
     const { games } = this.state;
     return (
       <>
        <h1>Search for a game</h1>
        <form>
          <input name="game-query" onChange={this.handleChange} /><span><button className="btn btn-primary search-button" onClick={this.getSearchResults}>Search!</button></span>
        </form>
        <div className="search-results-zone">
        {games.map((game) => <SearchGameCard key={game.name} game={game} />)}
        </div>
       </>
     );
   }
}

export default Search;
