import {GET_PROFILE, GET_PROFILE_SUCCESS, UPDATE_PROFILE, UPDATE_PROFILE_SUCCESS} from '../constant';

const initialState = {
  error: [],
  profile: null,
  fetching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {...state, fetching: true};

    case GET_PROFILE_SUCCESS: {
      const data = JSON.parse(action.payload);
      return {
        ...state,
        fetching: false,
        profile: data.data,
        status: 'SUCCESS',
      };
    }
    case UPDATE_PROFILE: 
     return {...state, fetching: true};

    case UPDATE_PROFILE_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        fetching: false,
        profile: data.dataUser,
        status: 'SUCCESS',
      };
    }

    default:
      return state;
  }
};
