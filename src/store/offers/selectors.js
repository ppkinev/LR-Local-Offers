export const initialState = {
  isOffersFetching: false,
  isCategoriesFetching: false,
  list: [],
  favorites: [],
  categories: [],
  error: null,
  isPostingFavorites: false,
}
export const isOffersFetching = (state = initialState) => state.isOffersFetching
export const isCategoriesFetching = (state = initialState) => state.isCategoriesFetching
export const isPostingFavorites = (state = initialState) => state.isPostingFavorites
export const getOffers = (state = initialState) => state.list
export const getFavorites = (state = initialState) => state.favorites
export const getCategories = (state = initialState) => state.categories
