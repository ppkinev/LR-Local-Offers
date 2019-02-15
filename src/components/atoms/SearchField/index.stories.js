import React from 'react'
import { storiesOf } from '@storybook/react'
import SearchField from '.'

storiesOf('SearchField', module)
  .add('default', () => (
    <SearchField />
  ))
