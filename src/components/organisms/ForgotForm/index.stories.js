import React from 'react'
import { storiesOf } from '@storybook/react'
import ForgotForm from '.'

window.console.info(ForgotForm)

storiesOf('ForgotForm', module)
  .add('default', () => (<ForgotForm />))
