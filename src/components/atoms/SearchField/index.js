import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { palette, font, size } from 'styled-theme'
import { shadows } from '../../themes/extended'
import { sideGrowLeft } from '../../themes/keyframes'
import { iconsPath } from '../../../config'

const Input = styled.input.attrs({
  type: 'text',
  placeholder: 'Search for an offer',
})`
  font-family: ${font('primary')};
  font-size: ${size('fontMenu')};
  width: 100%;
  height: 60%;
  border: none;
  border-bottom: 2px solid ${palette('brand', 0)};
  background-color: transparent;
  margin: 0 10px;
  padding-right: 25px;
  outline: none;
`

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: ${palette('white', 0)};
  background-image: url('${iconsPath}/icon-search.svg');
  background-size: auto 40%;
  background-position-x: calc(100% - 15px);
  background-position-y: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  ${shadows.wide}
  animation: ${sideGrowLeft} 0.3s ease forwards 1;
`

const SearchField = ({ value, onChange }) => {
  return (
    <Wrapper>
      <Input value={value} onChange={onChange} />
    </Wrapper>
  )
}

SearchField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default SearchField
