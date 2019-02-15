import { initialState } from './selectors'
import {
  CLOSE_POPUP, OPEN_POPUP_LEVELS, OPEN_POPUP_LEVELS_SUCCESS,
  OPEN_POPUP_SINGLE_LEVEL, OPEN_POPUP_SINGLE_LEVEL_SUCCESS,
} from './actions'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CLOSE_POPUP:
      return {
        ...initialState,
      }
    case OPEN_POPUP_LEVELS:
      return {
        ...initialState,
        isOpened: true,
        isLevels: true,
      }
    case OPEN_POPUP_LEVELS_SUCCESS:
      return {
        ...state,
        content: payload.content,
      }
    case OPEN_POPUP_SINGLE_LEVEL:
      return {
        ...initialState,
        isOpened: true,
        isSingleLevel: true,
      }
    case OPEN_POPUP_SINGLE_LEVEL_SUCCESS:
      return {
        ...state,
        content: payload.level,
      }
    default:
      return {
        ...state,
      }
  }
}
