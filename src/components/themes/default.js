// https://github.com/diegohaz/arc/wiki/Styling
import { reversePalette } from 'styled-theme/composer'

const theme = {}

theme.palette = {
  primary: ['#1976d2', '#2196f3', '#71bcf7', '#c2e2fb'],
  secondary: ['#c2185b', '#e91e63', '#f06292', '#f8bbd0'],
  danger: ['#d32f2f', '#f44336', '#f8877f', '#ffcdd2'],
  alert: ['#ffa000', '#ffc107', '#ffd761', '#ffecb3'],
  success: ['#388e3c', '#4caf50', '#7cc47f', '#c8e6c9'],
  white: ['#fff', '#fff', '#eee'],
  grayscale: [
    '#212121',
    '#414141',
    '#616161',
    '#818181',
    '#bdbdbd',
    '#e0e0e0',
    '#eeeeee',
    '#ffffff',
  ],
  cta: ['#fbab16', '#4286f5'],
  pinnedBubbleMain: ['#1565c0', '#00b8d4', '#00bfa5', '#ffb300', '#e65100', '#c2185b', '#d00000'],
  pinnedBubbleSecondary: ['#1565c0', '#00e5ff', '#1de9b6', '#ffca28', '#f57c00', '#e91e63', '#e62117'],
  pinnedBubbleText: ['#ffffff', '#212121', '#212121', '#212121', '#ffffff', '#ffffff', '#ffffff'],
  pinnedBubblePlaceholder: [
    'rgba(255,255,255,0.4)',
    'rgba(0,0,0,0.3)',
    'rgba(0,0,0,0.3)',
    'rgba(0,0,0,0.3)',
    'rgba(255,255,255,0.4)',
    'rgba(255,255,255,0.4)',
    'rgba(255,255,255,0.4)',
  ],
  blackTransparent: [
    'rgba(0,0,0,0.9)',
    'rgba(0,0,0,0.8)',
    'rgba(0,0,0,0.7)',
    'rgba(0,0,0,0.6)',
    'rgba(0,0,0,0.5)',
    'rgba(0,0,0,0.4)',
    'rgba(0,0,0,0.3)',
  ],
  fb: ['#3b5998'],
  bgs: ['#f2f5f6'],
  brand: ['#003D98', '#6198F7'],
  brandTransparent: ['rgba(0, 61, 152, 0.8)', 'rgba(0, 61, 152, 0.5)', 'rgba(0, 61, 152, 0.2)'],
  brandInverted: ['#f8e71d'],
}

theme.reversePalette = reversePalette(theme.palette)

theme.fonts = {
  primary: 'Helvetica Neue, Helvetica, Roboto, sans-serif',
  pre: 'Consolas, Liberation Mono, Menlo, Courier, monospace',
  quote: 'Georgia, serif',
}

theme.sizes = {
  maxWidth: '1100px',
  fontMessageRegular: '12px',
  fontTitle: '14px',
  fontInput: '14px',
  fontLabel: '10px',
  inputHeight: '36px',
  fontSubtitle: '11px',
  fontGeneral: '10px',
  fontSmall: '9px',
  fontMenuMobile: '12px',
  fontMenu: '16px',
  menuHeight: '50px',

  // for media-queries
  iphone5: 'all and (max-width: 325px)',
  mobile: 'all and (max-width: 660px)',
  middle: 'all and (max-width: 790px)',
  middleToMax: 'all and (min-width: 790px)',
}

export default theme
