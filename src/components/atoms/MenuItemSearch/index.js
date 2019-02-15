import styled from 'styled-components'
import { iconsPath } from '../../../config'

const MenuItemSearch = styled.div`
  box-sizing: border-box;
  height: 40px;
  width: 40px;
  background-image: url('${iconsPath}/icon-search.svg');
  background-repeat: no-repeat;
  background-size: 50%;
  background-position: center;
  flex-shrink: 0;
`

export default MenuItemSearch
