// ES2015 사용을 위한 babel 모듈 호출
import 'babel-polyfill';

// 전역 변수 객체 호출
//import globalConfig from './helpers/global-config';

// npm 모듈 호출
//import mobileDetect from 'mobile-detect';
import scroll from 'scroll';
import ease from 'ease-component';
import scrollPageDetectObj from 'scroll-doc';

// devTools 호출
//import devTools from './devtools/dev-tools';
//import mirror from './devtools/mirror';
//import preview from './devtools/preview';

// 헬퍼 모듈 호출
import catchEventTarget from './helpers/catch-event-target';
import clipboardFunc from './helpers/clipboard-function';
//import cloneObj from './helpers/clone-obj';
//import colorAdjust from './helpers/color-adjust';
import delayEvent from './helpers/delay-event';
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
import whenScrollFixElement from './project/when-scroll-fix-element';
import mobileNav from './project/mobile-nav';
import makeLayout from './project/make-layout';
import makeExtraElement from './project/make-extra-element';
import * as snsShare from './project/sns-share';

document.addEventListener('DOMContentLoaded', () => {
  // 돔 로드완료 이벤트
  const WIN = window,
        DOC = document,
        Gallery = new gallery('main-visual'),
        scrollPageDetect = scrollPageDetectObj();
  
  // JS 사용 가능한 환경 확인
  DOC.documentElement.className = DOC.documentElement.className.replace('no-js ', '');
  
  // 추가요소 HTML 생성 및 삽입
  makeExtraElement();
  
  // 갤러리 초기화 호출
  Gallery.styleInit();
  
  DOC.addEventListener('click', (e) => {
    // 클릭 이벤트
    const eventTarget = catchEventTarget(e.target || e.srcElement),
          updatedScrollTop = DOC.body.scrollTop || DOC.documentElement.scrollTop;
    
//    console.log(eventTarget.target, eventTarget.findJsString);
    
    switch(eventTarget.findJsString) {
      case 'js-scroll-to-contents' :
        scroll.top(scrollPageDetect, DOC.querySelector('.index__main-visual').offsetHeight, { duration: 1000, ease: ease.inOutCirc });
        break;
      case 'js-nav-hamburger' :
        mobileNav(eventTarget.target);
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
        scroll.top(scrollPageDetect, scrollPageDetect.scrollHeight - DOC.querySelector('.index__main-visual').offsetHeight, { duration: 1000, ease: ease.inOutCirc });
        break;
      case 'js-setting-icon' :
        modifier(
          'toggle',
          eventTarget.target.parentElement,
          'setting--activated'
        );
        
        if(eventTarget.target.className.toString().indexOf('color-picker__icon') > -1 &&
          DOC.querySelector('.color-picker__panel').childElementCount === 1) {
          colorPickerModule();
        }
        break;
      case 'js-config-tab__button' :
        settingPanel(eventTarget.target);
        break;
      case 'js-share-facebook' :
        snsShare.facebook(eventTarget.target);
        break;
      case 'js-share-twitter' :
        snsShare.twitter(eventTarget.target);
        break;
      default :
        return false;
    }
  }, false);
  
  if(!!DOC.querySelector('.js-copy-link')) {
    DOC.querySelector('.js-copy-link').addEventListener('click', () => {
      clipboardFunc('js-copy-link');
    });
  }
  
  WIN.addEventListener('load', () => {
    // 윈도우 로드완료 이벤트
    
    // 갤러리 자동회전 시작
    Gallery.autoRolling(Gallery.galleryAutorollingDuration * 1000);
    
    // 갤러리와함께 상태바 동작 시작
    progressBar('running', Gallery.galleryAutorollingDuration);
  });
  
  WIN.addEventListener('resize', () => {
    // 윈도우 리사이즈 이벤트
    if(!!DOC.querySelector('.article-list--layout-grid')) delayEvent(1000, makeLayout, 'grid');
    Gallery.updateEssentialValue.leftValue();
    Gallery.updateEssentialValue.galleryWidth();
  });
  
  DOC.addEventListener('scroll', (e) => {
    whenScrollFixElement();
  }, true);
  
});