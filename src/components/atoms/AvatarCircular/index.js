import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Image = styled.img`
  position: absolute;
  width: 100%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const getHolderSize = function getHolderSize(props) {
  if (props.big) return 36
  if (props.small) return 18
  if (props.mini) return 12
  return 30
}
const ImageHolder = styled.div`
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  width: ${props => getHolderSize(props)}px;
  height: ${props => getHolderSize(props)}px;
  flex-shrink: 0;
  ${props => props.shifted && `margin-left: -${getHolderSize(props) / 3}px`}
`

const AvatarCircular = ({ image, big, small, mini, shifted }) => {
  return (
    <ImageHolder big={big} small={small} mini={mini} shifted={shifted}>
      <Image src={image} />
    </ImageHolder>
  )
}

AvatarCircular.propTypes = {
  image: PropTypes.string,
  big: PropTypes.bool,
  small: PropTypes.bool,
  mini: PropTypes.bool,
  shifted: PropTypes.bool,
}

AvatarCircular.defaultProps = {
  image: 'https://static.rewarded.club/content/main/assets/images/default-profile.png',
}

export default AvatarCircular
