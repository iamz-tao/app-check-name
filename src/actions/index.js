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
  SET_SUBJECT_TEACH
} from '../constant';
import {Api} from './api';
import NavigationServices from '../navigate/NavigationServices'

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
})

export const registerSubjectSuccess = payload => ({
  payload,
  type: REGISTER_SUBJECT_REQUEST_SUCCESS,
})

export const registerSubjectFailed = payload => ({
  payload,
  type: REGISTER_SUBJECT_REQUEST_FAILED,
})

export const getCurrentYear = payload => ({
  payload,
  type: GET_CURRENT_YEAR,
})

export const setCurrentYear = payload => ({
  payload,
  type: SET_CURRENT_YEAR,
})

export const getStudentsApprove = payload => ({
  payload,
  type: GET_STUDENT_APPROVE,
})

export const setStudentsApprove = payload => ({
  payload,
  type: SET_STUDENT_APPROVE,
})

export const getSubjectsApprove = payload => ({
  payload,
  type: GET_SUBJECT_TEACH,
})

export const setSubjectsApprove = payload => ({
  payload,
  type: SET_SUBJECT_TEACH,
})

export const createSubject = payload => ({
  payload,
  type: CREATE_SUBJECT,
})

export const createSubjectSuccess = payload => ({
  payload,
  type: CREATE_SUBJECT_SUCCESS,
})

export const createSubjectFailed = payload => ({
  payload,
  type: CREATE_SUBJECT_FAILED,
})

export const logout = payload => ({
  payload,
  type: LOGOUT,
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
        console.log('error>>>',err)
        // dispatch(login_failure(err));
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
        console.log('error>>>',err)
        // dispatch(login_failure(err));
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
  }
}

// Lecturer
export const GetSubjectsApprove = params => {
  return dispatch => {
    dispatch(getSubjectsApprove(params));
    Api.GetSubjectsApprove(params)
      .then(result => {
        dispatch(setSubjectsApprove(JSON.stringify(result)));
      })
      .catch(err => {
        console.log('error>>>',err)
        // dispatch(login_failure(err));
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
        console.log('error>>>',err)
        // dispatch(login_failure(err));
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