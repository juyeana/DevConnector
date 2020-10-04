//trigger dispatch call by user's action on the UI

import { SET_ERRORS, SET_USER } from './types';

import axios from 'axios';

export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post('/api/users/register', userData)
    .then((res) => history.push('/login')
    )
    .catch((err) =>
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      })
    );
};
