import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_SUBJECT_REGIS_STD,
  SET_SUBJECT_REGIS_STD,
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

// Auth
export const Login = params => {
  return dispatch => {
    dispatch(login());
    Api.Login(params)
      .then(result => {
        dispatch(login_success(JSON.stringify(result)));
        // console.log('api',JSON.stringify(result));
      })
      .catch(err => {
        dispatch(login_failure(err));
      });
  };
};

//Subject Student
export const StudentGetSubjectRegis = params => {
  // console.log(params,'paramss')
  return dispatch => {
    dispatch(studentGetSubjectRegis(params));
    Api.StudentGetSubjectRegister(params)
      .then(result => {
        console.log('xxxxx',result)
        // dispatch(studentSetSubjectRegis(JSON.stringify(result)));
        // console.log('subject',JSON.stringify(result)) 
      })
      .catch(err => {
        console.log('error>>>',err)
        // dispatch(login_failure(err));
      });
  };
};
