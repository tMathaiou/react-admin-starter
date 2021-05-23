import socketIo, { Socket } from 'socket.io-client';
import { DefaultConfig } from '../defaultConfig';

const SERVER_URL = DefaultConfig.socketsUrl;
let socket: Socket;

const useSocketIO = () => {
  if (socket) {
    return socket;
  }

  let token: string;
  try {
    token = localStorage.getItem('tokenValidation');
  } catch (e) {
    throw new Error(e);
  }

  if (!token) {
    throw new Error('No Token Provided!');
  }
  socket = socketIo(SERVER_URL, {
    query: { token },
    transports: ['websocket']
  });
  return socket;
};

export default useSocketIO;
