import {
  OPEN_POPUP_LEVELS,
  openPopupLevelsSuccess,

  OPEN_POPUP_SINGLE_LEVEL,
  openPopupSingleLevelSuccess,
} from './actions'

const TEMP_LEVELS = [
  {
    cashback: 3,
    descriptionItems: ['Earn 30 points per each £', 'Enter exclusive draws', 'Something else'],
    image: 'https://tinypng.com/images/example-shrunk.png',
    title: 'This is the badge!',
    id: '001001',
    isActive: false,
  },
  {
    cashback: 10,
    descriptionItems: ['Earn 30 points per each £', 'Something else'],
    image: 'https://tinypng.com/images/example-shrunk.png',
    title: 'This is the badge 2!',
    id: '0010012',
    isActive: true,
  },
  {
    cashback: 5,
    descriptionItems: ['Earn 30 points per each £'],
    image: 'https://tinypng.com/images/example-shrunk.png',
    title: 'This is the badge 3!',
    id: '00100122',
    isActive: false,
  },
  {
    cashback: 2,
    descriptionItems: [],
    image: 'https://tinypng.com/images/example-shrunk.png',
    title: 'This is the badge 3!',
    id: '001001222',
    isActive: false,
  },
]
const TEMP_SINGLE_LEVEL = {
  id: '00111',
  title: 'Some level',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  image: 'https://tinypng.com/images/example-shrunk.png',
  ctaText: 'Click to get it!',
}

const middleware = store => next => (action) => {
  const { type, payload } = action

  if (type === OPEN_POPUP_LEVELS) {
    window.setTimeout(() => {
      store.dispatch(openPopupLevelsSuccess(TEMP_LEVELS))
    }, 500)
  }

  if (type === OPEN_POPUP_SINGLE_LEVEL) {
    window.console.info('Level ID:', payload.levelId)
    window.setTimeout(() => {
      store.dispatch(openPopupSingleLevelSuccess(TEMP_SINGLE_LEVEL))
    })
  }

  return next(action)
}

export default middleware
