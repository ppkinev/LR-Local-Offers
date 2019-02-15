// Browser location
export const GET_LOCATION_REQUEST = 'GET_LOCATION_REQUEST'
export const getLocationRequest = () => ({
  type: GET_LOCATION_REQUEST,
})
export const GET_LOCATION_SUCCESS = 'GET_LOCATION_SUCCESS'
export const getLocationSuccess = position => ({
  type: GET_LOCATION_SUCCESS,
  payload: {
    position,
  },
})
export const GET_LOCATION_FAIL = 'GET_LOCATION_FAIL'
export const getLocationFail = () => ({
  type: GET_LOCATION_FAIL,
})

export const ON_LOCATION_INPUT_CHANGE = 'ON_LOCATION_INPUT_CHANGE'
export const onLocationInputChange = input => ({
  type: ON_LOCATION_INPUT_CHANGE,
  payload: {
    input,
  },
})
export const ON_LOCATION_INPUT_CHANGE_SUCCESS = 'ON_LOCATION_INPUT_CHANGE_SUCCESS'
export const onLocationInputChangeSuccess = predictions => ({
  type: ON_LOCATION_INPUT_CHANGE_SUCCESS,
  payload: {
    predictions,
  },
})
export const ON_LOCATION_INPUT_CHANGE_FAIL = 'ON_LOCATION_INPUT_CHANGE_FAIL'
export const onLocationInputChangeFail = () => ({
  type: ON_LOCATION_INPUT_CHANGE_FAIL,
})
export const ON_LOCATION_INPUT_CHAGE_RESET = 'ON_LOCATION_INPUT_CHAGE_RESET'
export const onLocationInputChangeReset = () => ({
  type: ON_LOCATION_INPUT_CHAGE_RESET,
})

export const GET_LOCATION_COORDS_REQUEST = 'GET_LOCATION_COORDS_REQUEST'
export const getLocationCoordsRequest = ({ placeId, main, lat, lng }) => ({
  type: GET_LOCATION_COORDS_REQUEST,
  payload: {
    placeId,
    main,
    lat,
    lng,
  },
})
export const GET_LOCATION_COORDS_SUCCESS = 'GET_LOCATION_COORDS_SUCCESS'
export const getLocationCoordsSuccess = position => ({
  type: GET_LOCATION_COORDS_SUCCESS,
  payload: {
    position,
  },
})
export const GET_LOCATION_COORDS_FAIL = 'GET_LOCATION_COORDS_FAIL'
export const getLocationCoordsFail = () => ({
  type: GET_LOCATION_COORDS_FAIL,
})
