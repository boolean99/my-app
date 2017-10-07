// GET 방식 라우터
import pug from 'pug';
import path from 'path';
import marked from 'marked';
import MongoClient from 'mongodb';
import GLOBALCONFIG from '../config.server.json';
import {consoleError} from '../app_helpers/console-color.js';
import pugIncludeGlob from 'pug-include-glob';

var ObjectId = MongoClient.ObjectID;
 
// 마크다운 세팅
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

export function allGetRouter(router, dirname, db) {
  // index 페이지
  let html, cursor;
  
  router.get('/', (req, res) => {
    cursor = db.collection('article').find().limit(4).sort({date: 1});
    
    cursor.toArray((err, results) => {
      if(err) return consoleError(err, 'wrong');

      html = pug.renderFile(path.join(dirname, GLOBALCONFIG.DIRECTION.STATIC.PUBLIC, GLOBALCONFIG.DIRECTION.VIEW.PUG, '/index.pug'), {
        pretty: false,
        marked: marked,
        postArry: results,
        loadBtn: true,
        plugins: [ pugIncludeGlob({}) ]
      });

      res.send(html);
    });
  });
  
  router.get('/category/:sort', (req, res) => {
    cursor = db.collection('article');
    
    console.log(req.params.sort);
    
    cursor.find({ category: req.params.sort.toUpperCase() }).sort({ date: 1 }).toArray((err, results) => {
      console.log(results);
      if(err) return consoleError(err, 'wrong');

      html = pug.renderFile(path.join(dirname, GLOBALCONFIG.DIRECTION.STATIC.PUBLIC, GLOBALCONFIG.DIRECTION.VIEW.PUG, '/category.pug'), {
        pretty: false,
        plugins: [ pugIncludeGlob({}) ],
        postArry: results,
      });

      res.send(html);
    });
  });
  
  router.get('/posts/:id', (req, res) => {
    cursor = db.collection('article');
    
    let anotherPostCursor = db.collection('article').find().limit(3).sort({date: 1});
    
    anotherPostCursor.toArray((err, results) => {
      if(err) return consoleError(err, 'wrong');
      
      cursor.findOne({'_id': ObjectId(req.params.id)}, (err, doc) => {
        if(err) return consoleError(err, 'wrong');

        html = pug.renderFile(path.join(dirname, GLOBALCONFIG.DIRECTION.STATIC.PUBLIC, GLOBALCONFIG.DIRECTION.VIEW.PUG, '/article-view.pug'), {
          pretty: false,
          plugins: [ pugIncludeGlob({}) ],
          selectedPost: doc,
          anotherPostArry: results,
          thisUrl: req.headers.referer
        });

        res.send(html);
      });
    })
    
  });
  
  router.get('/contact', (req, res) => {
    let html = pug.renderFile(path.join(dirname, GLOBALCONFIG.DIRECTION.STATIC.PUBLIC, GLOBALCONFIG.DIRECTION.VIEW.PUG, '/contact.pug'), {
      pretty: false,
      test: 'hi',
      plugins: [ pugIncludeGlob({}) ]
    });

      res.send(html);
  });
}