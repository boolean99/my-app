export default function modifier(method, target, ...arry) {
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
      if(method === 'toggle') {
        // modifier를 toggle한다
        if(_target[i].className.includes(arry[j])) {
          // modifier가 존재한다 === true -> false
          _target[i].className = _target[i].className.toString().replace(` ${arry[j]}`, '');
        }else {
          // modifier가 없다 === false -> true
          _target[i].className = `${_target[i].className.toString()} ${arry[j]}`;
        }
      }else if(method === 'remove') {
        // modifier를 제거한다
        if(_target[i].className.includes(arry[j])) {
          // modifier가 존재한다 === true -> false
          _target[i].className = _target[i].className.toString().replace(` ${arry[j]}`, '');
        }
      }else if(method === 'add') {
        // modifier를 추가한다
        if(!_target[i].className.includes(arry[j])) {
          // modifier가 존재한다 === true -> false
          _target[i].className = `${_target[i].className.toString()} ${arry[j]}`;
        }
      }
    }
  }
}

/*
 * 사용법
 
 boolean형식과 name-value 형식 모두 결정한 방식(method)에 따라 조작한다.
 첫번째 인자로는 add, remove, toggle 세 종류중 하나를 전달해 modifier 조작 방식을 결정하며
 두번째 인자를 넘길때 querySelector, querySelectorAll 등을 사용해 단일 노드 혹은 노드배열 (유사 배열)로 전달하고
 세번째 인자 이후로는 토글시킬 modifier를 순서없이 나열한다. 갯수에 제약이 없다.

modifier(
  'add',
  eventTarget.target,
  'hamberger--hello',
  'hamberger--actived-true',
  'hamberger--actived-false'
);

modifier(
  'remove',
  this.paging.querySelectorAll(`.paging__elm--actived`),
  'paging__elm--actived',
  'toggle-class-name',
  toggle-class-name2'
);
modifier(
  'toggle',
  this.paging.querySelector(`.js-paging__elm:nth-of-type(1)`),
  'paging__elm--actived'
);

 *
 */