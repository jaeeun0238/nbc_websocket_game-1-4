import { CLIENT_VERSION } from './Constants.js';

const socket = io('http://54.180.141.93:3000', {
  query: {
    clientVersion: CLIENT_VERSION,
  },
});

let userId = null;
socket.on('response', (data) => {
  console.log(data);
});

socket.on('connection', (data) => {
  console.log('connection: ', data);
  userId = data.uuid;
});

let gameAssetsData = null;
socket.on('gameAssets', (data) => {
  gameAssetsData = data;
});

const sendEvent = (handlerId, payload) => {
  socket.emit('event', {
    userId,
    clientVersion: CLIENT_VERSION,
    handlerId,
    payload,
  });
};

export { sendEvent, gameAssetsData };
