import styled from 'styled-components'
import { palette, size, font } from 'styled-theme'

const TextLink = styled.span`
  display: inline;
  font-family: ${font('primary')};
  font-size: ${size('fontGeneral')};
  color: ${palette('brand', 1)};
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${palette('brand', 0)};  
  }
`

export default TextLink
