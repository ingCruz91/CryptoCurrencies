const constants = {
  api: {
    ASSETS_WSS: 'wss://ws.coincap.io/prices?assets=',
    GET_HISTORY: 'https://api.coincap.io/v2/assets/',
    GET_ALL_ASSETS: 'ALL',
    GET_HISTORY_PATH: '/history?interval=m1',

    // curl --location --request GET 'api.coincap.io/v2/assets/bitcoin/history?interval=d1'
  },
}

export default constants
