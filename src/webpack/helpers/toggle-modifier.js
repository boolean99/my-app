export default function toggleModifier(target, ...arry) {
  for(let i = 0, len = arry.length; i < len; i++) {
    if(target.className.includes(arry[i])) {
      // boolean 형식의 modifier가 존재한다 === true -> false
      target.className = target.className.toString().replace(` ${arry[i]}`, '');
    }else {
      // boolean 형식의 modifier가 없다 === false -> true
      target.className = `${target.className.toString()} ${arry[i]}`;
    }
  }
}

/*
 * 사용법
 
 첫번째 인자로 이벤트 타겟에 대한 DOM 엘리먼트를 전달하며
 boolean 형식과 name-value 형식의 구분없이 제거할 || 추가할 modifier를 모두 명시적으로 인자로서 전달해주면 된다.
 
 # boolean 형식은 존재의 유무에 따라 중요성을 갖기 때문에 초기 할당이 되어있지 않아도 상관없으나 name-value 형식은 value의 값에 따라 중요성을 갖기때문에 반드시 초기할당이 되어있는 상태여야 한다.

toggleModifier(eventTarget.target, 'hamberger--hello', 'hamberger--actived-true', 'hamberger--actived-false');

 *
 */