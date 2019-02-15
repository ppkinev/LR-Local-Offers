import React from 'react'
import { storiesOf } from '@storybook/react'
import LocationPromptSmall from '.'

storiesOf('LocationPromptSmall', module)
  .add('default', () => (<LocationPromptSmall cityName={'Odessa'} />))
