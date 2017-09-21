const gallery = {
  GV: {
    // global value
    DOM: document,
    WIN: window,
    container: null,
    handlerLeft: null,
    handlerRight: null,
    paging: null,
    progressBar: null,
    itemLength: 0
  },
  init() {
    this.GVInit();
    this.styleInit();
  },
  GVInit() {
    this.GV.container = this.GV.DOM.querySelector('.main-visual');
    this.GV.handlerLeft = this.GV.container.querySelector('.js-handler--left');
    this.GV.handlerRight = this.GV.container.querySelector('.js-handler--right');
    this.GV.paging = this.GV.container.querySelector('.js-paging');
    this.GV.progressBar = this.GV.container.querySelector('.progress-bar');
    if(this.GV.container !== null) this.GV.itemLength = this.GV.container.querySelector('.main-visual__img-background-board').childElementCount;
  },
  styleInit() {
    let pagingHTML = ``;
    
    for(let i = 0; i < this.GV.itemLength - 1; i++) {
      // 이미지 갯수에 맞춰 페이징 요소 추가
      pagingHTML += `<li class="paging__elm" title="change main figure number by ${i + 2}">
    </li>`;
    }
    this.GV.paging.insertAdjacentHTML('beforeend', pagingHTML);
  },
  next() {
    console.log('next');
  },
  prev() {
    console.log('prev');
    
  }
};





























export default gallery;