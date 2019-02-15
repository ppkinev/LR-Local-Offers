export const GET_ME_REQEUST = 'GET_ME_REQEUST'
export const getMeRequest = () => ({
  type: GET_ME_REQEUST,
})
export const GET_ME_FAIL = 'GET_ME_FAIL'
export const getMeFail = error => ({
  type: GET_ME_FAIL,
  payload: {
    error,
  },
})
export const GET_ME_SUCCESS = 'GET_ME_SUCCESS'
export const getMeSuccess = profile => ({
  type: GET_ME_SUCCESS,
  payload: {
    profile,
  },
})

export const POST_SIGN_IN_REQUEST = 'POST_SIGN_IN_REQUEST'
export const postSignInRequest = credentials => ({
  type: POST_SIGN_IN_REQUEST,
  payload: {
    credentials,
  },
})
export const POST_SIGN_IN_FAIL = 'POST_SIGN_IN_FAIL'
export const postSignInFail = error => ({
  type: POST_SIGN_IN_FAIL,
  payload: {
    error,
  },
})
export const POST_SIGN_IN_SUCCESS = 'POST_SIGN_IN_SUCCESS'
export const postSignInSuccess = profile => ({
  type: POST_SIGN_IN_SUCCESS,
  payload: {
    profile,
  },
})

export const POST_SIGN_UP_REQUEST = 'POST_SIGN_UP_REQUEST'
export const postSignUpRequest = credentials => ({
  type: POST_SIGN_UP_REQUEST,
  payload: {
    credentials,
  },
})
export const POST_SIGN_UP_FAIL = 'POST_SIGN_UP_FAIL'
export const postSignUpFail = error => ({
  type: POST_SIGN_UP_FAIL,
  payload: {
    error,
  },
})
export const POST_SIGN_UP_SUCCESS = 'POST_SIGN_UP_SUCCESS'
export const postSignUpSuccess = profile => ({
  type: POST_SIGN_UP_SUCCESS,
  payload: {
    profile,
  },
})

export const POST_FORGOT_REQUEST = 'POST_FORGOT_REQUEST'
export const postForgotRequest = () => ({
  type: POST_FORGOT_REQUEST,
})
export const POST_FORGOT_FAIL = 'POST_FORGOT_FAIL'
export const postForgotFail = error => ({
  type: POST_FORGOT_FAIL,
  payload: {
    error,
  },
})
export const POST_FORGOT_SUCCESS = 'POST_FORGOT_SUCCESS'
export const postForgotSuccess = () => ({
  type: POST_FORGOT_SUCCESS,
})

export const CONNECT_FB_OPEN = 'CONNECT_FB_OPEN'
export const connectFBOpen = () => ({
  type: CONNECT_FB_OPEN,
})

export const CLEAR_LOGIN_ERRORS = 'CLEAR_LOGIN_ERRORS'
export const clearLoginErrors = () => ({
  type: CLEAR_LOGIN_ERRORS,
})
