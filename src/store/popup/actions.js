export const CLOSE_POPUP = 'CLOSE_POPUP'
export const closePopup = () => ({
  type: CLOSE_POPUP,
})

export const OPEN_POPUP_LEVELS = 'OPEN_POPUP_LEVELS'
export const openPopupLevels = () => ({
  type: OPEN_POPUP_LEVELS,
})

export const OPEN_POPUP_LEVELS_SUCCESS = 'OPEN_POPUP_LEVELS_SUCCESS'
export const openPopupLevelsSuccess = levels => ({
  type: OPEN_POPUP_LEVELS_SUCCESS,
  payload: {
    content: levels,
  },
})

export const OPEN_POPUP_SINGLE_LEVEL = 'OPEN_POPUP_SINGLE_LEVEL'
export const openPopupSingleLevel = id => ({
  type: OPEN_POPUP_SINGLE_LEVEL,
  payload: {
    levelId: id,
  },
})

export const OPEN_POPUP_SINGLE_LEVEL_SUCCESS = 'OPEN_POPUP_SINGLE_LEVEL_SUCCESS'
export const openPopupSingleLevelSuccess = (level) => ({
  type: OPEN_POPUP_SINGLE_LEVEL_SUCCESS,
  payload: {
    level,
  },
})
