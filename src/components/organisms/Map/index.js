import React from 'react'
import GoogleMapReact from 'google-map-react'
import PropTypes from 'prop-types'
import { MapMarker, MapHolder } from 'components'

const KEY = 'AIzaSyDl0VO_Qp6bJZkgWW8XtwTcfMjd57N10bE'

const Map = ({
               center,
               zoom,
               markers,
               markerHoverId,
               onMarkerClick,
               onHoverKeyChange,
               isPlaceKnown,
               locValue,
               onLocChange,
               onMyLocClick,
               cityName,
               onMapPositionChange,

               placeSuggestions,
               onPlaceSuggestionClick,
               onLocationSuggestionsReset,
             }) => {
  const bootstrapURLKeys = {
    key: KEY,
    libraries: 'places',
  }
  const markerElements = markers && markers.map(
    marker => (
      <MapMarker
        key={marker.id}
        lat={marker.lat}
        lng={marker.lng}
        hover={marker.id === markerHoverId}
        typeImage={marker.typeImage}
      />
    ),
  )
  const onChildClick = (key, childProps) => {
    if (onMarkerClick) onMarkerClick({ key, lat: childProps.lat, lng: childProps.lng })
  }
  const onChildMouseEnter = key => onHoverKeyChange(key)
  const onChildMouseLeave = () => onHoverKeyChange(null)

  return (
    <MapHolder
      isPlaceKnown={isPlaceKnown}
      locValue={locValue}
      onLocChange={onLocChange}
      onMyLocClick={onMyLocClick}
      cityName={cityName}

      placeSuggestions={placeSuggestions}
      onPlaceSuggestionClick={onPlaceSuggestionClick}
      onLocationSuggestionsReset={onLocationSuggestionsReset}
    >
      <GoogleMapReact
        bootstrapURLKeys={bootstrapURLKeys}
        libraries={'places'}
        hoverDistance={50 / 2}
        center={center}
        zoom={zoom}
        onChildClick={onChildClick}
        onChildMouseEnter={onChildMouseEnter}
        onChildMouseLeave={onChildMouseLeave}
        yesIWantToUseGoogleMapApiInternals
        onChange={onMapPositionChange}

        gestureHandling={'greedy'}
      >
        {markerElements}
      </GoogleMapReact>
    </MapHolder>
  )
}

// TODO: remove 'gestureHandling' property if it works badly

Map.propTypes = {
  center: PropTypes.object,
  zoom: PropTypes.number,

  markers: PropTypes.array,
  markerHoverId: PropTypes.string,
  onMarkerClick: PropTypes.func,
  onHoverKeyChange: PropTypes.func,

  isPlaceKnown: PropTypes.bool,
  locValue: PropTypes.string,
  onLocChange: PropTypes.func,
  onMyLocClick: PropTypes.func,
  cityName: PropTypes.string,
  onMapPositionChange: PropTypes.func,

  placeSuggestions: PropTypes.array,
  onPlaceSuggestionClick: PropTypes.func,
  onLocationSuggestionsReset: PropTypes.func,
}

export default Map
