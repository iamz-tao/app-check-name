import {LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE} from '../constrant';
const initialState = {
  isLoading: false,
  authen: null,
  user: [],
  err: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {...state, isLoading: true};
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        authen: action.payload,
        user: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
      };
  }
};
