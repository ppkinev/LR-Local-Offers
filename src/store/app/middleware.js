import { IFRAME_MESSAGE_SEND, GET_APP_SUCCESS } from './actions'

const middleware = store => next => (action) => {
  const { payload, type } = action

  if (type === IFRAME_MESSAGE_SEND) {
    const { message } = payload
    window.parent.postMessage(JSON.stringify(message), '*')
  }

  if (type === GET_APP_SUCCESS) {
    const { app } = payload
    return next({
      ...action,
      payload: {
        app: {
          title: app.AppTitle,
          foundation: app.FoundationName,
          foundationUrl: app.FoundationRewardsSiteUrl,
          isActive: app.IsActive,
        },
      },
    })
  }

  return next(action)
}

export default middleware
