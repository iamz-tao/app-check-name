import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_SUBJECT_REGIS_STD,
  SET_SUBJECT_REGIS_STD,
  REGISTER_SUBJECT_REQUEST,
  REGISTER_SUBJECT_REQUEST_SUCCESS,
  REGISTER_SUBJECT_REQUEST_FAILED,
} from '../constant';
import {Api} from './api';

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