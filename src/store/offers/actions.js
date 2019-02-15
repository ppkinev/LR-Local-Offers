export const GET_OFFER_CATEGORIES_REQUEST = 'GET_OFFER_CATEGORIES_REQUEST'
export const getOfferCategoriesRequest = () => ({
  type: GET_OFFER_CATEGORIES_REQUEST,
})
export const GET_OFFER_CATEGORIES_SUCCESS = 'GET_OFFER_CATEGORIES_SUCCESS'
export const getOfferCategoriesSuccess = categories => ({
  type: GET_OFFER_CATEGORIES_SUCCESS,
  payload: {
    categories,
  },
})
export const GET_OFFER_CATEGORIES_FAIL = 'GET_OFFER_CATEGORIES_FAIL'
export const getOfferCategoriesFail = error => ({
  type: GET_OFFER_CATEGORIES_FAIL,
  payload: {
    error,
  },
})

export const GET_OFFERS_REQUEST = 'GET_OFFERS_REQUEST'
export const getOffersRequest = ({ categoryId, query, take, skip, sortasc, neLat, neLong, swLat, swLong } = {}) => ({
  type: GET_OFFERS_REQUEST,
  payload: {
    categoryId, query, take, skip, sortasc, neLat, neLong, swLat, swLong,
  },
})
export const GET_OFFERS_SUCCESS = 'GET_OFFERS_SUCCESS'
export const getOffersSuccess = offers => ({
  type: GET_OFFERS_SUCCESS,
  payload: {
    offers,
  },
})
export const GET_OFFERS_FAIL = 'GET_OFFERS_FAIL'
export const getOffersFail = error => ({
  type: GET_OFFERS_FAIL,
  payload: {
    error,
  },
})

export const GET_FAVORITES_REQUEST = 'GET_FAVORITES_REQUEST'
export const getFavoritesRequest = ({ take, skip, sortasc } = {}) => ({
  type: GET_FAVORITES_REQUEST,
  payload: {
    take, skip, sortasc,
  },
})
export const GET_FAVORITES_SUCCESS = 'GET_FAVORITES_SUCCESS'
export const getFavoritesSuccess = offers => ({
  type: GET_FAVORITES_SUCCESS,
  payload: {
    offers,
  },
})
export const GET_FAVORITES_FAIL = 'GET_FAVORITES_FAIL'
export const getFavoritesFail = error => ({
  type: GET_FAVORITES_FAIL,
  payload: {
    error,
  },
})

export const ADD_TO_FAVORITES_REQUEST = 'ADD_TO_FAVORITES_REQUEST'
export const addToFavoritesRequest = offer => ({
  type: ADD_TO_FAVORITES_REQUEST,
  payload: {
    offer,
  },
})
export const ADD_TO_FAVORITES_SUCCESS = 'ADD_TO_FAVORITES_SUCCESS'
export const addToFavoritesSuccess = offer => ({
  type: ADD_TO_FAVORITES_SUCCESS,
  payload: {
    offer,
  },
})
export const ADD_TO_FAVORITES_FAIL = 'ADD_TO_FAVORITES_FAIL'
export const addToFavoritesFail = error => ({
  type: ADD_TO_FAVORITES_FAIL,
  payload: {
    error,
  },
})

export const REMOVE_FROM_FAVORITES_REQUEST = 'REMOVE_FROM_FAVORITES_REQUEST'
export const removeFromFavoritesRequest = offerId => ({
  type: REMOVE_FROM_FAVORITES_REQUEST,
  payload: {
    offerId,
  },
})
export const REMOVE_FROM_FAVORITES_SUCCESS = 'REMOVE_FROM_FAVORITES_SUCCESS'
export const removeFromFavoritesSuccess = offerId => ({
  type: REMOVE_FROM_FAVORITES_SUCCESS,
  payload: {
    offerId,
  },
})
export const REMOVE_FROM_FAVORITES_FAIL = 'REMOVE_FROM_FAVORITES_FAIL'
export const removeFromFavoritesFail = error => ({
  type: REMOVE_FROM_FAVORITES_FAIL,
  payload: {
    error,
  },
})
