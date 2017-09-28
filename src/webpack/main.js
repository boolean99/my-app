// ES2015 사용을 위한 babel 모듈 호출
//import 'babel-polyfill';

// 전역 변수 객체 호출
import globalConfig from './helpers/global-config';

// npm 모듈 호출
import mobileDetect from 'mobile-detect';
import ColorPicker from 'simple-color-picker';

// devTools 호출
import devTools from './devtools/dev-tools';
import mirror from './devtools/mirror';
//import preview from './devtools/preview';

// 헬퍼 모듈 호출
import catchEventTarget from './helpers/catch-event-target';/**/
//import clipboardFunc from './helpers/clipboard-function';
//import cloneObj from './helpers/clone-obj';
//import colorAdjust from './helpers/color-adjust';
//import delayEvent from './helpers/delay-event';
import index from './helpers/index';
//import parents from './helpers/parents';
//import readingZero from './helpers/reading-zero';
import scrollTop from './helpers/smooth-scrolling';
import toggleBoolean from './helpers/toggle-boolean';
import toggleModifier from './helpers/toggle-modifier';
//import splitSearch from '../../app_helpers/split-search';

// 프로젝트 모듈 호출
//import {socketFunc} from './project/socket';
//import * as kbs from './project/kbs';
import returnXHttpObj from './project/xhttp';
import gallery from './project/gallery';
import progressBar from './project/progress-bar';
import mainVisualScrollOpacity from './project/main-visual-scroll-opacity';

// 전역변수 선언
let socket;

document.addEventListener('DOMContentLoaded', () => {
  // 돔 로드완료 이벤트
  const WIN = window,
        DOC = document,
        MD = new mobileDetect(WIN.navigator.userAgent),
        Gallery = new gallery('main-visual'),
        colorPicker = new ColorPicker({
          color: '#FF0000',
          background: '#454545',
          width: 240,
          height: 200
        });
  
  if(MD.mobile()) console.log(`mobile DOM's been loaded`);
  else console.log(`DOM's been loaded`);
  
  Gallery.styleInit();
  mainVisualScrollOpacity();
  colorPicker.appendTo(DOC.querySelector('.js-color-pciker > .setting-panel'));
  
  DOC.addEventListener('click', (e) => {
    // 클릭 이벤트 버블링
    const eventTarget = catchEventTarget(e.target || e.srcElement);
    
//    console.log(eventTarget.target, eventTarget.findJsString);
    
    switch(eventTarget.findJsString) {
      case 'js-scroll-to-contents' :
        scrollTop(document.body, window.innerHeight, 300);
        break;
      case 'js-hamberger' :
        toggleModifier(eventTarget.target, 'hamberger--actived')
        break;
      case 'js-handler--left' :
        Gallery.containerMove('left');
        break;
      case 'js-handler--right' :
        Gallery.containerMove('right');
        break;
      case 'js-paging__elm' :
        Gallery.currentDot(index(eventTarget.target) + 1);
        break;
      case 'js-clickable' :
//        console.log(index(eventTarget.target));
//        toggleModifier(
//          eventTarget.target,
//          'container__element--actived',
//          ['container__element--theme-flat', 'container__element--theme-normal']
//        );
        break;
      default :
        return false;
    }
  }, false);
  
  WIN.addEventListener('load', () => {
    // 윈도우 로드완료 이벤트
    Gallery.autoRolling(Gallery.galleryAutorollingDuration * 1000);
    progressBar('running', Gallery.galleryAutorollingDuration);
    
  DOC.documentElement.className = DOC.documentElement.className.replace('no-js ', '');
    
    
  if(MD.mobile()) console.log(`mobile WINDOW's been loaded`);
  else console.log(`WINDOW's been loaded`);
//    socket = io();
//    socketFunc(socket);
    
    /*  xhttp 호출 예제
    function testFunc(value) {
      console.log(value.responseText);
    }
    
    let xHttpObj = returnXHttpObj(testFunc);
    
    xHttpObj.open('GET', 'index.html', true);
    xHttpObj.send(null);
    
    */
  });
  
  WIN.addEventListener('resize', () => {
    // 윈도우 리사이즈 이벤트
//    delayEvent(/*second*/, /*func*/);
  });
  
  WIN.addEventListener('keypress', (e) => {
    const pressedKeyCode = e.which;
    
    switch(pressedKeyCode) {
      case 0:
        // some Function
        break;
      default :
        return false;
    }
  });
  
  DOC.addEventListener('wheel', (e) => {
    const eventTarget = catchEventTarget(e.target || e.srcElement);
    
    mainVisualScrollOpacity();
    
    switch(eventTarget.findJsString) {
      case 'js-test':
        console.log(eventTarget.target);
//        goToTop(e, scrolledElement);
        break;
      default :
        return false;
    }
  }, true);
  
  DOC.addEventListener('touchstart', (e) => {
    let touchObj = e.changedTouches[0];
  });
  
  DOC.addEventListener('touchmove', (e) => {
    let touchObj = e.changedTouches[0];
  });
  
  DOC.addEventListener('touchend', (e) => {
    let touchObj = e.changedTouches[0];
  });
});