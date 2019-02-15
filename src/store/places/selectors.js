export const initialState = {
  isLocationFetching: false,
  isLocationBlocked: false,
  position: {},
  placeSuggestions: [],
}

export const isLocationFetching = (state = initialState) => state.isLocationFetching
export const isLocationBlocked = (state = initialState) => state.isLocationBlocked
export const getPosition = (state = initialState) => state.position
export const getPlaceSuggestions = (state = initialState) => state.placeSuggestions
