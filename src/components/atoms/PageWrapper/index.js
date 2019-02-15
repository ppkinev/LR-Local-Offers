import styled from 'styled-components'
import { size, palette } from 'styled-theme'

const PageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: ${palette('bgs', 0)};
  overflow: hidden;
  box-sizing: border-box;
  padding-top: ${size('menuHeight')};
`

export default PageWrapper
