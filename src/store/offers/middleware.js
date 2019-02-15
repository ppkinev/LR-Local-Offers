import {
  GET_OFFER_CATEGORIES_SUCCESS,
  GET_OFFERS_SUCCESS,
} from './actions'

const middleware = store => next => (action) => {
  const { type, payload } = action
  const PAUSE = 2000


  return next(action)
}

export default middleware
