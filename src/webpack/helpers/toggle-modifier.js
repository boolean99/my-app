export default function toggleModifier(target, ...arry) {
  let _target;
  
  if(target.constructor.toString().toLowerCase().includes('nodelist')) {
    // DOM Element의 유사배열
    _target = Array.from(target);
  }else {
    // 단일 DOM Element
    _target = Array.of(target);
  }
  
  for(let i = 0, iLen = _target.length; i < iLen; i++) {
    for(let j = 0, jlen = arry.length; j < jlen; j++) {
      if(_target[i].className.includes(arry[j])) {
        // modifier가 존재한다 === true -> false
        _target[i].className = _target[i].className.toString().replace(` ${arry[j]}`, '');
      }else {
        // modifier가 없다 === false -> true
        _target[i].className = `${_target[i].className.toString()} ${arry[j]}`;
      }
    }
  }
}

/*
 * 사용법
 
 boolean형식과 modifier 형식 모두 존재 유무에 따라 토글한다.
 target파라미터를 호출시 인자를 넘길때 querySelector, querySelectorAll 등을 사용해 단일 노드 혹은 노드배열 (유사 배열)로 전달하며 두번째 인자 이후로는 토글시킬 modifier를 순서없이 나열한다. 갯수에 제약이 없다.

toggleModifier(
  eventTarget.target,
  'hamberger--hello',
  'hamberger--actived-true',
  'hamberger--actived-false'
);

toggleModifier(
  this.paging.querySelectorAll(`.paging__elm--actived`),
  'paging__elm--actived',
  'toggle-class-name',
  toggle-class-name2'
);
toggleModifier(
  this.paging.querySelector(`.js-paging__elm:nth-of-type(1)`),
  'paging__elm--actived'
);

 *
 */