import React from 'react'
import { storiesOf } from '@storybook/react'
import Button from '.'

storiesOf('Button', module)
  .add('main', () => (<Button main small>Buy now</Button>))
  .add('fb', () => (<Button fb small>Share it</Button>))
  .add('fb big', () => (<Button fb>Share this offer</Button>))
  .add('fav big', () => (<Button favorites>Add to favorites</Button>))
