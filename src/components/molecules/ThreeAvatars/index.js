import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { AvatarCircular } from 'components'

const Holder = styled.div`
  display: flex;
  flex-direction: row;
`

const ThreeAvatars = ({ users }) => {
  const avatars = users.map((user, i) => <AvatarCircular mini image={user.image} shifted key={`avatar-${Date.now()}-${i}`} />)
  return (
    <Holder>
      {avatars}
    </Holder>
  )
}

ThreeAvatars.propTypes = {
  users: PropTypes.array,
}

export default ThreeAvatars
