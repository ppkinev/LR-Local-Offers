import { xdmTunnel, apiKey, env } from 'config'

export const XDM = {
  easyXDM: window.easyXDM && window.easyXDM.noConflict('XDM'),
  api: {},
  foundationUrl: '',
}

if (env !== 'story') {
  XDM.easyXDM.rpc = new XDM.easyXDM.Rpc({
    remote: xdmTunnel,
  }, {
    remote: {
      apiTunnel: {},
      writeClubCookie: {},
      readClubCookie: {},
    },
  })

// XDM.api.getApp = (response) => {
//   return new Promise((resolve, reject) => {
//     if (response.IsActive) {
//       XDM.foundationUrl = response.FoundationRewardsSiteUrl
//       XDM.api.rpcAuthCreate()
//       resolve()
//     } else {
//       reject()
//     }
//   })
// }
//
// XDM.api.rpcAuthCreate = () => {
//   if (!XDM.api.rpcAuth) {
//     XDM.api.rpcAuth = new XDM.easyXDM.Rpc({
//       remote: `${XDM.foundationUrl}sso/tunnel`,
//     }, {
//       remote: {
//         ssoTunnelIn: {},
//         ssoTunnelOut: {},
//       },
//     })
//   }
// }
}

export const xdmFetch = (options) => {
  const { post = false, endpoint, data } = options
  const params = !post ? (data || '') : JSON.stringify(data)

  return new Promise((resolve, reject) => {
    XDM.easyXDM.rpc.apiTunnel(
      {
        apiKey,
        endpoint,
        params,
        method: post ? 'POST' : 'GET',
      },
      (response) => {
        if (!response.error) {
          resolve(response.data)
        } else {
          reject(JSON.parse(response.error))
        }
      },
      (response) => {
        reject(JSON.parse(response.error))
      })
  })
}
