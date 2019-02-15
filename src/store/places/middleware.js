import {
  GET_LOCATION_REQUEST,
  getLocationSuccess,
  getLocationFail,
  getLocationCoordsRequest,

  ON_LOCATION_INPUT_CHANGE_SUCCESS,
} from './actions'
import { filterPlacesByType } from './helpers'


const middleware = store => next => (action) => {
  const { type, payload } = action

  if (type === GET_LOCATION_REQUEST) {
    navigator.geolocation.getCurrentPosition((position) => {
      store.dispatch(getLocationSuccess({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }))
      store.dispatch(getLocationCoordsRequest({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }))
    }, () => {
      store.dispatch(getLocationFail())
    })
  }

  if (type === ON_LOCATION_INPUT_CHANGE_SUCCESS) {
    const predictions = payload.predictions
      .filter(
        prediction => prediction.types && prediction.types.some(filterPlacesByType),
      )
      .map(pr => pr.structured_formatting
        ? {
          main: pr.structured_formatting.main_text,
          secondary: pr.structured_formatting.secondary_text,
          placeId: pr.place_id,
        }
        : { main: pr.decription, placeId: pr.place_id },
      )

    return next({
      ...action,
      payload: {
        predictions,
      },
    })
  }

  return next(action)
}

export default middleware
