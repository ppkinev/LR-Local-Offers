import { initialState } from './selectors'
import {
  GET_ME_REQEUST, GET_ME_SUCCESS, GET_ME_FAIL,
  POST_SIGN_IN_REQUEST, POST_SIGN_IN_SUCCESS, POST_SIGN_IN_FAIL,
  POST_SIGN_UP_REQUEST, POST_SIGN_UP_SUCCESS, POST_SIGN_UP_FAIL,
  POST_FORGOT_REQUEST, POST_FORGOT_SUCCESS, POST_FORGOT_FAIL,
  CLEAR_LOGIN_ERRORS,
} from './actions'

export default (state = initialState, { type, payload = { profile: {} } }) => {
  switch (type) {
    case GET_ME_REQEUST:
      return {
        ...state,
        isGetMeFetching: true,
        newPasswordSent: false,
        error: {},
      }
    case POST_SIGN_IN_REQUEST:
    case POST_SIGN_UP_REQUEST:
    case POST_FORGOT_REQUEST:
      return {
        ...state,
        isLoginFetching: true,
        newPasswordSent: false,
        error: {},
      }
    case GET_ME_SUCCESS:
    case POST_SIGN_IN_SUCCESS:
    case POST_SIGN_UP_SUCCESS:
      return {
        ...state,
        ...payload.profile,
        isLoginFetching: false,
        isGetMeFetching: false,
        isAuthorized: true,
      }
    case POST_FORGOT_SUCCESS:
      return {
        ...state,
        isLoginFetching: false,
        newPasswordSent: true,
      }
    case GET_ME_FAIL:
      return {
        ...state,
        isLoginFetching: false,
        isGetMeFetching: false,
        isAuthorized: false,
      }
    case POST_SIGN_IN_FAIL:
    case POST_SIGN_UP_FAIL:
    case POST_FORGOT_FAIL:
      return {
        ...state,
        isLoginFetching: false,
        isGetMeFetching: false,
        isAuthorized: false,
        error: payload.error,
      }
    case CLEAR_LOGIN_ERRORS:
      return {
        ...state,
        error: {},
      }
    default:
      return {
        ...state,
      }
  }
}
