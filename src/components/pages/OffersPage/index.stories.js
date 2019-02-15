import React from 'react'
import { storiesOf } from '@storybook/react'
import { OfferPanel } from 'components'
import OffersPage from '.'

const MENUS = [{ name: 'BEAUTY & SPAS' }, { name: 'HEALTH & FITNESS' }, { name: 'THINGS TO DO' }, { name: 'HOME IMPROVEMENT' }, { name: 'AUTOMOTIVE' }, { name: 'TRAVEL' }, { name: 'THINGS TO DO' }, { name: 'PERSONAL SERVICES' }, { name: 'RETAIL' }, { name: 'EVENTS' }]
const SUB_MENUS = [{ name: 'SKIN CARE' }, { name: 'HAIR REMOVAL' }, { name: 'NAIL SALONS' }, { name: 'TANNING' }, { name: '2SKIN CARE' }, { name: '2HAIR REMOVAL' }, { name: '2NAIL SALONS' }, { name: '2TANNING' }]

const desc = 'Mauris ex, Lorem ipsum dolor sit ametconsectetur adipiscing elit. Etiam viverra tortor eget libero ' +
  'consectetur convallis. Sed ipsum mi, vehicula et pulvinar in, venenatis ac enim. In non velit quis tellus suscipit ' +
  'fermentum. Cras blandit, augue vitae cursus ullamcorper, nibh lacus dignissim ante, lobortis dapibus ante ligula ut ' +
  'tortor. Proin nulla augue, rutrum eget felis ac, porta faucibus ex. In congue leo neque, vel vehicula est posuere at. ' +
  'Sed ex urna, facilisis eget consequat ut, gravida id nulla.'
const OFFER = {
  sharePoints: 150,
  buyPoints: 400,
  title: 'This is some title for the image',
  image: 'http://media.istockphoto.com/photos/beautiful-cloudscape-over-the-sea-sunset-shot-picture-id538449165?s=2048x2048',
  icon: 'https://upload.wikimedia.org/wikipedia/commons/d/da/LOGO_Transparent.gif',
  totalUsers: 115,
  users: [
    { image: 'https://i.pinimg.com/736x/de/1e/fe/de1efef55429481f3b9d8daf14686e82--beautiful-eyes-most-beautiful.jpg' },
    { image: 'http://www.uncle-andrew.net/blog/pics/aaron_paul.jpg' },
    { image: 'https://s-media-cache-ak0.pinimg.com/736x/e9/70/67/e970671faa03af41e716cd7e63385034--unique-faces-face-reference.jpg' },
  ],
  description: desc,
}
const MARKERS = [{
  id: 'marker-01',
  lat: 46.45,
  lng: 30.70,
  type: '',
}]

const offers = new Array(10)
offers.fill(OFFER)

const offerPanels = offers.map(o => (
  <OfferPanel
    sharePoints={o.sharePoints}
    buyPoints={o.buyPoints}
    title={o.title}
    image={o.image}
    icon={o.icon}
    totalUsers={o.totalUsers}
    users={o.users}
    description={o.description}
  />
))

storiesOf('OffersPage', module)
  .add('main', () => (
    <OffersPage
      isAllSelected
      menus={MENUS}
      subMenus={SUB_MENUS}
      offerPanels={offerPanels}
      mapCenter={{ lat: 46.48, lng: 30.72 }}
      mapMarkers={MARKERS}
      onMarkerClick={(key) => {
        window.console.info(key)
      }}
      onMarkerHover={(key) => {
        window.console.info(key)
      }}
    />
  ))
