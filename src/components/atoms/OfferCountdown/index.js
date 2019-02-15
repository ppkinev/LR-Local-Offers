import styled, {css} from 'styled-components'
import PropTypes from 'prop-types'
import { palette, font, size } from 'styled-theme'

const textHiglightedCss = css`color: ${palette('success', 1)};`

const OfferCountdown = styled.h4`
  font-family: ${font('primary')};
  font-size: ${size('fontSubtitle')};
  color: ${palette('brand', 0)};
  text-transform: uppercase;
  margin: 0;
  
  ${props => props.highlighted && textHiglightedCss};
`

OfferCountdown.propTypes = {
  highlighted: PropTypes.bool,
}

export default OfferCountdown
