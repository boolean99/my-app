// post 방식 라우터
import path from 'path';
import GLOBALCONFIG from '../config.server.json';
import {consoleError} from '../app_helpers/console-color.js';

export function allPostRouter(router, dirname, db, io) {
  router.post('/write', (req, res) => {
    
  });
}