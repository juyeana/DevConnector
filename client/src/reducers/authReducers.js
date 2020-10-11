//receiving the dispatch call

import { SET_USER } from '../actions/types';
import isEmpty from '../validation/is-empty'

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function (state = initialState, action) {
  //action --> reducer --> store
  //NOTE: the returned value is sent(written) to the 'store' not the caller (action in this case)
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated:!isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
}
