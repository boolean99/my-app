import modifier from '../helpers/modifier';
import makeLayout from './make-layout';

export default function compileSassAndInsert(XHttpResult, param) {
  let scssString = XHttpResult.responseText;
  const DOC = document,
        sass = new Sass();
  
  // $main-color: rgba(255, 255, 255, 1);의 형태를 추가해 테마 색상을 교체
  scssString = `$${param.variable[0]}: ${param.variable[1]}; ${scssString}`;
  
  sass.compile(scssString, function(compiledScssString) {
    if(!DOC.getElementById(param.id)) {
      // 이미 추가한 이력이 있다면 스타일 태그와 함께 생성을
      DOC.head.insertAdjacentHTML('beforeend', `<style id="${param.id}">${compiledScssString.text}</style>`);
    }else {
      //처음이라면 텍스트 노드 교체를 한다.
      DOC.getElementById(param.id).textContent = compiledScssString.text;
    }
    
    // 함수를 호출한 주체에 따라 해당하는 로더를 비활성화 시킨다.
    if(param.id !== 'theme-color') {
      modifier(
        'add',
        DOC.querySelector('.js-config .loader'),
        'loader--deactivated'
      );
    }else {
      modifier(
        'add',
        DOC.querySelector('.js-color-picker .loader'),
        'loader--deactivated'
      );
    }
    
    // 스타일이 적용될 여유 시간후 레이아웃 재배치 함수 실행
    if(param.callbackParam !== undefined) setTimeout(() => {makeLayout(param.callbackParam)}, 500);
  });
}