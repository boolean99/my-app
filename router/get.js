// GET 방식 라우터
import pug from 'pug';
import path from 'path';
import GLOBALCONFIG from '../config.server.json';
import {consoleError} from '../app_helpers/console-color.js';

export function allGetRouter(router, dirname, db, io) {
  // index 페이지
  router.get('/', (req, res) => {
      res.send('This is simple Node.JS application');
  });
}