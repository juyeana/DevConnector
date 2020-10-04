//trigger dispatch call by user's action on the UI

import { SET_USER } from './types';

export const registerUser = (userData) => {
  return {
    type: SET_USER,
    payload: userData,
  };
};
