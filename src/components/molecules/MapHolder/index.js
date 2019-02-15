import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { LocationPrompt, LocationPromptSmall } from 'components'

const commonCss = css`
  position: relative;
  width: 100%;
  height: 100%;
`

const BlurHolder = styled.div`
  ${commonCss};
`
const Blurred = styled.div`
  ${commonCss};
  filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius='4');
  filter: url(#lr-gmap-blur-filter);
  filter: blur(4px);
`

const TouchBlocker = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const CleanHolder = styled.div`
  ${commonCss};
`

const LocationHolder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  display: flex;
  justify-content: center;
  align-items: center;
`

const MapHolder = ({
                     isPlaceKnown,
                     children,
                     locValue,
                     onLocChange,
                     onMyLocClick,
                     placeSuggestions,
                     onPlaceSuggestionClick,
                     onLocationSuggestionsReset,
                     cityName,
                   }) => {
  return !isPlaceKnown ? (
    <BlurHolder>
      <Blurred>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
          <defs>
            <filter id="lr-gmap-blur-filter">
              <feGaussianBlur stdDeviation="3"></feGaussianBlur>
            </filter>
          </defs>
        </svg>
        {children}
        <TouchBlocker />
      </Blurred>
      <LocationHolder>
        <LocationPrompt
          locValue={locValue}
          onMyLocClick={onMyLocClick}
          onLocChange={onLocChange}
          placeSuggestions={placeSuggestions}
          onPlaceSuggestionClick={onPlaceSuggestionClick}
        />
      </LocationHolder>
    </BlurHolder>
  ) : (
    <CleanHolder>
      {children}
      <LocationPromptSmall
        locValue={locValue}
        onMyLocClick={onMyLocClick}
        onLocChange={onLocChange}
        cityName={cityName}
        placeSuggestions={placeSuggestions}
        onPlaceSuggestionClick={onPlaceSuggestionClick}
        onLocationSuggestionsReset={onLocationSuggestionsReset}
      />
    </CleanHolder>
  )
}

MapHolder.propTypes = {
  locValue: PropTypes.string,
  onLocChange: PropTypes.func,
  onMyLocClick: PropTypes.func,

  isPlaceKnown: PropTypes.bool,
  children: PropTypes.node,

  placeSuggestions: PropTypes.array,
  onPlaceSuggestionClick: PropTypes.func,
  onLocationSuggestionsReset: PropTypes.func,

  cityName: PropTypes.string,
}

export default MapHolder
