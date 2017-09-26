import progressBar from './progress-bar';

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
  this.autoRollingDuration = 4;

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
    
    for(let i = 0; i < this.galleryLength; i++) {
      pagingHtml += `<li class="paging__elm" title="change main figure number by ${i + 2}"></li>`;
    }
    
    this.paging.insertAdjacentHTML('beforeend', pagingHtml);
    this.updateEssentialValue.leftValue();
    this.updateEssentialValue.galleryWidth();
    this.maxLeftDistance = (this.galleryLength - 1) * this.containerWidth;
  }
  
  // 갤러리 움직임 이벤트
  this.containerMove = function(direction) {
    
    if(direction === 'left') {
      if(this.containerLeftValue) {
        // left의 값이 0 이 아닐때
        this.container.style.left = `${this.containerLeftValue + this.containerWidth}px`;
        this.updateEssentialValue.leftValue();
      }
      // 좌측 핸들러 클릭 === 이전이미지 보기
    }else if(direction === 'right') {
      // 우측 핸들러 클릭 === 다음이미지 보기
      if(!this.containerLeftValue) {
        // left의 값이 0 일때
        this.container.style.left = `-${this.containerWidth}px`;
        this.updateEssentialValue.leftValue();
      }else {
        // left의 값이 0 이 아닐때
        if(Math.abs(this.containerLeftValue) < this.maxLeftDistance) {
          // (갤러리 이미지의 갯수 - 1) * 갤러리 이미지의 너비
          // 보다 작을경우 === 마지막 이미지가 노출되는 상황
          this.container.style.left = `${this.containerLeftValue - this.containerWidth}px`;
          this.updateEssentialValue.leftValue();
        }
      }
    }
  };
  
  this.autoRolling = function(time = this.autoRollingDuration * 1000) {
    // 갤러리 자동 회전
    progressBar('running', this.autoRollingDuration);
    
    this.autoRolling.startTime = Date.now();
      
    this.autoRolling.tId = setTimeout(() => {
      if(Math.abs(this.containerLeftValue) < this.maxLeftDistance) {
        this.containerMove('right');
      }else {
        this.container.style.left = `0px`;
        this.updateEssentialValue.leftValue();
      }
      
      this.autoRolling();
    }, time);
    
    console.log(this.autoRolling.endTime - this.autoRolling.startTime);
  }
  
  // 갤러리 상단 프로그레스바 마우스 온 이벤트 리스너
  doc.querySelector(`.${targetQuery}`).addEventListener('mouseenter', (e) => {
    this.autoRolling.endTime = Date.now();
    clearTimeout(this.autoRolling.tId);
    progressBar('paused');
  });
  
  // 갤러리 상단 프로그레스바 마우스 아웃 이벤트 리스너
  doc.querySelector(`.${targetQuery}`).addEventListener('mouseleave', (e) => {
    this.autoRolling(this.autoRollingDuration * 1000 - (this.autoRolling.endTime - this.autoRolling.startTime));
    progressBar('running', this.autoRollingDuration);
  });
  
  
  
  
  
  
  
  
  
  
  
  /*
      갤러리 마우스 오버했을때 타임 멈췄다가 아웃했을때 실행시키는 기능 구현중
  
  */
  
  
  
  
  
  
  
  
  
  
  
  
  
};

export default gallery;



