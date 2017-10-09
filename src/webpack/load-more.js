// ES2015 사용을 위한 babel 모듈 호출
//import 'babel-polyfill';

// 프로젝트 모듈 호출
import {socketFunc} from './project/socket';

let socket;

document.addEventListener('DOMContentLoaded', () => {
  // 돔 로드완료 이벤트
  window.addEventListener('load', () => {
    // 윈도우 로드완료 이벤트
    
    // 소켓 초기화
    socket = io(location.href);
    
    socket.on('connect', () => {
      // 소켓에 접속되면 소켓 함수 방출
      socketFunc(socket);
      
      document.querySelector('.js-load-more').addEventListener('click', () => {
        // 포스트 불러오기 관련 서버단 이벤트 호출
        socket.emit('loadMorePostsInServer', {
          id: socket.id,
          existPostsLength: document.querySelectorAll('.contents-section__item').length
        });
      });
    });
  });
});