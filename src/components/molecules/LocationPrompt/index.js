import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { font, palette, size } from 'styled-theme'
import { PlaceSuggestionsList } from 'components'
import { iconsPath } from '../../../config'

const commonCss = css`
  width: 100%;
  text-align: left;
`

const Header = styled.h2`
  ${commonCss};
  color: ${palette('brand', 0)};
  font-family: ${font('primary')};
  font-size: ${size('fontMenu')};
  text-transform: uppercase;
  margin: 0;
  padding: 0;
`

const Input = styled.input.attrs({
  type: 'text',
  placeholder: 'Start typing...',
})`
  ${commonCss};
  line-height: 34px;
  height: 34px;
  border: 0;
  outline: 0;
  background-color: transparent;
  color: ${palette('brand', 0)};
  font-family: ${font('primary')};
  font-size: ${size('fontMenu')};
  border-bottom: 2px solid ${palette('brand', 0)};
  
  margin-top: 6px;
`

const MyLocationBtn = styled.div`
  ${commonCss};
  background-image: url('${iconsPath}/icon-location.svg');
  background-size: 13px;
  background-repeat: no-repeat;
  background-position: left center;
  color: ${palette('brand', 0)};
  font-family: ${font('primary')};
  font-size: ${size('fontMenu')};
  line-height: 32px;
  padding-left: 16px;
  box-sizing: border-box;
  cursor: pointer;
`

const Holder = styled.div`
  max-width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const LocationPrompt = ({ locValue, onLocChange, onMyLocClick, placeSuggestions, onPlaceSuggestionClick }) => {
  const locationBtn = (('geolocation' in navigator) && placeSuggestions.length === 0)
    ? <MyLocationBtn onClick={onMyLocClick}>Use my location</MyLocationBtn>
    : null
  const placeSuggestionsList = placeSuggestions.length > 0 ? (
    <PlaceSuggestionsList
      places={placeSuggestions}
      onPlaceClick={onPlaceSuggestionClick}
    />
  ) : null

  return (
    <Holder>
      <Header>Enter your location</Header>
      <Input value={locValue} onChange={onLocChange} />
      {locationBtn}
      {placeSuggestionsList}
    </Holder>
  )
}

LocationPrompt.propTypes = {
  locValue: PropTypes.string,
  onLocChange: PropTypes.func,
  onMyLocClick: PropTypes.func,

  placeSuggestions: PropTypes.array,
  onPlaceSuggestionClick: PropTypes.func,
}

export default LocationPrompt
