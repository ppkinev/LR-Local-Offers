import { signalRInit } from 'store/actions'
import {
  getMeRequest,
  GET_ME_SUCCESS,
  POST_SIGN_IN_SUCCESS,
  POST_SIGN_UP_SUCCESS,
  POST_SIGN_UP_REQUEST,
  CONNECT_FB_OPEN,

  POST_SIGN_IN_FAIL,
  POST_SIGN_UP_FAIL,
  POST_FORGOT_FAIL,
} from './actions'
import { apiPrefix, apiKey } from '../../config'
import { WindowCentered } from '../../services/helpers'

const middleware = store => next => (action) => {
  const { type, payload } = action
  if (
    type === GET_ME_SUCCESS
    || type === POST_SIGN_IN_SUCCESS
    || type === POST_SIGN_UP_SUCCESS
  ) {
    const { profile } = payload
    const me = {
      createdOn: profile.CreatedOn,
      facebookId: profile.FacebookId,
      image: profile.ImageUrl,
      id: profile.UserId,
      name: profile.UserName,
      points: profile.Wallet.PointsConfirmed,
      level: profile.UserLevel ? {
        description: profile.UserLevel.Description,
        image: profile.UserLevel.ImageUrl,
        rank: profile.UserLevel.Rank,
        title: profile.UserLevel.Title,
      } : null,
    }

    // Doing something on first user detection
    if (!store.getState().profile.id) {
      store.dispatch(signalRInit())
    }

    return next({
      ...action,
      payload: {
        profile: me,
      },
    })
  }

  if (type === POST_SIGN_UP_REQUEST) {
    const { credentials } = action.payload
    return next({
      ...action,
      payload: {
        credentials: {
          ...credentials,
          username: credentials.name,
          name: undefined,
        },
      },
    })
  }

  if (type === CONNECT_FB_OPEN) {
    WindowCentered({
      url: `${apiPrefix}auth/facebook?api_key=${apiKey}`,
      onClose: () => store.dispatch(getMeRequest()),
    })
  }

  if (
    type === POST_SIGN_IN_FAIL
    || type === POST_SIGN_UP_FAIL
    || type === POST_FORGOT_FAIL
  ) {
    const { error } = action.payload
    const { Message: message, ModelState: fields } = error
    const properError = { message }
    if (fields) {
      properError.fields = {}
      Object.entries(fields).forEach(([k, v]) => {
        properError.fields[k.substring(k.lastIndexOf('.') + 1, k.length).toLowerCase()] = v[0]
      })
    }
    return next({
      ...action,
      payload: {
        error: properError,
      },
    })
  }

  return next(action)
}

export default middleware
