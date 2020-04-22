import {GET_CURRENT_YEAR, SET_CURRENT_YEAR} from '../constant';

const initialState = {
  currentYear: [],
  err: [],
  fetching: true,
  status: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_YEAR:
      return {...state, fetching: true, currentYear: []};

    case SET_CURRENT_YEAR: {
      const data = JSON.parse(action.payload);
      return {
        ...state,
        fetching: false,
        currentYear: data.data,
        status: 'SUCCESS',
      };
    }

    default:
      return state;
  }
};
