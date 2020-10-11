//trigger dispatch call by user's action on the UI

import { SET_ERRORS, SET_USER } from './types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post('/api/users/register', userData)
    .then((res) => history.push('/login'))
    .catch((err) =>
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const loginUser = (userData) => (dispatch) => {
  axios
    .post('/api/users/login', userData)
    .then((res) => {
      //save token to localstorage (browser stroage) : keep the information as long as the browser is open.
      //disadvantage of localstorage : anyone can see it so you have to think what to store in the localstorage
      //token may be ok since it's encrypted.
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);

      //set token to auth header
      setAuthToken(token);
      //decode token
      const decoded = jwt_decode(token);

      //write user info to redux
      dispatch({
        type: SET_USER,
        payload: decoded,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const logoutUser = () => (dispatch) => {
  //remove token from ls
  localStorage.removeItem('jwtToken');
  //remove token from axios header
  setAuthToken(false);
  //reset user in the redux store
  dispatch({
    type: SET_USER,
    payload: {},
  });
};
