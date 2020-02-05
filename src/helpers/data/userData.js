import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getUserByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const myUsers = response.data;
      const users = [];
      Object.keys(myUsers).forEach((fbId) => {
        myUsers[fbId].id = fbId;
        users.push(myUsers[fbId]);
      });
      resolve(users);
    })
    .catch((error) => reject(error));
});

const addUser = (newUser) => axios.post(`${baseUrl}/users.json`, newUser);

export default { getUserByUid, addUser };
