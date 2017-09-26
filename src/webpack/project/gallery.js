function gallery(targetQuery) {
  let doc = document;
  
  // 갤러리 DOM Element 프로퍼티 할당
  this.galleryContainer = doc.querySelector(`.${targetQuery}`);
  this.handerLeft = this.galleryContainer.querySelector('.js-handler--left');
  this.handerRight = this.galleryContainer.querySelector('.js-handler--right');
  this.paging = this.galleryContainer.querySelector('.js-paging');
  
  // 갤러리 스타일 초기화에 필요한 변수 할당
  this.galleryLength = this.galleryContainer.querySelectorAll('.js-gallery-fragment').length;
  
  // 갤러리 스타일 초기화 Function 설정
  this.styleInit = function() {
    let pagingHtml = '';
    
    for(let i = 0; i < this.galleryLength; i++) {
      pagingHtml += `<li class="paging__elm" title="change main figure number by ${i + 2}"></li>`;
    }
    
    this.paging.insertAdjacentHTML('beforeend', pagingHtml);
  };
  
};

export default gallery;


