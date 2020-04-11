import { GET_TEACHER_HISTORY, GET_TEACHER_HISTORY_SUCCESS, GET_TEACHER_HISTORY_FAILURE } from '../constant'

const initialState = {
  error: [],
  classes: null,
  subject_code: '',
  subject_name: '',
  status: '',
  fetching: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TEACHER_HISTORY:
      return { ...state, fetching: true, classes: null };

    case GET_TEACHER_HISTORY_SUCCESS: {
      const data = JSON.parse(action.payload);
      return {
        ...state,
        fetching: false,
        classes: data.data,
        status: 'SUCCESS',
      };
    }

    case GET_TEACHER_HISTORY_FAILURE: {
      const data = JSON.parse(action.payload);
      return {
        ...state,
        fetching: false,
        status: 'FAILURE',
        error: data
      }
    }
    default:
      return state;
  }
};
