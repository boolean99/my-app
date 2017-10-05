const DOC = document,
      allArticle = DOC.querySelectorAll('.contents-section__item');

export default function makeLayout(sort) {
  let gridPositionArryXY = [[0, 0], [0, 0]];
  
  if(sort === 'list' || sort === 'standard') {
    removeAllStyle();
  }else{
    if(!document.querySelector('.article-list--layout-grid')) return false;
    
    for(let i = 0, ilen = allArticle.length; i < ilen; i++) {
      if(i % 2) {
        // 홀수 아이템 (1, 3, 5...)
        gridPositionArryXY[1][1] += allArticle[i].offsetHeight + parseInt(window.getComputedStyle(allArticle[i]).marginBottom);
        gridPositionArryXY[0][1] = allArticle[i].offsetWidth;

        if(allArticle[i + 2] !== undefined) allArticle[i + 2].style.top = `${gridPositionArryXY[1][1]}px`;
        allArticle[i].style.left = `${gridPositionArryXY[0][1]}px`;
      }else {
        // 짝수 아이템 (0, 2, 4...)

        gridPositionArryXY[1][0] += allArticle[i].offsetHeight + parseInt(window.getComputedStyle(allArticle[i]).marginBottom);
        gridPositionArryXY[0][0] += allArticle[i].offsetWidth;

        if(allArticle[i + 2] !== undefined) allArticle[i + 2].style.top = `${gridPositionArryXY[1][0]}px`;
      }
    }
    
    DOC.querySelector('.article-list--layout-grid').style.minHeight = `${gridPositionArryXY[1].sort((a, b) => b - a)[0] + 20}px`;
  }
  
  if(sort !== 'standard') {
    DOC.querySelector('.js-prev-post').setAttribute('disabled', 'true');
    DOC.querySelector('.js-next-post').setAttribute('disabled', 'true');
  }else {
    DOC.querySelector('.js-prev-post').removeAttribute('disabled');
    DOC.querySelector('.js-next-post').removeAttribute('disabled');
  }
  
  DOC.querySelector('.contents-section__container').style.opacity = 1;

}

function removeAllStyle() {
  DOC.querySelector('.contents-section__article-list').removeAttribute('style');
  
  for(let i = 0, ilen = allArticle.length; i < ilen; i++) {
    allArticle[i].removeAttribute('style');
  }
}