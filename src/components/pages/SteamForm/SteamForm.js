import React from 'react';
import userData from '../../../helpers/data/userData';

import './SteamForm.scss';

class SteamForm extends React.Component {
  state = {
    input: 0,
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ input: e.target.value });
  }

  addUser = (input) => {
    const newUser = {
      uid: this.props.uid,
      steamId: input,
    };
    userData.addUser(newUser)
      .then(() => {
        this.props.hideSteamModal();
      })
      .catch((error) => console.error('error adding user', error));
  }

  importSteamEvent = (e) => {
    e.preventDefault();
    const { input } = this.state;
    (input.toString().length !== 17) ? alert('That doesn\'t look like a valid Steam ID') : this.addUser(input);
  }

  render() {
    return (
        <div className="steam-form">
          <h1 className="form-header">Enter Your 17 digit Steam ID</h1>
          <p>Need help finding your Steam ID? Check out <a target="_blank" rel="noopener noreferrer" href="https://steamidfinder.com/lookup">this utility</a> and select the ID under "steamID64"</p>
          <div className="steam-input">
          <input name="id-input" onChange={this.handleChange} />
          </div>
          <div className="buttonz">
          <button onClick={this.props.hideSteamModal} className="btn btn-outline-secondary close-btn">Close</button>
          <button onClick={this.importSteamEvent} className="btn btn-outline-success save-btn">Import</button>
          </div>
        </div>
    );
  }
}

export default SteamForm;
