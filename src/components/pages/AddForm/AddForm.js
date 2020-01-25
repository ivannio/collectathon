import React from 'react';

import './AddForm.scss';

class AddForm extends React.Component {
  render() {
    const { selectedGame } = this.props;
    const { genres } = this.props.selectedGame;
    const { platforms } = this.props.selectedGame;
    const joinedGenres = genres.map((g) => g.name).join(', ');

    return (
        <div className="add-form">
          <h1 className="form-header">About Your Copy...</h1>
          <select>
            <option value="null">Select Platform</option>
            {platforms.map((platform) => (
                <option key={platform.id} value={platform.platform.name}>{platform.platform.name}</option>
            ))
            }
          </select>
          <h1 onClick={this.props.hideModal}>{selectedGame.name}</h1>

        </div>
    );
  }
}

export default AddForm;
