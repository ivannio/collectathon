import React from 'react';
import steamData from '../helpers/data/steamData';

import './App.scss';

const mySteamId = '76561197983724084';

const getSteamLib = (steamId) => {
  steamData.getSteamGames(steamId)
    .then((gamesData) => {
      console.log(gamesData);
    })
    .catch((error) => console.error('error getting steam data', error));
};

class App extends React.Component {
  render() {
    return (
      <div className="App">
        {getSteamLib(mySteamId)}
        <button className="btn btn-outline-success">Button</button>
      </div>
    );
  }
}

export default App;
