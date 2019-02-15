/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { OffersPage, OfferPanel, Fetching } from 'components'
import {
  getOfferCategoriesRequest,
  getOffersRequest,
  getLocationRequest,
  onLocationInputChange,
  getLocationCoordsRequest,
  onLocationInputChangeReset,
  openPopupLevels,
  getFavoritesRequest,
  addToFavoritesRequest,
  removeFromFavoritesRequest,
} from 'store/actions'
import { fromOffers, fromPlaces, fromPopup } from 'store/selectors'
import { scrollTo } from './scrollTo'

const ALL = 'all'
const FAVORITES = 'favorites'
const MORE = 'more'

const getMarkers = offers => offers.map(offer => ({
  key: `marker-${offer.id}`,
  id: `${offer.id}`,
  offerId: offer.id,
  typeImage: offer.typeImage,
  lat: offer.location.lat,
  lng: offer.location.lng,
}))

const getCenter = (offers) => {
  const bounds = new window.google.maps.LatLngBounds()
  /* eslint-disable no-plusplus */
  for (let i = 0; i < offers.length; i++) {
    bounds.extend(offers[i].location)
  }
  const center = bounds.getCenter()

  return {
    lat: center.lat(),
    lng: center.lng(),
  }
}

let OFFERS = []

class OffersPageContainer extends Component {
  constructor(props) {
    super(props)
    this.onCategoryChange = this.onCategoryChange.bind(this)
    this.onSubCategoryChange = this.onSubCategoryChange.bind(this)
    this.onFavoritesClick = this.onFavoritesClick.bind(this)
    this.onMobileMapToggle = this.onMobileMapToggle.bind(this)

    this.onMapMarkerClick = this.onMapMarkerClick.bind(this)
    this.onMapMarkerHover = this.onMapMarkerHover.bind(this)

    this.onOfferSearchChange = this.onOfferSearchChange.bind(this)
    this.onLocSearchChange = this.onLocSearchChange.bind(this)
    this.onGetMyLocClick = this.onGetMyLocClick.bind(this)
    this.onMapPositionChange = this.onMapPositionChange.bind(this)
    this.onMapHolderMouseDown = this.onMapHolderMouseDown.bind(this)

    this.onPlaceSuggestionClick = this.onPlaceSuggestionClick.bind(this)
    this.onLocationSuggestionsReset = this.onLocationSuggestionsReset.bind(this)

    this.getOfferPanels = this.getOfferPanels.bind(this)
    this.onMobileOfferSwiped = this.onMobileOfferSwiped.bind(this)

    this.onAllOffersSelect = this.onAllOffersSelect.bind(this)
  }

  state = {
    isFavoritesSelected: false,
    selectedCategoryId: ALL,
    selectedSubCategoryId: '',
    mapMarkerId: null,
    mapCenter: { lat: 51.49, lng: -0.138 },

    locSearchValue: '',
    offerSearchValue: '',

    isPlaceKnown: false,

    isMobileMapActive: false,
    selectedOfferPanel: { id: '', index: 0 },
    expandedOfferPanelId: '',

    isUpdatingByMapPanAllowed: false,
  }

  componentWillMount() {
    this.props.getOfferCategories()
    this.props.getOffers()
    this.props.getFavorites()
  }

  componentWillReceiveProps(newProps) {
    if (this.props.isOffersFetching && !newProps.isOffersFetching) {
      window.setTimeout(() => {
        const offers = this.props.offers
        if (offers.length > 0) this.setState({ mapCenter: getCenter(offers) })
      }, 300)
    }
    if (
      (!this.props.position.lat && newProps.position.lat)
      || (this.props.position && (this.props.position.lat !== newProps.position.lat))
      || (this.props.position && (this.props.position.lng !== newProps.position.lng))
    ) {
      this.setState({
        isPlaceKnown: true,
        mapCenter: newProps.position,
      })
    }
  }

