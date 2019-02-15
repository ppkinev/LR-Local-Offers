import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { font, size, palette } from 'styled-theme'
import { ThreeAvatars } from 'components'

const Label = styled.p`
  font-family: ${font('primary')};
  font-size: ${size('fontGeneral')};
  color: ${palette('grayscale', 2)};
  margin: ${props => props.noUsers ? '0' : '0 0 0 5px'};
`
Label.propTypes = {
  noUsers: PropTypes.bool,
}

const Holder = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 8px 0;
  ${props => !props.noUsers && 'padding-left: 5px;'}
`

const OfferFriendsFaces = ({ users, total }) => {
  const text = total === 0 ? 'Be the first to purchase' : `${total} friend${total > 1 ? 's' : ''} purchased it`
  const avatars = users && users.length > 0 ? <ThreeAvatars users={users} /> : null
  const noUsers = total === 0

  return (
    <Holder noUsers={noUsers}>
      {avatars}
      <Label noUsers={noUsers}>{text}</Label>
    </Holder>
  )
}

OfferFriendsFaces.propTypes = {
  users: PropTypes.array,
  total: PropTypes.number,
}

export default OfferFriendsFaces
