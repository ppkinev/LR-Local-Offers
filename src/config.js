const merge = require('lodash/merge')

const script = document.getElementById('main-app')
const scriptSrc = script && script.getAttribute('src')
const basePath = scriptSrc ? scriptSrc.substring(0, scriptSrc.lastIndexOf('/')) : '.'

const apiKey = window.apiKey || '431F8A01-D40A-4369-A730-2FFAA93FB2EA'
const apiPrefix = window.apiPrefix || 'http://spr-api-test.cloudapp.net/core/v1/'

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    isDev: process.env.NODE_ENV !== 'production',
    basename: process.env.PUBLIC_PATH,
    isBrowser: typeof window !== 'undefined',
    apiUrl: 'https://jsonplaceholder.typicode.com',
    iconsPath: `${basePath}/icons`,
    xdmTunnel: `${apiPrefix}xdm/tunnel`,
    apiKey,
    apiPrefix,
    basePath,
  },
  test: {},
  development: {},
  production: {
    apiUrl: 'https://jsonplaceholder.typicode.com',
  },
}

module.exports = merge(config.all, config[config.all.env])
