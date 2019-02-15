import React from 'react'
import { storiesOf } from '@storybook/react'
import Popup from '.'

storiesOf('Popup', module)
  .add('default', () => (
    <Popup
      title="Here's how you can increase your point's amount"
      onClose={() => {
        window.console.info('Popup is closed')
      }}
    />
  ))
