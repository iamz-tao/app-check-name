import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  UPDATE_PROFILE_SUCCESS,
} from '../constant';

const initialState = {
  data: [],
  isLogin: false,
  err: [],
  isError: false,
  fetching: true,
  status: null,
  displayName: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {...state, isLogin: true, fetching: true, data: []};

    case LOGIN_SUCCESS: {
      const data = JSON.parse(action.payload);
      return {
        ...state,
        isLogin: false,
        fetching: false,
        data: data.data,
        status: 'SUCCESS',
        displayName: data.data.user.displayName,
      };
    }

    case LOGIN_FAILURE:
      return {...state, isError: true, err: action.payload, status: 'FAILURE'};

    case LOGOUT:
      return {...state, isError: true, data: []};

    case UPDATE_PROFILE_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        fetching: false,
        displayName: `${data.dataUser.firstname} ${data.dataUser.lastname}`,
        status: 'SUCCESS',
      };
    }

    default:
      return state;
  }
};
