import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { font, size, palette } from 'styled-theme'
import { Button } from 'components'
import { shadows } from '../../themes/extended'


const IMAGE_SIZE = 100
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const ImageHolder = styled.div`
  position: relative;
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 10px;
  flex-shrink: 0;
  
  ${shadows.wide};
`
const Image = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: auto;
`

const TextHolder = styled.div`
  text-align: left;
  width: 100%;
  margin-left: 20px;  
`

const Text = styled.div`
  font-family: ${font('primary')};
  font-size: ${size('fontMessageRegular')};
  color: ${palette('grayscale', 2)};
  margin-bottom: 20px;
`

const SingleLevelLayout = ({ title, image, text, ctaText, onClick }) => {
  return (
    <Wrapper>
      <ImageHolder><Image alt={title} src={image} /></ImageHolder>
      <TextHolder>
        <Text>{text}</Text>
        <Button main full widthLimited onClick={onClick}>{ctaText}</Button>
      </TextHolder>
    </Wrapper>
  )
}

SingleLevelLayout.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  text: PropTypes.string,
  ctaText: PropTypes.string,
  onClick: PropTypes.func,
}

export default SingleLevelLayout
