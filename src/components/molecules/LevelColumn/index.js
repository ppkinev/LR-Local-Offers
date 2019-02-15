import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { font, size, palette } from 'styled-theme'
import { Button } from 'components'
import { shadows } from '../../themes/extended'
import { iconsPath } from '../../../config'

const IMAGE_SIZE = 100

const isActiveCss = css`
  &:after {
    content: '';
    width: ${IMAGE_SIZE / 3.5}px;
    height: ${IMAGE_SIZE / 3.5}px;
    background-image: url('${iconsPath}/icon-checkbox.svg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    
    position: absolute;
    top: 0;
    right: ${IMAGE_SIZE / 2.5}px;
    z-index: 5;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  min-width: 150px;
  
  ${props => props.isActive && isActiveCss};
  
  margin: 0 6px;
`

const ImageHolder = styled.div`
  position: relative;
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 10px;
  
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

const Title = styled.h2`
  font-family: ${font('primary')};
  font-size: ${size('fontTitle')};
  color: ${palette('brand', 0)};
  text-transform: uppercase;
  padding: 0;
  margin: 0;
  margin-bottom: 10px;
  text-align: center;
`

const Description = styled.ul`
  list-style: disc inside;
  font-size: 9px;
  margin: 0;
  padding: 0;
  margin-bottom: 10px;
  min-height: 42px;
`

const DescriptionItem = styled.li`
  font-family: ${font('primary')};
  font-size: ${size('fontMessageRegular')};
  color: ${palette('grayscale', 3)};
`

const getDescriptionItems = (items) => {
  return (
    <Description>{items.map((item, i) => (
      <DescriptionItem key={`desc-item-${i}`}>{item}</DescriptionItem>))}</Description>
  )
}

const LevelColumn = ({ cashback, descriptionItems = [], image, title, id, onClick, isActive }) => {
  const cashbackTitle = `+${cashback}% cashback`
  const description = descriptionItems.length > 0 ? getDescriptionItems(descriptionItems) : <Description />
  const onBtnClick = () => onClick(id)
  return (
    <Wrapper isActive={isActive}>
      <ImageHolder><Image alt={title} src={image} /></ImageHolder>
      <Title>{cashbackTitle}</Title>
      {description}
      <Button main={!isActive} inverted={isActive} full onClick={onBtnClick}>Learn more</Button>
    </Wrapper>
  )
}

LevelColumn.propTypes = {
  cashback: PropTypes.number,
  descriptionItems: PropTypes.array,
  image: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,

  isActive: PropTypes.bool,
}

export default LevelColumn
