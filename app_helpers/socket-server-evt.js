// 소켓 서버 사이드에서 클라이언트사이드로 커스텀 이벤트를 호출합니다
import pug from 'pug';
import path from 'path';
import GLOBALCONFIG from '../config.server.json';
import {consoleError} from './console-color.js';

export function socketServerEvt(socket) {
  socket.on('articleShow', (param) => {
    console.log('server socket event test');
  });
}