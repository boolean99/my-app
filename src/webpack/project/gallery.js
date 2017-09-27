import toggleModifier from '../helpers/toggle-modifier';
import index from '../helpers/index';

function gallery(targetQuery) {
  let doc = document,
      win = window;
  
  // 갤러리 DOM Element 프로퍼티 할당
  this.galleryObject = doc.querySelector(`.${targetQuery}`);
  this.container = this.galleryObject.querySelector('.js-gallery-container');
  this.handerLeft = this.galleryObject.querySelector('.js-handler--left');
  this.handerRight = this.galleryObject.querySelector('.js-handler--right');
  this.paging = this.galleryObject.querySelector('.js-paging');
  
  // 갤러리 초기화에 필요한 변수 할당
  this.galleryLength = this.container.childElementCount;
  this.galleryAutorollingDuration = 10;

  // 갤러리 left값 업데이트
  this.updateEssentialValue = {
    _this: this,
    leftValue() {
      let currentLeftValue = parseInt(this._this.container.style.left);

      if(!currentLeftValue) {
        this._this.containerLeftValue = 0;
      }else {
        this._this.containerLeftValue = currentLeftValue;
      }
    },
    galleryWidth() {
      this._this.containerWidth = +this._this.container.offsetWidth;
    }
  };

  // 갤러리 스타일 초기화 Function 설정
  this.styleInit = function() {
    let pagingHtml = '';
    
    for(let i = 0; i < this.galleryLength - 1; i++) {
      pagingHtml += `<li class="paging__elm js-paging__elm" title="change main figure number by ${i + 2}"></li>`;
    }
    
    this.paging.insertAdjacentHTML('beforeend', pagingHtml);
    this.updateEssentialValue.leftValue();
    this.updateEssentialValue.galleryWidth();
    this.maxLeftDistance = (this.galleryLength - 1) * this.containerWidth;
  }
  
  // 갤러리 움직임 이벤트
  this.containerMove = function(direction) {
//    let nextIndex;
    
    if(direction === 'left') {
      // 좌측 핸들러 클릭 === 이전이미지 보기
      if(this.containerLeftValue) {
        // left의 값이 0 이 아닐때
        this.currentDot('prev');
        this.container.style.left = `${this.containerLeftValue + this.containerWidth}px`;
        this.updateEssentialValue.leftValue();
      }else {
        // left의 값이 0 일때 => 마지막 이미지 노출
        this.currentDot(this.galleryLength);
        this.container.style.left = `-${this.maxLeftDistance}px`;
        this.updateEssentialValue.leftValue();
      }
    }else if(direction === 'right') {
      // 우측 핸들러 클릭 === 다음이미지 보기
      if(!this.containerLeftValue) {
        // left의 값이 0 일때
        this.currentDot('next');
        this.container.style.left = `-${this.containerWidth}px`;
        this.updateEssentialValue.leftValue();
      }else {
        // left의 값이 0 이 아닐때
        if(Math.abs(this.containerLeftValue) < this.maxLeftDistance) {
          // (갤러리 이미지의 갯수 - 1) * 갤러리 이미지의 너비
          // 보다 작을경우
          this.currentDot('next');
          this.container.style.left = `${this.containerLeftValue - this.containerWidth}px`;
          this.updateEssentialValue.leftValue();
        }else {
          // 마지막 섹션
          this.currentDot(1);
          this.container.style.left = `0px`;
          this.updateEssentialValue.leftValue();
        }
      }
    }
  };
  
  this.autoRolling = function(time) {
    // 갤러리 자동 회전
    this.autoRolling.tId = setTimeout(() => {
      this.containerMove('right');
      this.autoRolling(time);
    }, time);
  };
  
  this.currentDot = function(itemIndex) {
    // 페이징 활성화||비활성화
    let willMoveIndex;
    
    if(itemIndex === 'next') {
      // 우측 핸들러를 클릭했을때
      willMoveIndex = index(this.paging.querySelector(`.paging__elm--actived`)) + 2;
    }else if(itemIndex === 'prev') {
      // 좌측 핸들러를 클릭했을때
      willMoveIndex = index(this.paging.querySelector(`.paging__elm--actived`));
    }else if(Number.isFinite(itemIndex)) {
      // 페이징 버튼을 클릭했을때
      willMoveIndex = itemIndex;
      this.container.style.left = `-${this.containerWidth * (willMoveIndex - 1)}px`;
      this.updateEssentialValue.leftValue();
    }
    
    // 다음||이전 인덱스가 최소||최대값을 넘어갈때 값을 고정함
    if(willMoveIndex > this.galleryLength) {
      willMoveIndex = 1;
    }else if(willMoveIndex < 1) {
      willMoveIndex = this.galleryLength;
    }
    
    // 활성화되어있는 요소를 모두 비활성화
    toggleModifier(
      this.paging.querySelectorAll(`.paging__elm--actived`),
      'paging__elm--actived'
    );
    // 클릭한 요소를 활성화
    toggleModifier(
      this.paging.querySelector(`.js-paging__elm:nth-of-type(${willMoveIndex})`),
      'paging__elm--actived'
    );
  };
  
  /*
  
    이미지 넘어갈때 좌우측 핸들러에 다음, 이전 이미지에대한 프리뷰 뿌려주는 기능 필요함
  
  */
  
};

export default gallery;