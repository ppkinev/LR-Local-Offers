/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { palette, font, size } from 'styled-theme'
import { PlaceSuggestionsList } from 'components'
import { iconsPath } from '../../../config'

const HEIGHT = 36

const Holder = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;

  background-color: ${palette('brandTransparent', 0)};
  border-bottom-left-radius: ${HEIGHT / 2}px;
  border-top-left-radius: ${HEIGHT / 2}px;
  border-bottom-right-radius: ${HEIGHT / 2}px;
  padding: 8px 16px;
  box-sizing: border-box;
`

const SearchHolder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
`

const SuggestionListHolder = styled.div``

const Input = styled.input.attrs({
  type: 'text',
  placeholder: 'Start typing...',
})`
  height: 100%;
  line-height: ${HEIGHT - 2}px;
  border: 0;
  outline: 0;
  background-color: transparent;
  color: ${palette('white', 0)};
  font-family: ${font('primary')};
  font-size: ${size('fontMenu')};
  border-bottom: 1px solid ${palette('white', 0)};
  box-sizing: border-box;
  padding-right: 20px;
  width: 100%;
  
  &::placeholder {
    color: ${palette('brand', 1)};  
  }
`

const MyLocationBtn = styled.div`
  position: absolute;
  top: 50%;
  right: -10px;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  background-image: url('${iconsPath}/icon-location-white.svg');
  background-size: 9px;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`

const CityName = styled.h3`
  color: ${palette('white', 0)};
  font-family: ${font('primary')};
  font-size: ${size('fontMenu')};
  font-weight: 700;
  margin: 0;
  padding: 0;
  text-transform: uppercase;
`

const ChangeBtn = styled.h3`
  color: ${palette('white', 0)};
  font-family: ${font('primary')};
  font-size: ${size('fontMenu')};
  font-weight: 100;
  margin: 0;
  padding: 0;
  text-transform: uppercase;
  margin-left: 5px;
  opacity: 0.7;
`


class LocationPromptSmall extends Component {
  constructor(props) {
    super(props)
    this.onActivate = this.onActivate.bind(this)
    this.onDeactivate = this.onDeactivate.bind(this)
    this.onPlaceClick = this.onPlaceClick.bind(this)
  }

  state = {
    isActive: false,
  }

  onActivate() {
    this.setState({ isActive: true })
    document.body.addEventListener('click', this.onDeactivate)
    window.setTimeout(() => {
      if (this.inputLoc) this.inputLoc.focus()
    }, 100)
  }

  onDeactivate(ev) {
    if (
      ev.target !== this.inputLoc
      && ev.target !== this.btnLoc
      && ev.target !== this.suggestionsListRef
      && ev.target.parentNode !== this.suggestionsListRef
      && ev.target.parentNode.parentNode !== this.suggestionsListRef
    ) {
      this.setState({ isActive: false })
      this.props.onLocationSuggestionsReset()
      document.body.removeEventListener('click', this.onDeactivate)
    }
  }

  onPlaceClick(place) {
    this.props.onPlaceSuggestionClick(place)
    this.setState({ isActive: false })
    document.body.removeEventListener('click', this.onDeactivate)
    window.setTimeout(() => {
      this.props.onLocationSuggestionsReset()
    }, 100)
  }

  render() {
    const { locValue, onLocChange, onMyLocClick, cityName, placeSuggestions } = this.props
    const { isActive } = this.state

    const linkInputToDOM = (elem) => {
      this.inputLoc = elem
    }
    const linkBtnToDOM = (elem) => {
      this.btnLoc = elem
    }
    const linkListToDom = (elem) => {
      this.suggestionsListRef = elem
    }

    const placeSuggestionsList = placeSuggestions.length > 0 ? (
      <PlaceSuggestionsList
        suggestionsListRef={linkListToDom}
        brandTheme
        places={placeSuggestions}
        onPlaceClick={this.onPlaceClick}
      />
    ) : null

    const activeState = (
      <Holder>
        <SearchHolder>
          <Input innerRef={linkInputToDOM} value={locValue} onChange={onLocChange} />
          <MyLocationBtn innerRef={linkBtnToDOM} onClick={onMyLocClick} />
        </SearchHolder>
        <SuggestionListHolder>
          {placeSuggestionsList}
        </SuggestionListHolder>
      </Holder>
    )

    const deactiveState = (
      <Holder>
        <SearchHolder>
          <CityName>{cityName}</CityName>
          <ChangeBtn onClick={this.onActivate}>Change</ChangeBtn>
        </SearchHolder>
      </Holder>
    )

    return isActive ? activeState : deactiveState
  }
}

LocationPromptSmall.propTypes = {
  locValue: PropTypes.string,
  onLocChange: PropTypes.func,
  onMyLocClick: PropTypes.func,

  cityName: PropTypes.string,

  placeSuggestions: PropTypes.array,
  onPlaceSuggestionClick: PropTypes.func,
  onLocationSuggestionsReset: PropTypes.func,
}

export default LocationPromptSmall