  onCategoryChange(value) {
    this.setState({
      selectedCategoryId: value,
      isFavoritesSelected: false,
      selectedSubCategoryId: '',
    }, () => {
      this.updateOffers(value)
    })
  }

  onSubCategoryChange(value) {
    const category = value !== MORE ? value : this.state.selectedCategoryId
    this.setState({ selectedSubCategoryId: value }, () => {
      this.updateOffers(category)
    })
  }

  onFavoritesClick() {
    this.setState({ isFavoritesSelected: true, selectedCategoryId: FAVORITES })
    this.props.getFavorites()
  }

  /* eslint-disable no-unused-vars-rest/no-unused-vars */
  onMapMarkerClick({ key, lat, lng }) {
    this.setState({
      // mapCenter: { lat, lng },
      mapMarkerId: key,
      expandedOfferPanelId: !this.state.isMobileMapActive ? key : '',
    })
    this.scrollToOffer(key)
  }

  onMapMarkerHover(marker) {
    this.setState({ mapMarkerId: marker })
    this.scrollToOffer(marker)
  }

  onOfferSearchChange(ev) {
    const categoryId = this.state.selectedSubCategoryId || this.state.selectedCategoryId
    const searchQuery = ev.currentTarget.value
    this.setState({ offerSearchValue: searchQuery }, () => {
      this.updateOffers(categoryId, searchQuery)
    })
  }

  onLocSearchChange(ev) {
    this.props.onLocationInputChange(ev.currentTarget.value)
    this.setState({ locSearchValue: ev.currentTarget.value })

    // this.onMapPositionChange is called after new location is set
  }

  onMapPositionChange({ marginBounds: { ne, sw } }) {
    if (this.state.isUpdatingByMapPanAllowed) {
      const categoryId = this.state.selectedSubCategoryId || this.state.selectedCategoryId
      const searchQuery = this.state.offerSearchValue
      this.updateOffers(categoryId, searchQuery, { ne, sw })
      this.setState({ isUpdatingByMapPanAllowed: false })
    }
  }

  onMapHolderMouseDown() {
    this.setState({ isUpdatingByMapPanAllowed: true })
  }

  onGetMyLocClick() {
    this.props.getUserLocation()
    this.onLocationSuggestionsReset()
  }

  onPlaceSuggestionClick({ placeId, main }) {
    this.props.getLocationCoordinates({ placeId, main })
    this.onLocationSuggestionsReset()
  }

  onLocationSuggestionsReset() {
    this.props.onLocationInputReset()
    this.setState({ locSearchValue: '' })
  }

  onMobileMapToggle() {
    this.setState({
      isMobileMapActive: !this.state.isMobileMapActive,
      expandedOfferPanelId: '',
    })
  }

  onOfferPanelFooterToggle(id) {
    this.setState({
      expandedOfferPanelId: this.state.expandedOfferPanelId === id ? '' : id,
    })
  }

  onMobileOfferSwiped(offerIndex) {
    this.setState({
      selectedOfferPanel: { id: this.props.offers[offerIndex].id, index: offerIndex },
      expandedOfferPanelId: '',
    })
  }

  onAllOffersSelect() {
    this.setState({
      isFavoritesSelected: false,
      selectedCategoryId: ALL,
      selectedSubCategoryId: '',
      offerSearchValue: '',
    })
    this.props.getOffers()
  }

