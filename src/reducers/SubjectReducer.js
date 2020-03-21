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
  APPROVE_STUDENT,
  APPROVE_STUDENT_SUCCESS,
  REJECT_STUDENT,
  REJECT_STUDENT_SUCCESS,
  REQUEST_ERROR,
  GET_SUBJECT_OPEN_SECTION,
  SET_SUBJECT_OPEN_SECTION,
  GET_ALL_BEACON,
  SET_ALL_BEACON,
  REGISTER_SUBJECT_REQUEST,
  GET_SUBJECT_REGISTRATION,
  SET_SUBJECT_REGISTRATION,
  OPEN_CLASS,
  OPEN_CLASS_SUCCESS,
  OPEN_SECTION_FAILED,
  OPEN_CLASS_FAILED,
  APPROVE_STUDENTS_SUCCESS,
  REJECT_STUDENTS_SUCCESS,
} from '../constant';

const initialState = {
  subjects: null,
  subjectsApprove: null,
  studentsInSection: null,
  subjectsRegistration: null,
  beacons: null,
  err: [],
  isError: false,
  fetching: true,
  status: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SUBJECT_REGIS_STD:
      return {...state, fetching: true, subjects: null};

    case SET_SUBJECT_REGIS_STD: {
      const data = JSON.parse(action.payload);
      return {
        ...state,
        fetching: false,
        subjects: data.data,
        status: 'SUCCESS',
      };
    }
    case REGISTER_SUBJECT_REQUEST: {
      return {...state, fetching: true, status: null};
    }

    case REGISTER_SUBJECT_REQUEST_SUCCESS: {
      const data = JSON.parse(action.payload);
      return {...state, fetching: false, status: data.status.dataStatus};
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

    case APPROVE_STUDENT: {
      return {...state, fetching: true, status: null};
    }

    case REJECT_STUDENT: {
      return {...state, fetching: true, status: null};
    }

    case APPROVE_STUDENT_SUCCESS: {
      const id = action.payload.id[0];
      const students = state.studentsInSection.students;
      const index = students.findIndex(s => s.request_id === id);
      students[index].status = 'APPROVE';
      return {...state, fetching: false, status: 'SUCCESS'};
    }

    case REJECT_STUDENT_SUCCESS: {
      const id = action.payload.id[0];
      const students = state.studentsInSection.students;
      const index = students.findIndex(s => s.request_id === id);
      students.splice(index, 1);
      return {...state, fetching: false, status: 'SUCCESS' };
    }

    case APPROVE_STUDENTS_SUCCESS: {
      const id = action.payload.id;
      const students = state.studentsInSection.students;
      const index = id.map(i => students.findIndex(s => s.request_id === i));
      index.map(i => (students[i].status = 'APPROVE'));
      return {...state, fetching: false, status: 'SUCCESS'};
    }
    
    case REJECT_STUDENTS_SUCCESS: {
      const id = action.payload.id;
      const students = state.studentsInSection.students;
      students.filter(rec => !id.includes(rec.request_id))
      return {...state, fetching: false, status: 'SUCCESS'};
    }

    case GET_SUBJECT_OPEN_SECTION: {
      return {...state, fetching: true, subjects: null};
    }

    case SET_SUBJECT_OPEN_SECTION: {
      const data = JSON.parse(action.payload);
      return {...state, fetching: false, subjects: data.data};
    }

    case GET_ALL_BEACON:
      return {...state, fetching: true, beacons: null};

    case SET_ALL_BEACON: {
      const data = JSON.parse(action.payload);
      return {...state, fetching: false, beacons: data.data};
    }

    case REQUEST_ERROR: {
      return {...state, fetching: true, isError: true, status: 'FAILURE'};
    }

    case GET_SUBJECT_REGISTRATION: {
      return {...state, fetching: true, subjectsRegistration: null};
    }

    case SET_SUBJECT_REGISTRATION: {
      const data = JSON.parse(action.payload);
      return {...state, fetching: false, subjectsRegistration: data.data};
    }

    case OPEN_CLASS: {
      return {...state, fetching: false, status: null};
    }

    case OPEN_CLASS_SUCCESS: {
      return {...state, fetching: true, status: 'SUCCESS'};
    }

    case OPEN_SECTION_FAILED: {
      return {...state, fetching: true, status: 'FAILURE'};
    }

    default:
      return state;
  }
};
