import authActionTypes from './authAT';
import { API_URL } from '../../constants/api';
import { setUserData } from '../../util/tokenUtilities';

const { 
  LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, 
  AUTHORIZE_REQUEST, AUTHORIZE_SUCCESS, AUTHORIZE_FAILURE
} = authActionTypes;

const requestLogIn = () => ({ type: LOG_IN_REQUEST, isLoading: true, isError: false });
const successLogIn = (user) => ({ type: LOG_IN_SUCCESS, user, isLoading: false, isError: false });
const failureLogIn = (error) => ({ type: LOG_IN_FAILURE, error, isLoading: false, isError: true });

export const logIn = (user) => (dispatch) => {
  const params = {
    headers: { 'Content-Type': 'application/json' },
    method: "POST",
    body: JSON.stringify({ email: user.email, password: user.password })
  };
  dispatch(requestLogIn());
  fetch(`${API_URL}/login`, params)
    .then(res => res.json())
    .then(data => { 
      if(data.isAuth) {
        dispatch(successLogIn(data));
        setUserData(data.token);
      };
    })
    .catch(error => dispatch(failureLogIn(error)));
};

const requestAuthorize = () => ({ type: AUTHORIZE_REQUEST, isLoading: true, isError: false });
const successAuthorize = (user) => ({ type: AUTHORIZE_SUCCESS, user, isLoading: false, isError: false });
const failureAuthorize = (error) => ({ type: AUTHORIZE_FAILURE, error, isLoading: false, isError: true });

export const authorize = (token) => (dispatch) => {
  const params = {
    headers: { 
      'Content-Type': 'application/json',
      'x-token': token
    },
    method: "GET"
  };
  dispatch(requestAuthorize());
  fetch(`${API_URL}/authorize`, params)
    .then(res => res.json())
    .then(data => data.isAuth ? dispatch(successAuthorize(data)) : null)
    .catch(error => dispatch(failureAuthorize(error)));
};

