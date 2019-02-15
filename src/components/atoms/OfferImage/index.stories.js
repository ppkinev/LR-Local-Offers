import React from 'react'
import { storiesOf } from '@storybook/react'
import OfferImage from '.'

storiesOf('OfferImage', module)
  .add('default', () => (<OfferImage
    title="This is some title for the image"
    image="http://media.istockphoto.com/photos/beautiful-cloudscape-over-the-sea-sunset-shot-picture-id538449165?s=2048x2048"
    icon="https://upload.wikimedia.org/wikipedia/commons/d/da/LOGO_Transparent.gif"
  />))
