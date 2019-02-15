import React from 'react'
import { storiesOf } from '@storybook/react'
import OfferFriendsFaces from '.'

storiesOf('OfferFriendsFaces', module)
  .add('many', () => (
    <OfferFriendsFaces
      total={115}
      users={[
        { image: 'https://i.pinimg.com/736x/de/1e/fe/de1efef55429481f3b9d8daf14686e82--beautiful-eyes-most-beautiful.jpg' },
        { image: 'http://www.uncle-andrew.net/blog/pics/aaron_paul.jpg' },
        { image: 'https://s-media-cache-ak0.pinimg.com/736x/e9/70/67/e970671faa03af41e716cd7e63385034--unique-faces-face-reference.jpg' },
      ]}
    />
  ))
  .add('0', () => (
    <OfferFriendsFaces
      total={0}
    />
  ))
  .add('1', () => (
    <OfferFriendsFaces
      total={1}
      users={[
        { image: 'https://s-media-cache-ak0.pinimg.com/736x/e9/70/67/e970671faa03af41e716cd7e63385034--unique-faces-face-reference.jpg' },
      ]}
    />
  ))
