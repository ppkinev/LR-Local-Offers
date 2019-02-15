import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { size, font, palette } from 'styled-theme'
import { shadows } from '../../themes/extended'
import { popupAppears, popupAppearsMobile } from '../../themes/keyframes'

const Wrapper = styled.div`
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 0;
  min-width: 90%;
  max-width: 100%;
  border-radius: 2px;
  animation: ${popupAppears} 0.3s ease forwards 1;
  
  max-height: 100%;
  
  @media ${size('middleToMax')} {
    min-width: 720px;
  }
  
  @media ${size('mobile')} {
    left: 1%;
    bottom: 1%;
    right: 1%;
    padding-bottom: 30px;
    transform: none;
    animation: ${popupAppearsMobile} 0.3s ease forwards 1;  
  }
  
  ${shadows.wide};
`

const HEADER_SIZE = 50
const Header = styled.div`
  font-family: ${font('primary')};
  font-size: ${size('fontMenu')};
  color: ${palette('white', 0)};
  
  box-sizing: border-box;
  height: ${HEADER_SIZE}px;
  padding: 0 0 0 20px;
  background-color: ${palette('brand', 0)};
  
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CloseBtn = styled.div`
  height: ${HEADER_SIZE}px;
  width: ${HEADER_SIZE}px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: 10px;
  cursor: pointer;
  
  font-size: 28px;
  font-weight: 100;
`

const levelsCss = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  @media ${size('middle')} {
    flex-wrap: wrap;
  }
`
const Body = styled.div`
  @media ${size('mobile')} {
    height: calc(88vh - ${HEADER_SIZE}px); 
  }
  box-sizing: border-box;
  margin: 0;
  padding: 30px 20px;
  background-color: ${palette('white', 0)};
  max-width: 100%;
  max-height: calc(96vh - ${HEADER_SIZE}px);
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  ${props => props.isLevelPopup && levelsCss};
`

const Popup = ({ title, onClose, isLevelPopup, children }) => {
  return (
    <Wrapper>
      <Header>
        {title}
        <CloseBtn onClick={onClose}>&times;</CloseBtn>
      </Header>
      <Body isLevelPopup={isLevelPopup}>{children}</Body>
    </Wrapper>
  )
}

Popup.propTypes = {
  title: PropTypes.string,
  isLevelPopup: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
}

export default Popup
