import {LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE} from '../constant';

const initialState = {
  data: [],
  isLogin: false,
  err: [],
  isError: false,
  fetching: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {...state, isLogin: true, fetching: true, data: []};

    case LOGIN_SUCCESS: {
      const data = JSON.parse(action.payload);
      return {...state, isLogin: false, fetching: false, data: data.data};
    }

    case LOGIN_FAILURE:
      return {...state, isError: true, err: action.payload};

    default:
      return state;
  }
};
