//where to set token: every API going forward
//who's calling API's? axios

import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else{
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;