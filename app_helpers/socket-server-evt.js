// 소켓 서버 사이드에서 클라이언트사이드로 커스텀 이벤트를 호출합니다
import MongoClient from 'mongodb';
import {consoleError} from './console-color.js';

export function socketServerEvt(socket, db, io) {
  socket.on('loadMorePostsInServer', (param) => {
    const cursor = db.collection('article');
    
    cursor.find().sort({ date: 1 }).skip(param.existPostsLength).limit(param.existPostsLength + 1).toArray((err, results) => {
      if(err) consoleError('find cursor is wrong', 'wrong');
      
      io.to(param.id).emit('loadMorePostsInClient', results);
    });
  });
}