import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { palette, font, size } from 'styled-theme'

const Logo = styled.img`
  position: absolute;
  top: 5px;
  right: 5px;
  max-width: 50%;
  max-height: 40px;
  z-index: 5;
`

const Title = styled.h2`
  position: absolute;
  bottom: 0;
  left: 0;
  font-family: ${font('primary')};
  font-size: 16px;
  color: ${palette('white', 0)};
  line-height: 24px;
  margin: 0;
  padding: 10px;
  z-index: 5;
  
  @media ${size('mobile')} {
    font-size: 14px;
    line-height: 18px;
    padding: 6px;
  }
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${palette('brand', 0)};
  opacity: 0.3;
  z-index: 3;
`

const Holder = styled.div`
  position: relative;
  
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  ${props => props.bg && `background-image:url(${props.bg});`}
`

Holder.propTypes = {
  bg: PropTypes.string,
}

const OfferImage = ({ icon, title, image }) => {
  const logo = icon && <Logo src={icon} />

  return (
    <Holder bg={image}>
      <Overlay />
      {logo}
      <Title>{title}</Title>
    </Holder>
  )
}

OfferImage.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  image: PropTypes.string,
}

export default OfferImage
