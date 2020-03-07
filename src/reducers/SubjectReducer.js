import {SET_SUBJECT_REGIS_STD, GET_SUBJECT_REGIS_STD} from '../constant';

const initialState = {
  subjects: [],
  err: [],
  isError: false,
  fetching: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SUBJECT_REGIS_STD:
      return {...state, fetching: true, data: []};

    case SET_SUBJECT_REGIS_STD: {
      const data = JSON.parse(action.payload);
      return {...state, fetching: false, data: data.data};
    }

    default:
      return state;
  }
};
