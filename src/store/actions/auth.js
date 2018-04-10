import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBD2iLzEkQx7SFusv9dcnXLb6LX01Z4nz4';
    if (isSignup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBD2iLzEkQx7SFusv9dcnXLb6LX01Z4nz4';
    }
    axios.post(url, authData)
      .then(response => {
        console.log(response)
        dispatch(authSuccess(authData))
      })
      .catch(err => {
        console.log(err)
        dispatch(authFail(err))
      })
  }
}
