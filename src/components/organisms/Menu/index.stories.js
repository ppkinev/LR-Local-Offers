import React from 'react'
import { storiesOf } from '@storybook/react'
import Menu from '.'

const MENUS = [{ name: 'BEAUTY & SPAS' }, { name: 'HEALTH & FITNESS' }, { name: 'THINGS TO DO' }, { name: 'HOME IMPROVEMENT' }, { name: 'AUTOMOTIVE' }, { name: 'TRAVEL' }, { name: 'THINGS TO DO' }, { name: 'PERSONAL SERVICES' }, { name: 'RETAIL' }, { name: 'EVENTS' }]
const SUB_MENUS = [{ name: 'SKIN CARE' }, { name: 'HAIR REMOVAL' }, { name: 'NAIL SALONS' }, { name: 'TANNING' }, { name: '2SKIN CARE' }, { name: '2HAIR REMOVAL' }, { name: '2NAIL SALONS' }, { name: '2TANNING' }]

storiesOf('Menu', module)
  .add('main', () => (
    <Menu
      isAllSelected
      menus={MENUS}
      subMenus={SUB_MENUS}
    />
  ))
  .add('sub', () => (
    <Menu
      menus={MENUS}
      subMenus={SUB_MENUS}
    />
  ))
  .add('fav', () => (
    <Menu
      isFavoritesSelected
      menus={MENUS}
      subMenus={SUB_MENUS}
    />
  ))
