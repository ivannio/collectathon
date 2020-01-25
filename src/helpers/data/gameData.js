import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getGamesByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/games.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const myGames = response.data;
      const games = [];
      Object.keys(myGames).forEach((fbId) => {
        myGames[fbId].id = fbId;
        games.push(myGames[fbId]);
      });
      resolve(games);
    })
    .catch((error) => reject(error));
});

const addGame = (newGame) => axios.post(`${baseUrl}/games.json`, newGame);

export default { getGamesByUid, addGame };
