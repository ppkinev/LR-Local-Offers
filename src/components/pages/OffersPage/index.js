import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { size } from 'styled-theme'
import { PageWrapper, Menu, Map, EmptyListPanel } from 'components'
import { Carousel } from 'react-responsive-carousel'
import PopupContainer from '../../../containers/PopupContainer'


const PageBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`
const leftSideActiveCss = css`
  padding: 10px;
  display: block;
`
const leftSideNotActiveCss = css`
  display: none;
`
const LeftSide = styled.div`
  @media ${size('middle')} {
    width: 60%;
  }
  
  @media ${size('mobile')} {
    width: 100%;
    ${props => props.active ? leftSideActiveCss : leftSideNotActiveCss};
  }

  width: 50%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 5px 5px 5px 10px;
`
LeftSide.propTypes = {
  active: PropTypes.bool,
}

const rightSideActiveCss = css`
  padding: 0;
  display: block;
`
const rightSideNotActiveCss = css`
  display: none;
`
const RightSide = styled.div`
  @media ${size('middle')} {
    width: 40%;
  }
  
  @media ${size('mobile')} {
    width: 100%;
    ${props => props.active ? rightSideActiveCss : rightSideNotActiveCss};
  }
  
  width: 50%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 0 10px 0 5px;
`
RightSide.propTypes = {
  active: PropTypes.bool,
}

const MobileCarouselHolder = styled.div`
  @media ${size('mobile')} {
    display: block;
  }
  
  display: none;
`

const PANEL_HEIGHT = 140
const collapsedMapCss = css`
  height: 0;
  padding: 0;
  margin-top: 10px;
  overflow: hidden;
`

const expandedMobileMapCss = css`
  height:calc(100% - ${PANEL_HEIGHT + 10}px);
`

const expandedMobileMapSmallCss = css`
  height:calc(100% - ${PANEL_HEIGHT + 30}px);
`

const MobileMapHolder = styled.div`
  @media ${size('mobile')} {
    ${props => props.isCollapsed ? collapsedMapCss : expandedMobileMapCss};
  }
  
  @media ${size('iphone5')} {
    ${props => props.isCollapsed ? collapsedMapCss : expandedMobileMapSmallCss};    
  }

  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 0;
  transition: height 0.3s ease, padding 0.3s ease;
`

const OffersPage = (props) => {
  const {
    menus,
    subMenus,

    selectedSubCategoryId,
    onFavoritesClick,
    onCategoryChange,
    onSubCategoryChange,
    isFavoritesSelected,
    isAllSelected,

    offerPanels,
    onMobileOfferSwiped,
    selectedOfferPanelIndex,
    isOfferPanelExpanded,

    mapCenter,
    mapMarkers,
    mapMarkerId,
    onMarkerClick,
    onMarkerHover,
    zoom,

    isPlaceKnown,
    locValue,
    onLocChange,
    onMyLocClick,
    cityName,
    onMapPositionChange,
    onMapHolderMouseDown,

    onSearchChange,
    searchValue,

    placeSuggestions,
    onPlaceSuggestionClick,
    onLocationSuggestionsReset,

    onMobileMapToggle,
    isMobileMapActive,

    isPopupOpened,

    onAllOffersSelect,

    offersScroller,
  } = props

  const popup = isPopupOpened ? <PopupContainer /> : null
  const emptyText = isFavoritesSelected
    ? 'You haven\'t added any offers to favorites yet'
    : 'There are currently no offers in this category'
  const emtyDescription = isFavoritesSelected
    ? 'Use the navigation bar to browse through hundreds of offers we have handpicked for you and pick some to add to your favourites.'
    : 'There are currently no offers in this category, but we constantly add offers, so have a look later :)'


  const offersToShow = offerPanels.length > 0 ? offerPanels
    : (
      <EmptyListPanel
        title={emptyText}
        description={emtyDescription}
        ctaText={'See all offers'}
        ctaClick={onAllOffersSelect}
      />
    )

  return (
    <PageWrapper>
      <Menu
        menus={menus}
        subMenus={subMenus}
        selectedSubCategoryId={selectedSubCategoryId}
        onFavoritesClick={onFavoritesClick}
        onCategoryChange={onCategoryChange}
        onSubCategoryChange={onSubCategoryChange}
        isFavoritesSelected={isFavoritesSelected}
        isAllSelected={isAllSelected}
        onSearchChange={onSearchChange}
        searchValue={searchValue}
        onMobileMapToggle={onMobileMapToggle}
      />
      <PageBody>
        <LeftSide active={!isMobileMapActive} innerRef={offersScroller}>
          {offersToShow}
        </LeftSide>
        <RightSide active={isMobileMapActive} onMouseDown={onMapHolderMouseDown}>
          <MobileMapHolder isCollapsed={isOfferPanelExpanded}>
            <Map
              zoom={zoom}
              center={mapCenter}
              markers={mapMarkers}
              onMarkerClick={onMarkerClick}
              onHoverKeyChange={onMarkerHover}
              markerHoverId={mapMarkerId}

              isPlaceKnown={isPlaceKnown}
              locValue={locValue}
              onMyLocClick={onMyLocClick}
              onLocChange={onLocChange}
              cityName={cityName}
              onMapPositionChange={onMapPositionChange}

              placeSuggestions={placeSuggestions}
              onPlaceSuggestionClick={onPlaceSuggestionClick}
              onLocationSuggestionsReset={onLocationSuggestionsReset}
            />
          </MobileMapHolder>
          <MobileCarouselHolder>
            <Carousel
              onChange={onMobileOfferSwiped}
              selectedItem={selectedOfferPanelIndex}
              showArrows={false}
              showStatus={false}
              showIndicators={false}
              showThumbs={false}
              emulateTouch
              infiniteLoop
            >
              {offersToShow}
            </Carousel>
          </MobileCarouselHolder>
        </RightSide>
      </PageBody>
      {popup}
    </PageWrapper>
  )
}

OffersPage.propTypes = {
  menus: PropTypes.array.isRequired,
  subMenus: PropTypes.array,

  selectedSubCategoryId: PropTypes.string,
  isFavoritesSelected: PropTypes.bool,
  isAllSelected: PropTypes.bool,
  onFavoritesClick: PropTypes.func,
  onSubCategoryChange: PropTypes.func,
  onCategoryChange: PropTypes.func,

  offerPanels: PropTypes.array,
  onMobileOfferSwiped: PropTypes.func,

  mapCenter: PropTypes.object,
  mapMarkers: PropTypes.array,
  mapMarkerId: PropTypes.string,
  onMarkerClick: PropTypes.func,
  onMarkerHover: PropTypes.func,
  zoom: PropTypes.number,

  isPlaceKnown: PropTypes.bool,
  locValue: PropTypes.string,
  onLocChange: PropTypes.func,
  onMyLocClick: PropTypes.func,
  cityName: PropTypes.string,
  onMapPositionChange: PropTypes.func,
  onMapHolderMouseDown: PropTypes.func,

  onSearchChange: PropTypes.func,
  searchValue: PropTypes.string,

  placeSuggestions: PropTypes.array,
  onPlaceSuggestionClick: PropTypes.func,
  onLocationSuggestionsReset: PropTypes.func,

  onMobileMapToggle: PropTypes.func,
  isMobileMapActive: PropTypes.bool,
  selectedOfferPanelIndex: PropTypes.number,
  isOfferPanelExpanded: PropTypes.bool,

  isPopupOpened: PropTypes.bool,

  onAllOffersSelect: PropTypes.func,

  offersScroller: PropTypes.func,
}

export default OffersPage
