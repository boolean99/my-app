'use strict';
/**
  * SERVER SIMPLE APPLICATION
  **/

// TOOL
import express from 'express';
import reload from 'reload';
import path from 'path';
import http from 'http';

// HELPERS
import {consoleError} from './app_helpers/console-color';
import {socketServerEvt} from './app_helpers/socket-server-evt';

// COMPILER
//import pug from 'pug';

// GLOBAL VALUEABLE
import GLOBALCONFIG from './config.server.json';
const app = express(),
      dirname = __dirname,
      router = express.Router();

// ROUTER
import {allGetRouter} from './router/get';
import {allPostRouter} from './router/post';

// 파일제공 및 use 메서드 사용
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, GLOBALCONFIG.DIRECTION.STATIC.PUBLIC)));
app.use(router);

// 서버와 웹소켓 생성
const server = http.createServer(app),
      io = require('socket.io')(server);

// 리로드 소스
reload(server, app);

// 서버 실행
server.listen(app.get('port') , (err) => {
  if(err) {
    return consoleError('Something is wrong... :(', 'wrong');
  }else {
    consoleError(`NodeJS Server is successfully running on port ${app.get('port')}!! :)`, 'right');

    // 라우팅
    allGetRouter(router, dirname, io);
    allPostRouter(router, dirname, io);

    io.on('connection', (socket) => {
      // 소켓서버 연결후 이벤트
      consoleError(`Socket Server is successfully connected`, 'right');

      // 클라이언트사이드 에서 특정 이벤트를 서버쪽으로 직접 호출
      socketServerEvt(socket, io, dirname);

      socket.on('disconnect', () => {
        // 소켓서버 연결 해제 후 이벤트
        consoleError(`Socket Server is successfully disconnected`, 'wrong');
      });
    });
  }
});