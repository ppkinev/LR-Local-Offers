import styled from 'styled-components'
import { iconsPath } from '../../../config'

const MenuItemFavorites = styled.div`
  box-sizing: border-box;
  height: 30px;
  width: 30px;
  background-image: url('${iconsPath}/icon-star.svg');
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center;
  flex-shrink: 0;
`

export default MenuItemFavorites
