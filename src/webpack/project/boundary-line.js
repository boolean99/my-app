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
  
  console.log(boundaryLineArry);
  
//  for(let i = 0, ilen = boundaryLineArry.length; i < ilen; i++) {
//    if(currentScrollTop < boundaryLineArry[i]) {
//      if(method === 'prev') {
//        if(currentScrollTop <= boundaryLineArry[0]) {
//          document.body.scrollTop = boundaryLineArry[0];
//          break;
//        }
//        if(currentScrollTop === boundaryLineArry[i - 1]) {
//          document.body.scrollTop = boundaryLineArry[i - 2];
//          break;
//        }
//        document.body.scrollTop = boundaryLineArry[i - 1];
//      }else if(method === 'next') {
//        console.log('next');
//        document.body.scrollTop = boundaryLineArry[i];
//        break;
//      }
//    }else {
////      console.log('else');
//      if(i === ilen - 1) {
//        document.body.scrollTop = boundaryLineArry[ilen - 1];
//        break;
//      }
//    }
//  }
  
  console.log(currentScrollTop);
  
}