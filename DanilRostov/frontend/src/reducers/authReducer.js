import authActionTypes from '../actions/auth/authAT';

const {
  LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
  AUTHORIZE_REQUEST, AUTHORIZE_SUCCESS, AUTHORIZE_FAILURE
} = authActionTypes;

const authReducer = (state = {user: null}, { type, user, isLoading, isError }) => {
  switch(type) {
    case LOG_IN_REQUEST: {
      return {
        isLoading,
        isError
      }
    }
    case LOG_IN_SUCCESS: {
      return {
        user,
        isLoading,
        isError
      }
    }
    case LOG_IN_FAILURE: {
      return {
        isLoading,
        isError
      }
    }
    case AUTHORIZE_REQUEST: {
      return {
        isLoading,
        isError
      }
    }
    case AUTHORIZE_SUCCESS: {
      return {
        user,
        isLoading,
        isError
      }
    }
    case AUTHORIZE_FAILURE: {
      return {
        isLoading,
        isError
      }
    }
    default:
      return state;
  }
};

export default authReducer;