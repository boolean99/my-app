'use strict';
/**
  * SERVER SIMPLE APPLICATION
  **/

// TOOL
import express from 'express';
//import reload from 'reload';
import path from 'path';
import http from 'http';
import MongoClient from 'mongodb';
import compression from 'compression';

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

let db,
    objectId = MongoClient.ObjectId;

// ROUTER
import {allGetRouter} from './router/get';
import {allPostRouter} from './router/post';

// 파일제공 및 use 메서드 사용
app.set('port', process.env.PORT || 3000);
app.use(express.compression());
app.use(express.static(path.join(__dirname, GLOBALCONFIG.DIRECTION.STATIC.PUBLIC)));
app.use('/posts/:id', express.static(path.join(__dirname, GLOBALCONFIG.DIRECTION.STATIC.PUBLIC)));
app.use('/category/:sort', express.static(path.join(__dirname, GLOBALCONFIG.DIRECTION.STATIC.PUBLIC)));
app.use(router);

// 서버와 웹소켓 생성
const server = http.createServer(app),
      io = require('socket.io')(server);

// 리로드 소스
//reload(app);

MongoClient.MongoClient.connect('mongodb://boolean99:truefalse(99)@ds123370.mlab.com:23370/blog', (err, database) => {
  if(err) return consoleError(err, 'wrong');
  
  db = database;
  
//   테스트 db 생성
//var readingZero = function(value){ if(value < 10) return `0${value}`; else return value };
//  
//var today = new Date();
//var year = today.getFullYear().toString();
//var month = readingZero(today.getMonth().toString());
//var day = readingZero(today.getDate().toString());
//var hour = readingZero(today.getHours().toString());
//var minute = readingZero(today.getMinutes().toString());
//var second = readingZero(today.getSeconds().toString());
//
//  db.collection('article').save(
//    {
//      "category": "CSS3",
//      "date": today,
//      "display_date": `${year}-${month}-${day} ${hour}:${minute}:${second}`,
//      "title": "행복을 추구할 권리",
//      contents: 'CSS3 카테고리 테스트 게시글입니다.\r\r모든 국민은 인간으로서의 존엄과 가치를 가지며, 행복을 추구할 권리를 가진다. 국가는 개인이 가지는 불가침의 기본적 인권을 확인하고 이를 보장할 의무를 진다. 국회는 의장 1인과 부의장 2인을 선출한다. 국무총리 또는 행정각부의 장은 소관사무에 관하여 법률이나 대통령령의 위임 또는 직권으로 총리령 또는 부령을 발할 수 있다. 모든 국민은 보건에 관하여 국가의 보호를 받는다. 대법원과 각급법원의 조직은 법률로 정한다. 누구든지 체포 또는 구속의 이유와 변호인의 조력을 받을 권리가 있음을 고지받지 아니하고는 체포 또는 구속을 당하지 아니한다. 체포 또는 구속을 당한 자의 가족등 법률이 정하는 자에게는 그 이유와 일시·장소가 지체없이 통지되어야 한다.\r\r형사피의자 또는 형사피고인으로서 구금되었던 자가 법률이 정하는 불기소처분을 받거나 무죄판결을 받은 때에는 법률이 정하는 바에 의하여 국가에 정당한 보상을 청구할 수 있다. 국가는 여자의 복지와 권익의 향상을 위하여 노력하여야 한다. 타인의 범죄행위로 인하여 생명·신체에 대한 피해를 받은 국민은 법률이 정하는 바에 의하여 국가로부터 구조를 받을 수 있다. 대통령은 전시·사변 또는 이에 준하는 국가비상사태에 있어서 병력으로써 군사상의 필요에 응하거나 공공의 안녕질서를 유지할 필요가 있을 때에는 법률이 정하는 바에 의하여 계엄을 선포할 수 있다. 국회는 정부의 동의없이 정부가 제출한 지출예산 각항의 금액을 증가하거나 새 비목을 설치할 수 없다.'
//    }
//  )  
  
  // 서버 실행
  server.listen(app.get('port') , (err) => {
    if(err) {
      return consoleError('Somthing is wrong... :(', 'wrong');
    }else {
      consoleError(`NodeJS Server is successfully running on port ${app.get('port')}!! :)`, 'right');
      
      // 라우팅
      allGetRouter(router, dirname, db);
      allPostRouter(router, dirname, db);

      io.on('connection', (socket) => {
        // 소켓서버 연결후 이벤트
        console.log('socket connected !');

        // 클라이언트사이드 에서 특정 이벤트를 서버쪽으로 직접 호출
        socketServerEvt(socket, db, io, dirname);

        socket.on('disconnect', () => {
          // 소켓서버 연결 해제 후 이벤트
          console.log('socket disconnected !');
        });
      });
    }
  });
});

