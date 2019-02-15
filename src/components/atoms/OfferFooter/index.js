import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { palette, font, size } from 'styled-theme'
import { iconsPath } from '../../../config'

const HEIGHT = 20

const Header = styled.h3`
  font-family: ${font('primary')};
  font-weight: 400;
  font-size: ${size('fontGeneral')};
  color: ${palette('grayscale', 3)};
  text-transform: uppercase;
  height: ${HEIGHT}px;
  line-height: ${HEIGHT}px;
  text-align: center;
  margin: 0;
  padding: 0;
  cursor: pointer;
`

const Carret = styled.span`
  display: inline-block;
  width: ${HEIGHT / 2}px;
  height: ${HEIGHT / 2}px;
  background-size: 75%;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('${iconsPath}/icon-caret-${props => props.isCollapsed ? 'down' : 'up'}.svg');
`
Carret.propTypes = {
  isCollapsed: PropTypes.bool,
}

const Body = styled.div`
  padding: 10px;
`

const Wrapper = styled.div`
  border-top: 1px solid ${palette('grayscale', 4)};
  max-height: ${props => props.isCollapsed ? `${HEIGHT}px` : '500px'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`
Wrapper.propTypes = {
  isCollapsed: PropTypes.bool,
}

const OfferFooter = ({ children, isCollapsed, onMoreClick }) => {
  const title = isCollapsed ? 'More information' : 'Less information'
  return (
    <Wrapper isCollapsed={isCollapsed}>
      <Header onClick={onMoreClick}>{title} <Carret isCollapsed={isCollapsed} /></Header>
      <Body>{children}</Body>
    </Wrapper>
  )
}
OfferFooter.propTypes = {
  children: PropTypes.node,
  isCollapsed: PropTypes.bool,
  onMoreClick: PropTypes.func,
}

export default OfferFooter
