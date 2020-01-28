import React from 'react';
import gameData from '../../../helpers/data/gameData';

import './AddForm.scss';

class AddForm extends React.Component {
  state = {
    selectedPlatform: '',
    selectedCondition: 'M',
    selectedBox: 'Yes',
    selectedManual: 'Yes',
    selectedGameGenres: '',
  }

  componentDidMount() {
    this.setState({ selectedGameGenres: this.props.selectedGame.genres.map((g) => g.name).join(', ') });
  }

  addToCollectionEvent = (e) => {
    e.preventDefault();
    const newGame = {
      name: this.props.selectedGame.name,
      released: this.props.selectedGame.released,
      genres: this.state.selectedGameGenres,
      background_image: this.props.selectedGame.background_image,
      condition: this.state.selectedCondition,
      hasBox: this.state.selectedBox,
      hasManual: this.state.selectedManual,
      platform: this.state.selectedPlatform,
      uid: this.props.uid,
    };
    gameData.addGame(newGame)
      .then(() => {
        this.props.hideModal();
      })
      .catch((error) => console.error('error adding game to collection', error));
  };


  render() {
    const { platforms } = this.props.selectedGame;

    return (
        <div className="add-form">
          <h1 className="form-header">About Your Copy...</h1>
          <div className="user-specifics">
          <div className="platform usection">
          <p className="select-platform">Which platform do you own it on?</p>
          <select value={this.state.selectedPlatform}
              onChange={(e) => this.setState({ selectedPlatform: e.target.value })}>
                  <option value=""></option>
             {platforms.map((platform) => (
                <option key={platform.platform.id} value={platform.platform.name}>{platform.platform.name}</option>
             ))
            }
          </select>
          </div>
          <div className="condition usection">
          <p className="select-condition">How's the condition?</p>
            <select value={this.state.selectedCondition}
              onChange={(e) => this.setState({ selectedCondition: e.target.value })}>
              <option value="M">Mint</option>
              <option value="NM">Near Mint</option>
              <option value="G">Good</option>
              <option value="F">Fair</option>
              <option value="P">Poor</option>
              <option value="N/A">N/A, digital</option>
            </select>
          </div>
          <div className="hasBox usection">
          <p className="select-hasBox">Still have the box?</p>
            <select value={this.state.selectedBox}
              onChange={(e) => this.setState({ selectedBox: e.target.value })}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="N/A">N/A</option>
            </select>
          </div>
          <div className="hasManual usection">
          <p className="select-hasManual">And the manual?</p>
            <select value={this.state.selectedManual}
              onChange={(e) => this.setState({ selectedManual: e.target.value })}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="N/A">N/A</option>
            </select>
          </div>
          </div>
          <div className="buttonz">
          <button onClick={this.props.hideModal} className="btn btn-outline-secondary close-btn">Close</button>
          <button onClick={this.addToCollectionEvent} className="btn btn-outline-success save-btn">Save to collection</button>
          </div>
        </div>
    );
  }
}

export default AddForm;
