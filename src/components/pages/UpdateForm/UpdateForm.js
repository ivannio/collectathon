import React from 'react';
import gameData from '../../../helpers/data/gameData';

import './UpdateForm.scss';

class UpdateForm extends React.Component {
  state = {
    selectedBox: this.props.selectedGame.hasBox,
    selectedCondition: this.props.selectedGame.condition,
    selectedManual: this.props.selectedGame.hasManual,
  }

  updateGameEvent = (e) => {
    e.preventDefault();
    const { selectedGame } = this.props;
    const gameId = selectedGame.id;
    const updatedGame = {
      name: selectedGame.name,
      released: selectedGame.released,
      genres: selectedGame.genres,
      background_image: selectedGame.background_image,
      condition: this.state.selectedCondition,
      hasBox: this.state.selectedBox,
      hasManual: this.state.selectedManual,
      platform: selectedGame.platform,
      uid: this.props.uid,
    };
    gameData.updateGame(gameId, updatedGame)
      .then(() => {
        this.props.hideModal();
        this.props.populateGames();
      })
      .catch((error) => console.error('error updating game details', error));
  }

  render() {
    return (
        <div className="update-form">
          <h1 className="form-header">Update Condition / Completeness</h1>
          <div className="user-specifics">
          <div className="condition usection">
          <p className="select-condition">Condition:</p>
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
          <p className="select-hasBox">With box?</p>
            <select value={this.state.selectedBox}
              onChange={(e) => this.setState({ selectedBox: e.target.value })}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="N/A">N/A</option>
            </select>
          </div>
          <div className="hasManual usection">
          <p className="select-hasManual">With manual?</p>
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
          <button onClick={this.updateGameEvent} className="btn btn-outline-success save-btn">Save changes</button>
          </div>
        </div>
    );
  }
}

export default UpdateForm;
