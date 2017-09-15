// 불리언값을 토글후 반환하는 함수

export default function toggleBoolean(toggleTarget) {
  if(typeof toggleTarget === 'string') {
    return toggleTarget === 'true' ? false : true;
  }else if(typeof toggleTarget === 'boolean') {
    return toggleTarget ? false : true;
  }
}