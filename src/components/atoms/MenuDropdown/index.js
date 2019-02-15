import styled from 'styled-components'
import PropTypes from 'prop-types'
import { font, size, palette } from 'styled-theme'
import { iconsPath } from '../../../config'

const singleCaret = `${iconsPath}/icon-caret-single.svg`
const doubleCaret = `${iconsPath}/icon-caret-double.svg`

const MenuDropdown = styled.select`
  font-size: ${size('fontMenu')};
  font-family: ${font('primary')};
  color: ${palette('brand', 0)};
  font-weight: 700;
  box-sizing: border-box;
  height: 30px;
  line-height: 30px;
  padding: 0 14px 0 10px;
  outline: none;
  border: none;
  background-color: transparent;
  -webkit-appearance: none;
  background-size: 12px;
  background-repeat: no-repeat;
  background-position-x: right;
  background-position-y: center;
  background-image: url(${props => props.oneSided ? singleCaret : doubleCaret});
  
  @media ${size('mobile')} {
    padding: 0 12px 0 5px;
    text-transform: none;
    font-size: ${size('fontMenuMobile')};
    width: 100%;
    margin-right: 5px;
  }
`

MenuDropdown.propDown = {
  oneSided: PropTypes.bool,
}

export default MenuDropdown
