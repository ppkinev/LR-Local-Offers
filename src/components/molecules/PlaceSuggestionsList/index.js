import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { font, palette, size } from 'styled-theme'
import { iconsPath } from '../../../config'

const Holder = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  font-family: ${font('primary')};
`

const itemDefaultCss = css`
  color: ${palette('brand', 0)};
  background-image: url(${iconsPath}/icon-location.svg);
  border-bottom: 1px solid ${palette('brand', 0)};
  transition: background-color 0.2s ease,
              color 0.2s ease;
  &:hover {
    background-color: ${palette('brandTransparent', 2)};
    color: ${palette('white', 0)};
    background-image: url(${iconsPath}/icon-location-white.svg);
  }
`
const itemBrandCss = css`
  background-color: transparent;
  color: ${palette('white', 0)};
  background-image: url(${iconsPath}/icon-location-white.svg);
  border-bottom: 1px solid ${palette('white', 0)};
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.5;
  }
`

const Item = styled.li`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  background-repeat: no-repeat;
  background-size: 12px;
  background-position-x: 7px;
  background-position-y: 50%;
  padding: 8px 8px 8px 25px; 
  cursor: pointer;
              
  ${props => props.brandTheme ? itemBrandCss : itemDefaultCss}
`

const Main = styled.h3`
  margin: 0;
  padding: 0;
  font-size: ${size('fontTitle')};
  margin-right: 4px;
`

const Secondary = styled.p`
  margin: 0;
  padding: 0;
  font-size: ${size('fontSubtitle')};
`

const PlaceSuggestionsList = ({ places = [], onPlaceClick, brandTheme, suggestionsListRef }) => {
  const items = places.map((place) => {
    const onClick = () => onPlaceClick({ placeId: place.placeId, main: place.main })
    return (
      <Item onClick={onClick} key={place.placeId} brandTheme={brandTheme}>
        <Main>{place.main}</Main><Secondary>{place.secondary}</Secondary>
      </Item>
    )
  })

  return (
    <Holder innerRef={suggestionsListRef}>
      {items}
    </Holder>
  )
}

PlaceSuggestionsList.propTypes = {
  places: PropTypes.array,
  onPlaceClick: PropTypes.func,
  brandTheme: PropTypes.bool,
  suggestionsListRef: PropTypes.func,
}

export default PlaceSuggestionsList
