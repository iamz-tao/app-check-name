import {GET_CLASS_CHECK_NAME, SET_CLASS_CHECK_NAME} from '../constant';

const initialState = {
  error: [],
  openingClass: null,
  status: '',
  fetching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CLASS_CHECK_NAME:
      return {...state, fetching: true};

    case SET_CLASS_CHECK_NAME: {
      const data = JSON.parse(action.payload);
      return {...state, fetching: false, openingClass: data.data};
    }

    default:
      return state;
  }
};
