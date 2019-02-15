export const initialState = {
  isAuthorized: false,
  isGetMeFetching: false,
  isLoginFetching: false,
  error: {},
  newPasswordSent: false,
}
export const isAuthorized = (state = initialState) => state.isAuthorized
export const isLoginFetching = (state = initialState) => state.isLoginFetching
export const isGetMeFetching = (state = initialState) => state.isGetMeFetching
