import React from 'react';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-rickiest.css';
import { PacmanLoader } from 'react-spinners';
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
    loading: false,
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
        this.setState({ loading: false });
      })
      .catch((error) => console.error('error retreiving rawg data', error));
  };

   handleChange = (e) => {
     e.preventDefault();
     this.setState({ input: e.target.value });
   }

   getSearchResults = (e) => {
     e.preventDefault();
     this.setState({ loading: true });
     const { input } = this.state;
     this.getRawgSearch(input);
   }

   getPopularGames = (e) => {
     e.preventDefault();
     this.setState({ loading: true });
     this.getRawgSearch('');
   }

   render() {
     const { games } = this.state;
     const { show } = this.state;
     const { selectedGame } = this.state;
     const { uid } = this.props;
     return (
       <div className="search-page">
        <h1 className="find-a-game">Search For A Game</h1>
        <form>
          <input name="game-query" onChange={this.handleChange} /><span onClick={this.getSearchResults} className="search-button"><AwesomeButton type="primary">Search!</AwesomeButton></span><span onClick={this.getPopularGames} className="popular-games-button"><AwesomeButton type="github" >Get Popular Games</AwesomeButton></span>
        </form>
        <Modal show={show} onClose={this.close} transitionSpeed={1000} closeOnOuterClick={true}>
          <AddForm selectedGame={selectedGame} hideModal={this.hideModal} uid={uid}/>
          </Modal>
          <div className="loader-div">
          <PacmanLoader size={100} loading={this.state.loading} color={'#FFEE00'} />
          </div>
        <div className="search-results-zone">
        {games.map((game) => <SearchGameCard key={game.name} game={game} showModal={this.showModal} hideModal={this.hideModal} setSelectedGame={this.setSelectedGame} />)}
        </div>
       </div>
     );
   }
}

export default Search;
