// ES2015 사용을 위한 babel 모듈 호출
//import 'babel-polyfill';

// 전역 변수 객체 호출
import globalConfig from './helpers/global-config';

// npm 모듈 호출
import mobileDetect from 'mobile-detect';
import scroll from 'scroll';
import ease from 'ease-component';
import scrollPageDetectObj from 'scroll-doc';

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
//import toggleBoolean from './helpers/toggle-boolean';
import modifier from './helpers/modifier';
//import splitSearch from '../../app_helpers/split-search';

// 프로젝트 모듈 호출
//import {socketFunc} from './project/socket';
//import * as kbs from './project/kbs';
//import returnXHttpObj from './project/xhttp';
import gallery from './project/gallery';
import progressBar from './project/progress-bar';
import colorPickerModule from './project/color-picker';
import settingPanel from './project/setting-panel';
import detectPostBoundaryLine from './project/boundary-line';

// 전역변수 선언
//let socket;

document.addEventListener('DOMContentLoaded', () => {
  // 돔 로드완료 이벤트
  const WIN = window,
        DOC = document,
        MD = new mobileDetect(WIN.navigator.userAgent),
        Gallery = new gallery('main-visual'),
        scrollPageDetect = scrollPageDetectObj();
  
  if(MD.mobile()) console.log(`mobile DOM's been loaded`);
  else console.log(`DOM's been loaded`);
  
  // JS 사용 가능한 환경 확인
  DOC.documentElement.className = DOC.documentElement.className.replace('no-js ', '');
  
  // 갤러리 초기화 호출
  Gallery.styleInit();
  
  // 컬러픽커 모듈 호출
  colorPickerModule();
  
  
  DOC.addEventListener('click', (e) => {
    // 클릭 이벤트 버블링
    const eventTarget = catchEventTarget(e.target || e.srcElement),
          updatedScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    
//    console.log(eventTarget.target, eventTarget.findJsString);
    
    switch(eventTarget.findJsString) {
      case 'js-scroll-to-contents' :
        scroll.top(scrollPageDetect, window.innerHeight, { duration: 1000, ease: ease.inOutCirc });
        break;
      case 'js-hamberger' :
        modifier('toggle', eventTarget.target, 'hamberger--activated');
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
      case 'js-toggle-viewport-controller' :
        modifier(
          'toggle',
          eventTarget.target.parentElement,
          'move-viewport--activated'
        );
        break;
      case 'js-prev-post' :
        detectPostBoundaryLine(updatedScrollTop, 'prev');
        break;
      case 'js-next-post' :
        detectPostBoundaryLine(updatedScrollTop, 'next');
        break;
      case 'js-scroll-to-top' :
        scroll.top(scrollPageDetect, 0, { duration: 1000, ease: ease.inOutCirc });
        break;
      case 'js-scroll-to-bottom' :
        scroll.top(scrollPageDetect, DOC.body.scrollHeight, { duration: 1000, ease: ease.inOutCirc });
        break;
      case 'js-setting-icon' :
        modifier(
          'toggle',
          eventTarget.target.parentElement,
          'setting--activated'
        );
        break;
      case 'js-config-tab__button' :
        settingPanel(eventTarget.target);
        break;
      default :
        return false;
    }
  }, false);
  
  WIN.addEventListener('load', () => {
    // 윈도우 로드완료 이벤트
    Gallery.autoRolling(Gallery.galleryAutorollingDuration * 1000);
    progressBar('running', Gallery.galleryAutorollingDuration);
    
  if(MD.mobile()) console.log(`mobile WINDOW's been loaded`);
  else console.log(`WINDOW's been loaded`);
//    socket = io();
//    socketFunc(socket);
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
  
  DOC.addEventListener('scroll', (e) => {
    const ifDocumentTargetIsDocument = e.target || e.srcElement === document ? document.body : e.target || e.srcElement,
          eventTarget = catchEventTarget(ifDocumentTargetIsDocument);
    
    switch(eventTarget.findJsString) {
      case 'js-test':
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

    


