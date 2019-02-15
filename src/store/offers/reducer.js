import { initialState } from './selectors'
import {
  GET_OFFERS_REQUEST, GET_OFFERS_SUCCESS, GET_OFFERS_FAIL,
  GET_OFFER_CATEGORIES_REQUEST, GET_OFFER_CATEGORIES_SUCCESS, GET_OFFER_CATEGORIES_FAIL,
  GET_FAVORITES_REQUEST, GET_FAVORITES_SUCCESS, GET_FAVORITES_FAIL,
  ADD_TO_FAVORITES_REQUEST, ADD_TO_FAVORITES_SUCCESS, ADD_TO_FAVORITES_FAIL,
  REMOVE_FROM_FAVORITES_REQUEST, REMOVE_FROM_FAVORITES_SUCCESS, REMOVE_FROM_FAVORITES_FAIL,
} from './actions'
import {
  normalizeCategories, normalizeOffers,
} from './normalizers'

export default (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case GET_OFFERS_REQUEST:
    case GET_FAVORITES_REQUEST:
      return {
        ...state,
        isOffersFetching: true,
        error: null,
      }
    case GET_OFFERS_SUCCESS:
      return {
        ...state,
        isOffersFetching: false,
        list: normalizeOffers(payload.offers),
      }
    case GET_FAVORITES_SUCCESS:
      return {
        ...state,
        isOffersFetching: false,
        favorites: normalizeOffers(payload.offers),
      }
    case GET_OFFERS_FAIL:
    case GET_FAVORITES_FAIL:
      return {
        ...state,
        isOffersFetching: false,
        error: payload.error,
      }
    case GET_OFFER_CATEGORIES_REQUEST:
      return {
        ...state,
        isCategoriesFetching: true,
        categories: [],
        error: null,
      }
    case GET_OFFER_CATEGORIES_SUCCESS:
      return {
        ...state,
        isCategoriesFetching: false,
        categories: normalizeCategories(payload.categories),
      }
    case GET_OFFER_CATEGORIES_FAIL:
      return {
        ...state,
        isCategoriesFetching: false,
        error: payload.error,
      }
    case ADD_TO_FAVORITES_REQUEST:
      return {
        ...state,
        isPostingFavorites: true,
      }
    case ADD_TO_FAVORITES_SUCCESS:
      return {
        ...state,
        isPostingFavorites: false,
        favorites: [...state.favorites, payload.offer],
      }
    case REMOVE_FROM_FAVORITES_REQUEST:
      return {
        ...state,
        isPostingFavorites: true,
      }
    case REMOVE_FROM_FAVORITES_SUCCESS:
      return {
        ...state,
        isPostingFavorites: false,
        favorites: [...state.favorites.filter(offer => offer.id !== payload.offerId)],
      }
    default:
      return {
        ...state,
      }
  }
}
