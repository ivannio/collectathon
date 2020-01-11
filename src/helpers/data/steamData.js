import axios from 'axios';

const getSteamGames = (steamId) => new Promise((resolve, reject) => {
  axios.get(`https://collectathon.herokuapp.com/api/steam/&steamid=${steamId}&include_appinfo=true&include_played_free_games=true&format=json`)
    .then((response) => {
      const myData = response.data;
      resolve(myData);
    })
    .catch((error) => reject(error));
});

export default { getSteamGames };
