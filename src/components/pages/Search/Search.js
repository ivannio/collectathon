import React from 'react';
import Modal from 'simple-react-modal';
import rawgData from '../../../helpers/data/rawgData';


import './Search.scss';

import SearchGameCard from '../SearchGameCard/SearchGameCard';
import AddForm from '../AddForm/AddForm';

class Search extends React.Component {
  state = {
    input: '',
    games: [],
    show: false,
    selectedGame: {},
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
     const { show } = this.state;
     const { selectedGame } = this.state;
     return (
       <>
        <h1 className="find-a-game">Search For A Game</h1>
        <form>
          <input name="game-query" onChange={this.handleChange} /><span><button className="btn btn-primary search-button" onClick={this.getSearchResults}>Search!</button></span>
        </form>
        <Modal show={show} onClose={this.close} transitionSpeed={3000} closeOnOuterClick={true}>
          <AddForm selectedGame={selectedGame} hideModal={this.hideModal}/>
          </Modal>
        <div className="search-results-zone">
        {games.map((game) => <SearchGameCard key={game.name} game={game} showModal={this.showModal} hideModal={this.hideModal} setSelectedGame={this.setSelectedGame} />)}
        </div>
       </>
     );
   }
}

export default Search;
