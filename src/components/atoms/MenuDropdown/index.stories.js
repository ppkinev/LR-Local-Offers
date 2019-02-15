import React from 'react'
import { storiesOf } from '@storybook/react'
import MenuDropdown from '.'

storiesOf('MenuDropdown', module)
  .add('default', () => (
    <MenuDropdown>
      <option>ALL CATEGORIES</option>
      <option>BEAUTY & SPAS</option>
      <option>HEALTH & FITNESS</option>
      <option>THINGS TO DO</option>
      <option>HOME IMPROVEMENT</option>
      <option>AUTOMOTIVE</option>
      <option>TRAVEL</option>
      <option>THINGS TO DO</option>
      <option>PERSONAL SERVICES</option>
      <option>RETAIL</option>
      <option>EVENTS</option>
    </MenuDropdown>
  ))
  .add('oneSided', () => (
    <MenuDropdown oneSided>
      <option>ALL CATEGORIES</option>
      <option>BEAUTY & SPAS</option>
      <option>HEALTH & FITNESS</option>
      <option>THINGS TO DO</option>
      <option>HOME IMPROVEMENT</option>
      <option>AUTOMOTIVE</option>
      <option>TRAVEL</option>
      <option>THINGS TO DO</option>
      <option>PERSONAL SERVICES</option>
      <option>RETAIL</option>
      <option>EVENTS</option>
    </MenuDropdown>
  ))
