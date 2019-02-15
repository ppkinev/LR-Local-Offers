import React from 'react'
import { storiesOf } from '@storybook/react'
import LevelColumn from '.'

storiesOf('Level Column', module)
  .add('default', () => (
    <LevelColumn
      cashback={3}
      descriptionItems={['Earn 30 points per each £', 'Enter exclusive draws', 'Something else']}
      image={'https://tinypng.com/images/example-shrunk.png'}
      title={'This is the badge!'}
      id={'001001'}
    />
  ))
