import mobileDetect from 'mobile-detect';

export default function whenScrollFixElement() {
  const win = window,
        doc = document,
        currentScrollTop = doc.body.scrollTop || doc.documentElement.scrollTop,
        mainVisualOffsetHeight = win.innerHeight,
        MD = new mobileDetect(win.navigator.userAgent);
  
  let ghostNav = doc.getElementById('ghost-nav');
    
  if(mainVisualOffsetHeight + doc.querySelector('.nav').offsetHeight < currentScrollTop) {
    if(!ghostNav) {
      let cloneNav = doc.querySelector('.nav').outerHTML;

      doc.body.insertAdjacentHTML('afterbegin', cloneNav);
      doc.querySelector('.nav').setAttribute('id', 'ghost-nav');
      doc.getElementById('ghost-nav').setAttribute('style', `position: fixed; top: 0; left: 0; right: 0; z-index: 3;`);
    }
  }else {
    if(!!ghostNav) {
      ghostNav.outerHTML = '';
    }
  }
    
  if(!MD.mobile()) {
    // 데스크탑 일때
    const sideBar = doc.querySelector('.side-bar');
    
    if(!sideBar.getAttribute('data-offset-top')) {
      sideBar.setAttribute('data-offset-top', mainVisualOffsetHeight + sideBar.offsetTop);
    }

    if(sideBar.getAttribute('data-offset-top') <= currentScrollTop) {
      // 사이드바 초기 top 값보다 커졌을때
      if(!sideBar.getAttribute('style')) {
        sideBar.setAttribute('style', `position: fixed; top: 0; left: ${sideBar.offsetLeft}px; width: ${sideBar.offsetWidth}px;`);
      }

      if(mainVisualOffsetHeight +
         (doc.querySelector('.contents-section__container').offsetHeight -
          sideBar.offsetHeight) < currentScrollTop) {
        // 하단에 고정
        if(win.getComputedStyle(sideBar).position === 'fixed') {
          // absolute 상태가 아닐때
          sideBar.setAttribute('style', `position: absolute; top: ${(doc.querySelector('.contents-section__container').offsetHeight - sideBar.offsetHeight + parseInt(win.getComputedStyle(sideBar).paddingTop))}px; left: ${sideBar.offsetLeft}px; width: ${sideBar.offsetWidth}px;`);
        }
      }else if(mainVisualOffsetHeight +
         (doc.querySelector('.contents-section__container').offsetHeight -
          sideBar.offsetHeight) >= currentScrollTop) {
        // 하단 고정 해제
        if(win.getComputedStyle(sideBar).position === 'absolute') {
          // fixed 상태가 아닐때
          sideBar.setAttribute('style', `position: fixed; top: 0; left: ${sideBar.offsetLeft}px; width: ${sideBar.offsetWidth}px;`);
        }
      }
    }else {
      // 모든 스타일 해제
      if(!!sideBar.getAttribute('style')) sideBar.removeAttribute('style');
    }
  }
}