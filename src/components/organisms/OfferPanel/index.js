import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { palette, size } from 'styled-theme'
import { Button, TextLink, OfferImage, OfferFooter, OfferCountdown, OfferText, OfferFriendsFaces } from 'components'
import CountdownContainer from '../../../containers/CountdownContainer'
import { shadows } from '../../themes/extended'

const wrapperSelectedCss = css`
  border: 1px solid ${palette('success', 1)};
  ${shadows.wideGreen};
`
const Wrapper = styled.div` 
  height: auto;
  width: 100%;
  background-color: ${palette('white', 0)};
  ${shadows.wide};
  margin: 5px 0;
  position: relative;
  
  border: 1px solid transparent;
  
  ${props => props.isOfferSelected && wrapperSelectedCss};
`

const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  height: 120px;
  width: 100%;
  
  @media ${size('iphone5')} {
    height: 140px;
  }
`

const LeftSide = styled.div`
  width: 45%;
  height: 100%;
  
  @media ${size('mobile')} {
    width: 40%;
  }
`

const RightSide = styled.div`
  width: 55%;
  padding: 10px;
  text-align: left;
  box-sizing: border-box;
  
  @media ${size('mobile')} {
    width: 60%;
    padding: 5px;
  }
`

const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 8px 0;
  
  & > button + button {
    margin-left: 10px;
  }
  
  @media ${size('mobile')} {
    ${props => props.column && `
      flex-wrap: wrap;
      & > button + button {
        margin-left: 0;
        margin-top: 10px;
      }
    `}
  }
`

const ButtonHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  & + & {
    margin-left: 10px;
  }
  
  & > button {
    margin-bottom: 2px;
  }
  
  @media ${size('mobile')} {
    & + & {
      margin-left: 5px;
    }
  }
`

const RemoveFromFavoritesBtn = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  font-size: 12px;
  text-align: center;
  line-height: 30px;
  
  cursor: pointer;
  color: ${palette('grayscale', 2)};
`

const OfferPanel = (props) => {
  const {
    id,
    image, icon, title,
    description,
    users, totalUsers,
    buyPoints, sharePoints,
    expirationDate,
    onLearnHowClick,
    onBuyClick,
    onShareClick,
    onFavoritesClick,
    onRemoveFromFavoritesClick,
    onFooterToggle,
    isFooterExpanded,
    isFavoritesPage,
    isOfferInFavorites,

    isOfferSelected,

    offerRef,
  } = props

  const removeFromFavoritesBtn = isFavoritesPage && (
    <RemoveFromFavoritesBtn onClick={onRemoveFromFavoritesClick}>&times;</RemoveFromFavoritesBtn>
  )

  const addToFavoritesBtn = !isOfferInFavorites
    ? (<Button favorites onClick={onFavoritesClick}>Add this offer to favorites</Button>)
    : (<Button favorites activated>This offer is in your favorites</Button>)

  return (
    <Wrapper innerRef={offerRef} id={id} isOfferSelected={isOfferSelected}>
      <Top>
        <LeftSide>
          <OfferImage
            image={image}
            icon={icon}
            title={title}
          />
        </LeftSide>
        <RightSide>
          <OfferCountdown highlighted={isOfferSelected}><CountdownContainer expirationDate={expirationDate} /></OfferCountdown>
          <OfferFriendsFaces
            users={users}
            total={totalUsers}
          />
          <ButtonArea>
            <ButtonHolder>
              <Button main small onClick={onBuyClick} highlighted={isOfferSelected}>Buy now</Button>
              {buyPoints && <OfferText capitalize brand>Earn {buyPoints} points</OfferText>}
            </ButtonHolder>
            <ButtonHolder>
              <Button fb small onClick={onShareClick}>Share it</Button>
              {sharePoints && <OfferText capitalize brand>Earn {sharePoints} points</OfferText>}
            </ButtonHolder>
          </ButtonArea>
          <OfferText>
            Want more discount and points? <TextLink onClick={onLearnHowClick}>Learn how</TextLink>
          </OfferText>
        </RightSide>
      </Top>
      <OfferFooter isCollapsed={!isFooterExpanded} onMoreClick={onFooterToggle}>
        <OfferText>{description}</OfferText>
        <ButtonArea column>
          <Button fb onClick={onShareClick}>Share this offer</Button>
          {addToFavoritesBtn}
        </ButtonArea>
      </OfferFooter>
      {removeFromFavoritesBtn}
    </Wrapper>
  )
}

OfferPanel.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  users: PropTypes.array,
  totalUsers: PropTypes.number,
  buyPoints: PropTypes.number,
  sharePoints: PropTypes.number,
  isCollapsed: PropTypes.bool,
  expirationDate: PropTypes.string,
  onBuyClick: PropTypes.func,
  onShareClick: PropTypes.func,
  onFavoritesClick: PropTypes.func,
  onRemoveFromFavoritesClick: PropTypes.func,
  onLearnHowClick: PropTypes.func,

  onFooterToggle: PropTypes.func,
  isFooterExpanded: PropTypes.bool,

  isOfferInFavorites: PropTypes.bool,
  isFavoritesPage: PropTypes.bool,

  isOfferSelected: PropTypes.bool,

  offerRef: PropTypes.func,
}

export default OfferPanel
