import {
  GET_TEACHER_HISTORY,
  GET_TEACHER_HISTORY_SUCCESS,
  GET_TEACHER_HISTORY_FAILURE,
  STUDENT_SET_HISTORY,
  STUDENT_GET_HISTORY,
  GET_STUDENT_CHECKNAME_IN_CLASS,
  SET_STUDENT_CHECKNAME_IN_CLASS,
} from '../constant';

const initialState = {
  error: [],
  classes: null,
  stdHistory: null,
  stdInClass: null,
  status: '',
  fetching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TEACHER_HISTORY:
      return {...state, fetching: true, classes: null};

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
        error: data,
      };
    }

    case STUDENT_GET_HISTORY:
      return {...state, fetching: true};

    case STUDENT_SET_HISTORY: {
      const data = JSON.parse(action.payload);
      return {...state, fetching: false, stdHistory: data.data};
    }
    
    case GET_STUDENT_CHECKNAME_IN_CLASS:
      return {...state, fetching: true};

    case SET_STUDENT_CHECKNAME_IN_CLASS: {
      const data = JSON.parse(action.payload);
      return {...state, fetching: false, stdInClass: data.data};
    }

    default:
      return state;
  }
};
