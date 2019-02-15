import { initialState } from './selectors'
import {
  GET_LOCATION_REQUEST, GET_LOCATION_SUCCESS, GET_LOCATION_FAIL,
  ON_LOCATION_INPUT_CHANGE_SUCCESS, GET_LOCATION_COORDS_SUCCESS,
  ON_LOCATION_INPUT_CHANGE_FAIL, ON_LOCATION_INPUT_CHAGE_RESET,
} from './actions'

export default (state = initialState, { type, payload = { profile: {} } }) => {
  switch (type) {
    case GET_LOCATION_REQUEST:
      return {
        ...state,
        isLocationFetching: true,
        isLocationBlocked: false,
      }
    case GET_LOCATION_SUCCESS:
      return {
        ...state,
        isLocationFetching: false,
        position: payload.position,
      }
    case GET_LOCATION_FAIL:
      return {
        ...state,
        isLocationFetching: false,
        isLocationBlocked: true,
      }
    case ON_LOCATION_INPUT_CHANGE_SUCCESS:
      return {
        ...state,
        placeSuggestions: payload.predictions,
      }
    case ON_LOCATION_INPUT_CHAGE_RESET:
      return {
        ...state,
        placeSuggestions: [],
      }
    case GET_LOCATION_COORDS_SUCCESS:
      return {
        ...state,
        position: payload.position,
      }
    case ON_LOCATION_INPUT_CHANGE_FAIL:
      return {
        ...state,
        placeSuggestions: [],
      }
    default:
      return {
        ...state,
      }
  }
}
