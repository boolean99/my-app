// 소켓 서버 사이드에서 클라이언트사이드로 커스텀 이벤트를 호출합니다
import pug from 'pug';
import path from 'path';
import pugIncludeGlob from 'pug-include-glob';
import GLOBALCONFIG from '../config.server.json';
import MongoClient from 'mongodb';
import {consoleError} from './console-color.js';

const ObjectId = MongoClient.ObjectID;

export function socketServerEvt(socket, db, io, dirname) {
  socket.on('loadMorePostsInServer', (param) => {
    let cursor = db.collection('article');
    
    cursor.find().sort({ date: 1 }).skip(param.existPostsLength).limit(param.existPostsLength + 2).toArray((err, results) => {
      consoleError('find cursor is wrong', 'wrong');
      
      io.to(param.id).emit('loadMorePostsInClient', results);
      
    });
  });
}