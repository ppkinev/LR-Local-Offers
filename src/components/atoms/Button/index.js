import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { palette, font, size } from 'styled-theme'
import { shadows } from '../../themes/extended'
import { iconsPath } from '../../../config'

const mainCss = css`
  background-color: ${palette('brand', 0)};
  border: 1px solid transparent;
  color: ${palette('white', 0)};
`
const highlightedCss = css`background-color: ${palette('success', 1)}`
const invertedCss = css`
  background-color: ${palette('brandInverted', 0)};
  border: 1px solid transparent;
  color: ${palette('brand', 0)};
  font-weight: bold;
`
const getIconsCss = (small) => {
  return css`
  padding-left: ${small ? '10px' : '22px'};
  background-repeat: no-repeat;
  background-size: 8px 10px;
  background-position: 6px 50%;
  `
}

const getFbCss = (small) => {
  return css`
  background-color: transparent;
  border: 1px solid ${palette('grayscale', 3)};
  color: ${palette('grayscale', 3)};
  background-image: url('${iconsPath}/icon-facebook.svg');
  ${getIconsCss(small)};
`
}

const getFavouritesCss = (small) => {
  return css`
  background-color: ${palette('brand', 0)};
  border: 1px solid transparent;
  color: ${palette('white', 0)}; 
  background-image: url('${iconsPath}/icon-star.svg');
  ${getIconsCss(small)};
  background-size: 12px;
`
}

const activatedCss = css`
  background-color: ${palette('success', 0)};
  cursor: default;
`

const fullCss = css`
  font-size: 12px;
  width: 100%;
  height: auto;
  padding: 10px;
`

const smallCss = css`
  width: 84px;
  padding: 4px;
  
  @media ${size('mobile')} {
    width: 75px;
  }
`

const Button = styled.button.attrs({
  type: 'button',
})`
  @media ${size('mobile')} {
    width: 100%;
  }

  -webkit-appearance: none;
  font-family: ${font('primary')};
  font-size: ${size('fontSubtitle')};
  outline: none;
  width: auto;
  height: 24px;
  cursor: pointer;
  text-align: center;
  box-sizing: border-box;
  text-transform: uppercase;
  border-radius: 2px;
  padding: 4px 10px;
  
  ${shadows.tiny};
  
  ${props => props.full && fullCss};
  ${props => props.small && smallCss};
  ${props => props.widthLimited && 'width: auto'};
  ${props => props.main && mainCss};
  ${props => props.inverted && invertedCss};
  ${props => props.fb && getFbCss(props.small)};
  ${props => props.favorites && getFavouritesCss(props.small)};
  ${props => props.activated && activatedCss};
  ${props => props.highlighted && highlightedCss};
`

Button.propTypes = {
  fb: PropTypes.bool,
  main: PropTypes.bool,
  inverted: PropTypes.bool,
  favorites: PropTypes.bool,
  small: PropTypes.bool,
  full: PropTypes.bool,
  activated: PropTypes.bool,
  widthLimited: PropTypes.bool,
  highlighted: PropTypes.bool,
}

export default Button
