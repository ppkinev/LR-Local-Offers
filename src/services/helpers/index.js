import isMobile from 'ismobilejs'

const createCenteredWindow = (title, w, h) => {
  /* eslint-disable no-nested-ternary */
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top
  const width = window.innerWidth ? window.innerWidth : (document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width)
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height
  const left = ((width / 2) - (w / 2)) + dualScreenLeft
  const top = ((height / 2) - (h / 2)) + dualScreenTop

  return window.open('', title, `menubar=no,location=no,resizable=no,scrollbars=yes,status=no, width=${w}, height=${h}, top=${top}, left=${left}`)
}

export const WindowCentered = ({url, title = '_blank', w = 460, h = 340, onClose, _win}) => {
  let fbWindow

  if (_win) fbWindow = _win
  else fbWindow = createCenteredWindow(title, w, h)

  fbWindow.location.href = url
  if (window.focus) fbWindow.focus()

  const windowCheckCloseInterval = window.setInterval(() => {
    if (fbWindow.closed) {
      clearInterval(windowCheckCloseInterval)
      fbWindow = null
      if (onClose) onClose()
    }
  }, 50)
}

export const isSafari = () => {
  const ua = navigator.userAgent;
  const iOS = !!ua.match(/iP(ad|hone|od)/i);
  const webkit = !!ua.match(/WebKit/i);
  const iOSSafari = iOS && webkit && !ua.match(/CriOS/i) && !ua.match(/OPiOS/i);
  const isOpera = (!!window.opr && !!window.opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  const isChrome = !!window.chrome && !!window.chrome.webstore;

  return isMobile.any ? iOSSafari : Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || (!isChrome && !isOpera && window.webkitAudioContext !== undefined);
}
