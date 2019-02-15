import styled from 'styled-components'
import PropTypes from 'prop-types'
import { font, size, palette } from 'styled-theme'

const OfferText = styled.p`
  font-family: ${font('primary')};
  font-size: ${size('fontGeneral')};
  margin: 0;
  ${props => props.capitalize && 'text-transform: uppercase;'}
  ${props => props.capitalize && 'white-space: nowrap;'}
  color: ${props => props.brand ? palette('brand', 1) : palette('grayscale', 2)};
  
  @media ${size('mobile')} {
    font-size: ${size('fontSmall')};
  }
`

OfferText.propTypes = {
  capitalize: PropTypes.bool,
  brand: PropTypes.bool,
}

export default OfferText
