import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { iconsPath } from '../../../config'

const SIZE = 50

const hoverCss = css`
  transform: scale(1.2, 1.2);
`

const MapMarker = styled.div`
  position: absolute;
  width: ${SIZE}px;
  height: ${SIZE}px;
  left: ${-SIZE / 2}px;
  top: ${-SIZE / 2}px;
  cursor: pointer;
  background-image: url('${iconsPath}/marker-body.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  transition: transform 0.3s ease;
  ${props => props.hover && hoverCss}
  
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 3px;
    width: ${SIZE * 0.5}px;
    height: ${SIZE * 0.5}px;
    transform: translateX(-50%);
    background-image: url(${props => props.typeImage});
    background-repeat: no-repeat;
    background-size: 60%;
    background-position: center;
  }
`
MapMarker.propTypes = {
  typeImage: PropTypes.string,
  hover: PropTypes.bool,
}

export default MapMarker
