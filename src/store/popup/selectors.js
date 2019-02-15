export const initialState = { isOpened: false, type: null, content: null, isLevels: false, isSingleLevel: false }
export const isPopupOpened = (state = initialState) => state.isOpened
export const popupContent = (state = initialState) => state.content
export const isLevelsType = (state = initialState) => state.isLevels
export const isSingleLevel = (state = initialState) => state.isSingleLevel
