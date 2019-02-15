import styled from 'styled-components'
import { size } from 'styled-theme'
import { iconsPath } from '../../../config'

const MenuItemMap = styled.div`
  display: none;
  
  box-sizing: border-box;
  height: 40px;
  width: 40px;
  background-image: url('${iconsPath}/icon-map.svg');
  background-repeat: no-repeat;
  background-size: 50%;
  background-position: center;
  flex-shrink: 0;
  
  @media ${size('mobile')} {
    display: block;
  }
`

export default MenuItemMap
