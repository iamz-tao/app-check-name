import {
  SET_SUBJECT_REGIS_STD, 
  GET_SUBJECT_REGIS_STD,
  REGISTER_SUBJECT_REQUEST_SUCCESS,
  REGISTER_SUBJECT_REQUEST_FAILED,
  GET_STUDENT_APPROVE,
  SET_STUDENT_APPROVE,
  CREATE_SUBJECT,
  CREATE_SUBJECT_SUCCESS,
  CREATE_SUBJECT_FAILED,
} from '../constant';

const initialState = {
  subjects: [],
  err: [],
  isError: false,
  fetching: true,
  status: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SUBJECT_REGIS_STD:
      return {...state, fetching: true, data: []};

    case SET_SUBJECT_REGIS_STD: {
      const data = JSON.parse(action.payload);
      return {...state, fetching: false, data: data.data};
    }

    case REGISTER_SUBJECT_REQUEST_SUCCESS: {
      const data = JSON.parse(action.payload);
      return {...state, fetching: true, status: data.status.dataStatus};
    }

    case REGISTER_SUBJECT_REQUEST_FAILED: {
      return {...state, fetching: false, isError: true, status: 'FAILURE'};
    }

    case GET_STUDENT_APPROVE:
      return {...state, fetching: true, subjects: null};

    case SET_STUDENT_APPROVE: {
      const data = JSON.parse(action.payload);
      return {...state, fetching: false, subjects: data.data};
    }

    case CREATE_SUBJECT: {
      return {...state, fetching: false, status: null};
    }
  
    case CREATE_SUBJECT_SUCCESS: {
      // const data = JSON.parse(action.payload);
      return {...state, fetching: true, status: 'SUCCESS'};
    }

    case CREATE_SUBJECT_FAILED: {
      return {...state, fetching: true, status: 'FAILURE'};
    }
    default:
      return state;
  }
};
