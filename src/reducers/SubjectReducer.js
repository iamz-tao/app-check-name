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
  GET_SUBJECT_TEACH,
  SET_SUBJECT_TEACH,
} from '../constant';

const initialState = {
  subjects: [],
  subjectsApprove: null,
  studentsInSection: null,
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

    case GET_SUBJECT_TEACH:
      return {...state, fetching: true, subjectsApprove: null};

    case SET_SUBJECT_TEACH: {
      const data = JSON.parse(action.payload);
      return {...state, fetching: false, subjectsApprove: data.data};
    }

    case CREATE_SUBJECT: {
      return {...state, fetching: false, status: null};
    }
  
    case CREATE_SUBJECT_SUCCESS: {
      return {...state, fetching: true, status: 'SUCCESS'};
    }

    case CREATE_SUBJECT_FAILED: {
      return {...state, fetching: true, status: 'FAILURE'};
    }

    case GET_STUDENT_APPROVE:
      return {...state, fetching: true, studentsInSection: null};

    case SET_STUDENT_APPROVE: {
      const data = JSON.parse(action.payload);
      return {...state, fetching: false, studentsInSection: data.data};
    }

    default:
      return state;
  }
};
