import { take, call, put, fork } from 'redux-saga/effects'
import {
  ON_LOCATION_INPUT_CHANGE, onLocationInputChangeSuccess, onLocationInputChangeFail,
  GET_LOCATION_COORDS_REQUEST, getLocationCoordsSuccess, getLocationCoordsFail,
} from './actions'
import { filterPlacesByType } from './helpers'

const displaySuggestions = (input) => {
  const service = new window.google.maps.places.AutocompleteService()
  return new Promise((resolve, reject) => {
    service.getQueryPredictions({ input }, (predictions, status) => {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        reject()
      } else {
        resolve(predictions)
      }
    })
  })
}
export function* placeAutocompleteAction(input) {
  try {
    const predictions = yield displaySuggestions(input)
    yield put(onLocationInputChangeSuccess(predictions))
  } catch (e) {
    yield put(onLocationInputChangeFail(e))
  }
}
export function* watchPlaceAutocomplete() {
  while (true) {
    const { payload: { input } } = yield take(ON_LOCATION_INPUT_CHANGE)
    yield call(placeAutocompleteAction, input)
  }
}


const getLocationCoords = ({ placeId, main, lat, lng }) => {
  const geocoder = new window.google.maps.Geocoder()
  return new Promise((resolve, reject) => {
    const query = (lat && lng) ? { location: { lat: parseFloat(lat), lng: parseFloat(lng) } } : { placeId }

    geocoder.geocode(query, (results, status) => {
      if (status !== 'OK') reject()
      else {
        try {
          const result = (results.length === 1)
            ? results[0]
            : results.filter(r => (r.types && r.types.some(filterPlacesByType)))[0]
          const cityName = main ||
            result.address_components.filter(a => (a.types && a.types.some(type => type === 'locality')))[0].long_name

          resolve({
            lat: result.geometry.location.lat(),
            lng: result.geometry.location.lng(),
            cityName,
          })
        } catch (e) {
          reject()
        }
      }
    })
  })
}
export function* getLocationCoordsAction(placeProps) {
  try {
    const position = yield getLocationCoords(placeProps)
    yield put(getLocationCoordsSuccess(position))
  } catch (e) {
    yield put(getLocationCoordsFail(e))
  }
}
export function* watchGetLocationCoords() {
  while (true) {
    const { payload: placeProps } = yield take(GET_LOCATION_COORDS_REQUEST)
    yield call(getLocationCoordsAction, placeProps)
  }
}


export default function*() {
  yield fork(watchPlaceAutocomplete)
  yield fork(watchGetLocationCoords)
}
