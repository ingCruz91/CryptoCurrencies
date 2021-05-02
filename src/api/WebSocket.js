

//let webSocket = new WebSocket('wss://ws.coincap.io/prices?assets=ALL');
//let webSocket = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin');
//let webSocket = new WebSocket('wss://ws.coincap.io/prices?assets=ALL');
//let webSocket = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,monero');
import constants from '../helpers/Constants';

const getWebSocketInstance = getAssets => {

  console.log(constants.api.ASSETS_WSS + getAssets);
  return new WebSocket(constants.api.ASSETS_WSS + getAssets);
}

export default getWebSocketInstance;
