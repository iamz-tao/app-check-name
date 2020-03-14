import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_SUBJECT_REGIS_STD,
  SET_SUBJECT_REGIS_STD,
  REGISTER_SUBJECT_REQUEST,
  REGISTER_SUBJECT_REQUEST_SUCCESS,
  REGISTER_SUBJECT_REQUEST_FAILED,
  GET_CURRENT_YEAR,
  SET_CURRENT_YEAR,
  GET_STUDENT_APPROVE,
  SET_STUDENT_APPROVE,
  CREATE_SUBJECT,
  CREATE_SUBJECT_FAILED,
  CREATE_SUBJECT_SUCCESS,
  LOGOUT,
  GET_SUBJECT_TEACH,
  SET_SUBJECT_TEACH,
  APPROVE_STUDENT,
  APPROVE_STUDENT_SUCCESS,
  REJECT_STUDENT,
  REJECT_STUDENT_SUCCESS,
  REQUEST_ERROR,
  GET_SUBJECT_OPEN_SECTION,
  SET_SUBJECT_OPEN_SECTION,
  OPEN_SECTION,
  OPEN_SECTION_SUCCESS,
  OPEN_SECTION_FAILED,
} from '../constant';
import {Api} from './api';
import NavigationServices from '../navigate/NavigationServices';

export const login = () => ({
  type: LOGIN,
});

export const login_success = payload => ({
  payload,
  type: LOGIN_SUCCESS,
});

export const login_failure = payload => ({
  payload,
  type: LOGIN_FAILURE,
});

export const requestError = payload => ({
  payload,
  type: REQUEST_ERROR,
});

export const studentGetSubjectRegis = payload => ({
  payload,
  type: GET_SUBJECT_REGIS_STD,
});

export const studentSetSubjectRegis = payload => ({
  payload,
  type: SET_SUBJECT_REGIS_STD,
});

export const registerSubject = payload => ({
  payload,
  type: REGISTER_SUBJECT_REQUEST,
});

export const registerSubjectSuccess = payload => ({
  payload,
  type: REGISTER_SUBJECT_REQUEST_SUCCESS,
});

export const registerSubjectFailed = payload => ({
  payload,
  type: REGISTER_SUBJECT_REQUEST_FAILED,
});

export const getCurrentYear = payload => ({
  payload,
  type: GET_CURRENT_YEAR,
});

export const setCurrentYear = payload => ({
  payload,
  type: SET_CURRENT_YEAR,
});

export const getStudentsApprove = payload => ({
  payload,
  type: GET_STUDENT_APPROVE,
});

export const setStudentsApprove = payload => ({
  payload,
  type: SET_STUDENT_APPROVE,
});

export const getSubjectsApprove = payload => ({
  payload,
  type: GET_SUBJECT_TEACH,
});

export const setSubjectsApprove = payload => ({
  payload,
  type: SET_SUBJECT_TEACH,
});

export const createSubject = payload => ({
  payload,
  type: CREATE_SUBJECT,
});

export const createSubjectSuccess = payload => ({
  payload,
  type: CREATE_SUBJECT_SUCCESS,
});

export const createSubjectFailed = payload => ({
  payload,
  type: CREATE_SUBJECT_FAILED,
});

export const logout = payload => ({
  payload,
  type: LOGOUT,
});

export const approveStudent = payload => ({
  payload,
  type: APPROVE_STUDENT,
});

export const approveStudentSuccess = payload => ({
  payload,
  type: APPROVE_STUDENT_SUCCESS,
});

export const rejectStudent = payload => ({
  payload,
  type: REJECT_STUDENT,
});

export const rejectStudentSuccess = payload => ({
  payload,
  type: REJECT_STUDENT_SUCCESS,
});

export const getSubjectOpenSection = payload => ({
  payload,
  type: GET_SUBJECT_OPEN_SECTION,
});

export const setSubjectOpenSection = payload => ({
  payload,
  type: SET_SUBJECT_OPEN_SECTION,
});

export const openSection = payload => ({
  payload,
  type: OPEN_SECTION,
})

