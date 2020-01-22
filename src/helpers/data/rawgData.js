import axios from 'axios';


const getSearchResults = (searchQuery) => new Promise((resolve, reject) => {
  axios.get(`https://collectathon.herokuapp.com/rawg/search/${searchQuery}`)
    .then((response) => {
      const myData = response.data;
      resolve(myData);
    })
    .catch((error) => reject(error));
});

export default { getSearchResults };
