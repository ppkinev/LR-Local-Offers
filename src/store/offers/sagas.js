import { take, put, call, fork } from 'redux-saga/effects'
import { xdmFetch } from '../../services/xdm'
import {
  GET_OFFER_CATEGORIES_REQUEST, getOfferCategoriesSuccess, getOfferCategoriesFail,
  GET_OFFERS_REQUEST, getOffersSuccess, getOffersFail,

  GET_FAVORITES_REQUEST, getFavoritesSuccess, getFavoritesFail,
  ADD_TO_FAVORITES_REQUEST, addToFavoritesSuccess, addToFavoritesFail,
  REMOVE_FROM_FAVORITES_REQUEST, removeFromFavoritesSuccess, removeFromFavoritesFail,
} from './actions'

export function* getOfferCategoriesAction() {
  try {
    const { Categories: categories } = yield call(xdmFetch, { endpoint: 'localoffer/getcategories' })
    yield put(getOfferCategoriesSuccess(categories))
  } catch (e) {
    yield put(getOfferCategoriesFail(e))
  }
}

export function* watchGetOfferCategories() {
  while (true) {
    yield take(GET_OFFER_CATEGORIES_REQUEST)
    yield call(getOfferCategoriesAction)
  }
}

export function* getOffersAction({ categoryId, query, take, skip, sortasc, neLat, neLong, swLat, swLong }) {
  try {
    const { Offers: offers } = yield call(xdmFetch, {
      endpoint: 'localoffer/getoffers',
      data: {
        categoryId, query, take, skip, sortasc, neLat, neLong, swLat, swLong,
      },
    })
    yield put(getOffersSuccess(offers))
  } catch (e) {
    yield put(getOffersFail(e))
  }
}

export function* watchGetOffers() {
  while (true) {
    const { payload } = yield take(GET_OFFERS_REQUEST)
    yield call(getOffersAction, payload)
  }
}

export function* getFavoritesAction({ take, skip, sortasc }) {
  try {
    const { Offers: offers } = yield call(xdmFetch, {
      endpoint: 'localoffer/getfavouriteoffers',
      data: {
        take, skip, sortasc,
      },
    })
    yield put(getFavoritesSuccess(offers))
  } catch (e) {
    yield put(getFavoritesFail(e))
  }
}

export function* watchGetFavorites() {
  while (true) {
    const { payload } = yield take(GET_FAVORITES_REQUEST)
    yield call(getFavoritesAction, payload)
  }
}

export function* addToFavoritesAction(offer) {
  try {
    yield call(xdmFetch, {
      endpoint: 'localoffer/addtofavourites',
      post: true,
      data: {
        offerId: offer.id,
      },
    })
    yield put(addToFavoritesSuccess(offer))
  } catch (e) {
    yield put(addToFavoritesFail(e))
  }
}

export function* watchAddToFavorites() {
  while (true) {
    const { payload: { offer } } = yield take(ADD_TO_FAVORITES_REQUEST)
    yield call(addToFavoritesAction, offer)
  }
}

export function* removeFromFavoritesAction(offerId) {
  try {
    yield call(xdmFetch, {
      endpoint: 'localoffer/removefromfavourites',
      post: true,
      data: {
        offerId,
      },
    })
    yield put(removeFromFavoritesSuccess(offerId))
  } catch (e) {
    yield put(removeFromFavoritesFail(e))
  }
}

export function* watchRemoveFromFavorites() {
  while (true) {
    const { payload: { offerId } } = yield take(REMOVE_FROM_FAVORITES_REQUEST)
    yield call(removeFromFavoritesAction, offerId)
  }
}

export default function* () {
  yield fork(watchGetOfferCategories)
  yield fork(watchGetOffers)
  yield fork(watchGetFavorites)
  yield fork(watchAddToFavorites)
  yield fork(watchRemoveFromFavorites)
}
