import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import { font, size, palette } from 'styled-theme'

const activeCss = css`
  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 1px;
    background-color: ${palette('brand', 0)};
  }
`

const MenuItem = styled.h3`
  position: relative;
  font-size: ${size('fontMenu')};
  font-family: ${font('primary')};
  color: ${palette('brand', 0)};
  font-weight: 400;
  box-sizing: border-box;
  height: 30px;
  line-height: 30px;
  padding: 0;
  margin: 0 10px;
  
  ${props => props.isActive && activeCss};
  
  cursor: pointer;
`

MenuItem.propTypes = {
  isActive: PropTypes.bool,
}

export default MenuItem
