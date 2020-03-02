import {LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE} from '../constrant';
import {Api} from './api';

export const login = () => ({
  type: LOGIN,
});

export const login_success = data => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const login_failure = data => ({
  type: LOGIN_FAILURE,
  payload: data,
});

export const Login = params => {
  return dispatch => {
    dispatch(login());
    Api.Login(params)
      .then(result => {
        dispatch(login_success(JSON.stringify(result)));
        console.log(JSON.stringify(result));
      })
      .catch(err => {
        dispatch(login_failure(err));
      });
  };
};
