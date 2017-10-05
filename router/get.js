// GET 방식 라우터
import pug from 'pug';
import path from 'path';
import GLOBALCONFIG from '../config.server.json';
import {consoleError} from '../app_helpers/console-color.js';
import pugIncludeGlob from 'pug-include-glob';
 
export function allGetRouter(router, dirname) {
  // index 페이지
  let html;
  
  router.get('/', (req, res) => {
    let html = pug.renderFile(path.join(dirname, GLOBALCONFIG.DIRECTION.STATIC.PUBLIC, GLOBALCONFIG.DIRECTION.VIEW.PUG, '/index.pug'), {
      pretty: false,
      test: 'hi',
      plugins: [ pugIncludeGlob({}) ]
    });

      res.send(html);
  });
  
  router.get('/posts/:id', (req, res) => {
    let html = pug.renderFile(path.join(dirname, GLOBALCONFIG.DIRECTION.STATIC.PUBLIC, GLOBALCONFIG.DIRECTION.VIEW.PUG, '/article-view.pug'), {
      pretty: false,
      paramsId: req.params.id.toUpperCase(),
      plugins: [ pugIncludeGlob({}) ]
    });

      res.send(html);
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