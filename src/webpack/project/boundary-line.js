import scroll from 'scroll';
import ease from 'ease-component';
import scrollPageDetectObj from 'scroll-doc';

export default function detectPostBoundaryLine (currentScrollTop, method) {
  const doc = document,
        allExistentPosts = doc.querySelectorAll('.contents-section__item'),
        basicOffsetTop = doc.querySelector('.contents-section').offsetTop,
        scrollPageDetect = scrollPageDetectObj();
        
  let boundaryLineArry = [];
  
  for(let i = 0, ilen = allExistentPosts.length; i < ilen; i++) {
    boundaryLineArry[i] = basicOffsetTop + allExistentPosts[i].offsetTop;
  }
  
  for(let i = 0, ilen = boundaryLineArry.length; i < ilen; i++) {
    if(currentScrollTop < boundaryLineArry[0]) {
      // 첫번째 포스트 이전일 때
      scroll.top(scrollPageDetect, boundaryLineArry[0], { duration: 1000, ease: ease.inOutCirc });
      break;
    }else if(boundaryLineArry[ilen - 1] < currentScrollTop) {
      // 마지막 포스트 이후일때
      scroll.top(scrollPageDetect, boundaryLineArry[ilen - 1], { duration: 1000, ease: ease.inOutCirc });
      break;
    }
    
    if(method === 'next') {
      // 유효범위 내에서의 다음 포스트
      if(currentScrollTop < boundaryLineArry[i] &&
         boundaryLineArry[i - 1] <= currentScrollTop ) {
        scroll.top(scrollPageDetect, boundaryLineArry[i], { duration: 1000, ease: ease.inOutCirc });
        break;
       }
    }else if(method == 'prev') {
      // 유효범위 내에서의 이전 포스트
      if(currentScrollTop <= boundaryLineArry[i] &&
         boundaryLineArry[i - 1] < currentScrollTop ) {
        scroll.top(scrollPageDetect, boundaryLineArry[i - 1], { duration: 1000, ease: ease.inOutCirc });
        break;
      }
    }
  }
}