  getOfferPanels(offers) {
    const { openPopupLevels, favorites } = this.props
    const { mapMarkerId } = this.state

    OFFERS = []
    const offerInit = (elem) => {
      if (elem) OFFERS.push(elem)
    }

    return (
      offers.map((o) => {
        const onFooterToggle = () => this.onOfferPanelFooterToggle(o.id)
        const onFavoritesClick = () => this.props.addToFavorites(o)
        const onRemoveFromFavoritesClick = () => this.props.removeFromFavorites(o.id)
        const isFooterExpanded = this.state.expandedOfferPanelId === o.id
        const isFavoritesPage = this.state.isFavoritesSelected
        const isOfferInFavorites = favorites.some(favorite => favorite.id === o.id)

        const isOfferSelected = o.id === mapMarkerId

        return (
          <OfferPanel
            offerRef={offerInit}
            id={o.id}
            key={`offer-panel-${o.id}`}
            sharePoints={o.sharePoints}
            buyPoints={o.buyPoints}
            title={o.title}
            image={o.image}
            icon={o.icon}
            totalUsers={o.totalUsers}
            users={o.users}
            description={o.description}
            expirationDate={o.expirationDate}
            onFooterToggle={onFooterToggle}
            isFooterExpanded={isFooterExpanded}
            onLearnHowClick={openPopupLevels}
            onFavoritesClick={onFavoritesClick}
            isFavoritesPage={isFavoritesPage}
            isOfferInFavorites={isOfferInFavorites}
            isOfferSelected={isOfferSelected}
            onRemoveFromFavoritesClick={onRemoveFromFavoritesClick}
          />
        )
      })
    )
  }

  updateOffers(categoryId, searchQuery, coords) {
    this.props.getOffers({
      categoryId: categoryId !== ALL ? categoryId : undefined,
      query: searchQuery,
      neLat: coords && coords.ne.lat,
      neLong: coords && coords.ne.lng,
      swLat: coords && coords.sw.lat,
      swLong: coords && coords.sw.lng,
    })

    this.setState({
      selectedOfferPanel: {
        id: OFFERS.length ? OFFERS[0].id : '',
        index: 0,
      },
    })
  }

  scrollToOffer(id) {
    const scroller = this.offersScroller
    const offer = OFFERS.find((offer, index) => {
      if (offer.id === id) {
        this.setState({
          selectedOfferPanel: {
            id: offer.id,
            index: OFFERS.length > 1 ? index : 0,
          },
        })
        return true
      }
      return false
    })

    if (offer) {
      scrollTo(scroller, offer.offsetTop - 55, 300)
    }
  }

  // TODO: isLocationFetching, isLocationBlocked

  render() {
    const { isFavoritesSelected, selectedCategoryId, selectedSubCategoryId, mapMarkerId, mapCenter, locSearchValue, offerSearchValue, isPlaceKnown, isMobileMapActive, selectedOfferPanel, expandedOfferPanelId } = this.state
    const { offers, favorites, categories, isCategoriesFetching, isLocationFetching, isLocationBlocked, placeSuggestions, isPopupOpened, position: { cityName } } = this.props
    const isAllSelected = selectedCategoryId === ALL

    if (isCategoriesFetching) return <Fetching />

    const selectedCategory = categories.filter(cat => cat.id === selectedCategoryId)
    const subCategories = selectedCategory.length ? selectedCategory[0].sub : []
    const offerPanels = !isFavoritesSelected ? (offers && this.getOfferPanels(offers)) : (favorites && this.getOfferPanels(favorites))
    const mapMarkers = !isFavoritesSelected ? (offers && getMarkers(offers)) : (favorites && getMarkers(favorites))

    const isOfferPanelExpanded = expandedOfferPanelId !== ''

    const offersScrollerInit = (elem) => {
      this.offersScroller = elem
    }

    return (
      <OffersPage
        menus={categories}
        subMenus={subCategories}

        selectedSubCategoryId={selectedSubCategoryId}
        isFavoritesSelected={isFavoritesSelected}
        isAllSelected={isAllSelected}
        onFavoritesClick={this.onFavoritesClick}
        onSubCategoryChange={this.onSubCategoryChange}
        onCategoryChange={this.onCategoryChange}
        onMobileMapToggle={this.onMobileMapToggle}

        offerPanels={offerPanels}

        mapCenter={mapCenter}
        mapMarkers={mapMarkers}
        onMarkerClick={this.onMapMarkerClick}
        onMarkerHover={this.onMapMarkerHover}
        mapMarkerId={mapMarkerId}
        zoom={10}
        onMapPositionChange={this.onMapPositionChange}
        onMapHolderMouseDown={this.onMapHolderMouseDown}

        isPlaceKnown={isPlaceKnown}
        locValue={locSearchValue}
        onLocChange={this.onLocSearchChange}
        onMyLocClick={this.onGetMyLocClick}
        isLocationFetching={isLocationFetching}
        isLocationBlocked={isLocationBlocked}
        cityName={cityName}
        onLocationSuggestionsReset={this.onLocationSuggestionsReset}

        onSearchChange={this.onOfferSearchChange}
        searchValue={offerSearchValue}
        placeSuggestions={placeSuggestions}
        onPlaceSuggestionClick={this.onPlaceSuggestionClick}

        isMobileMapActive={isMobileMapActive}
        onMobileOfferSwiped={this.onMobileOfferSwiped}
        selectedOfferPanelIndex={selectedOfferPanel.index}
        isOfferPanelExpanded={isOfferPanelExpanded}

        isPopupOpened={isPopupOpened}

        onAllOffersSelect={this.onAllOffersSelect}

        offersScroller={offersScrollerInit}
      />
    )
  }
}