export const openSectionSuccess = payload => ({
  payload,
  type: OPEN_SECTION_SUCCESS,
})

export const openSectionFailed = payload => ({
  payload,
  type: OPEN_SECTION_FAILED,
})

// Auth
export const Login = params => {
  return dispatch => {
    dispatch(login());
    Api.Login(params)
      .then(result => {
        dispatch(login_success(JSON.stringify(result)));
      })
      .catch(err => {
        dispatch(login_failure(err));
      });
  };
};

export const Logout = params => {
  return dispatch => {
    dispatch(logout());
    NavigationServices.navigate('Login');
  };
};

// Year
export const GetCurrentYear = params => {
  return dispatch => {
    dispatch(getCurrentYear(params));
    Api.GetCurrentYear(params)
      .then(result => {
        dispatch(setCurrentYear(JSON.stringify(result)));
      })
      .catch(err => {
        // console.log('error>>>',err)
        dispatch(requestError(err));
      });
  };
};

//Subject Student
export const StudentGetSubjectRegis = params => {
  return dispatch => {
    dispatch(studentGetSubjectRegis(params));
    Api.StudentGetSubjectRegister(params)
      .then(result => {
        dispatch(studentSetSubjectRegis(JSON.stringify(result)));
      })
      .catch(err => {
        // console.log('error>>>',err)
        dispatch(requestError(err));
      });
  };
};

export const RegisterSubject = params => {
  return dispatch => {
    dispatch(registerSubject(params));
    Api.RegisterSubject(params)
      .then(result => {
        dispatch(registerSubjectSuccess(JSON.stringify(result)));
      })
      .catch(err => {
        dispatch(registerSubjectFailed(err));
      });
  };
};

// Lecturer
export const GetSubjectsApprove = params => {
  return dispatch => {
    dispatch(getSubjectsApprove(params));
    Api.GetSubjectsApprove(params)
      .then(result => {
        dispatch(setSubjectsApprove(JSON.stringify(result)));
      })
      .catch(err => {
        // console.log('error>>>',err)
        dispatch(requestError(err));
      });
  };
};

export const GetStudentsApprove = params => {
  return dispatch => {
    dispatch(getStudentsApprove(params));
    Api.GetStudentsApprove(params)
      .then(result => {
        dispatch(setStudentsApprove(JSON.stringify(result)));
      })
      .catch(err => {
        // console.log('error>>>',err)
        dispatch(requestError(err));
      });
  };
};

export const CreateSubject = params => {
  return dispatch => {
    dispatch(createSubject());
    Api.CreateSubject(params)
      .then(result => {
        dispatch(createSubjectSuccess(JSON.stringify(result)));
      })
      .catch(err => {
        dispatch(createSubjectFailed(err));
      });
  };
};

export const ApproveStudent = params => {
  return dispatch => {
    dispatch(approveStudent());
    Api.ApproveStudent(params)
      .then(result => {
        dispatch(approveStudentSuccess(params));
      })
      .catch(err => {
        // console.log('err>>',err)
        dispatch(requestError(err));
      });
  };
};

export const RejectStudent = params => {
  return dispatch => {
    dispatch(rejectStudent());
    Api.RejectStudent(params)
      .then(result => {
        dispatch(rejectStudentSuccess(params));
      })
      .catch(err => {
        // console.log('err>>',err)
        dispatch(requestError(err));
      });
  };
};

export const GetSubjectOpenSection = params => {
  return dispatch => {
    dispatch(getSubjectOpenSection());
    Api.GetSubjectOpenSection(params)
      .then(result => {
        dispatch(setSubjectOpenSection(JSON.stringify(result)));
      })
      .catch(err => {
        dispatch(requestError(err));
      });
  };
};

export const OpenSection = params => {
  return dispatch => {
    dispatch(openSection());
    Api.OpenSection(params)
      .then(result => {
        dispatch(openSectionSuccess(JSON.stringify(result)));
      })
      .catch(err => {
        dispatch(openSectionFailed(err));
      });
  };
};
