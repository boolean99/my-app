// GET 방식 라우터
import pug from 'pug';
import path from 'path';
import MongoClient from 'mongodb';
import GLOBALCONFIG from '../config.server.json';
import {consoleError} from '../app_helpers/console-color.js';
import pugIncludeGlob from 'pug-include-glob';

var ObjectId = MongoClient.ObjectID;
 
export function allGetRouter(router, dirname, db) {
  // index 페이지
  let html, cursor;
  
  router.get('/', (req, res) => {
    cursor = db.collection('article').find().limit(4).sort({date: 1});
    
    cursor.toArray((err, results) => {
      if(err) return consoleError(err, 'wrong');

      html = pug.renderFile(path.join(dirname, GLOBALCONFIG.DIRECTION.STATIC.PUBLIC, GLOBALCONFIG.DIRECTION.VIEW.PUG, '/index.pug'), {
        pretty: false,
        postArry: results,
        loadBtn: true,
        plugins: [ pugIncludeGlob({}) ],
        thisUrl: `http://${req.headers.host}${req.originalUrl}`
      });

      res.send(html);
    });
  });
  
  router.get('/category/:sort', (req, res) => {
    cursor = db.collection('article');
    
    //console.log(req.params.sort);
    
    cursor.find({ category: req.params.sort.toUpperCase() }).sort({ date: 1 }).toArray((err, results) => {
      if(err) return consoleError(err, 'wrong');

      html = pug.renderFile(path.join(dirname, GLOBALCONFIG.DIRECTION.STATIC.PUBLIC, GLOBALCONFIG.DIRECTION.VIEW.PUG, '/category.pug'), {
        pretty: false,
        plugins: [ pugIncludeGlob({}) ],
        postArry: results,
        category: req.params.sort.toUpperCase()
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
          thisUrl: `http://${req.headers.host}${req.originalUrl}`
        });

        res.send(html);
      });
    })
    
  });
  
  router.get('/aboutme', (req, res) => {
    let html = pug.renderFile(path.join(dirname, GLOBALCONFIG.DIRECTION.STATIC.PUBLIC, GLOBALCONFIG.DIRECTION.VIEW.PUG, '/about-me.pug'), {
      pretty: false,
      plugins: [ pugIncludeGlob({}) ]
    });

      res.send(html);
  });
  
  router.get('/contact', (req, res) => {
    let html = pug.renderFile(path.join(dirname, GLOBALCONFIG.DIRECTION.STATIC.PUBLIC, GLOBALCONFIG.DIRECTION.VIEW.PUG, '/contact.pug'), {
      pretty: false,
      plugins: [ pugIncludeGlob({}) ]
    });

      res.send(html);
  });
}