OffersPageContainer.propTypes = {
  offers: PropTypes.array,
  favorites: PropTypes.array,
  categories: PropTypes.array,
  isOffersFetching: PropTypes.bool,
  isCategoriesFetching: PropTypes.bool,
  getOfferCategories: PropTypes.func,
  getOffers: PropTypes.func,
  getUserLocation: PropTypes.func,
  onLocationInputChange: PropTypes.func,
  onLocationInputReset: PropTypes.func,

  isLocationFetching: PropTypes.bool,
  isLocationBlocked: PropTypes.bool,
  position: PropTypes.object,

  placeSuggestions: PropTypes.array,
  getLocationCoordinates: PropTypes.func,

  openPopupLevels: PropTypes.func,
  isPopupOpened: PropTypes.bool,

  // Favorites
  getFavorites: PropTypes.func,
  addToFavorites: PropTypes.func,
  removeFromFavorites: PropTypes.func,
}

const mapStateToProps = state => ({
  offers: fromOffers.getOffers(state),
  favorites: fromOffers.getFavorites(state),
  categories: fromOffers.getCategories(state),
  isOffersFetching: fromOffers.isOffersFetching(state),
  isCategoriesFetching: fromOffers.isCategoriesFetching(state),
  isLocationFetching: fromPlaces.isLocationFetching(state),
  isLocationBlocked: fromPlaces.isLocationBlocked(state),
  position: fromPlaces.getPosition(state),
  placeSuggestions: fromPlaces.getPlaceSuggestions(state),
  isPopupOpened: fromPopup.isPopupOpened(state),
})

const mapDispatchToProps = dispatch => ({
  getOfferCategories: () => dispatch(getOfferCategoriesRequest()),
  getOffers: ({ categoryId, query, neLat, neLong, swLat, swLong } = {}) => dispatch(getOffersRequest({
    categoryId,
    query,
    neLat,
    neLong,
    swLat,
    swLong,
  })),
  getUserLocation: () => dispatch(getLocationRequest()),
  onLocationInputChange: input => dispatch(onLocationInputChange(input)),
  onLocationInputReset: () => dispatch(onLocationInputChangeReset()),
  getLocationCoordinates: ({ placeId, main, lat, lng }) => dispatch(
    getLocationCoordsRequest({ placeId, main, lat, lng }),
  ),
  openPopupLevels: () => dispatch(openPopupLevels()),

  getFavorites: () => dispatch(getFavoritesRequest()),
  addToFavorites: offerId => dispatch(addToFavoritesRequest(offerId)),
  removeFromFavorites: offerId => dispatch(removeFromFavoritesRequest(offerId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OffersPageContainer)
