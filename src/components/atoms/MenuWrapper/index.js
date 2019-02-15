import styled from 'styled-components'
import { palette, size } from 'styled-theme'

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${palette('white', 0)};
  width: 100%;
  height: ${size('menuHeight')};
  box-sizing: border-box;
  padding: 0 10px;
  position: fixed;
  top: 0;
  left: 0;
`

export default MenuWrapper
