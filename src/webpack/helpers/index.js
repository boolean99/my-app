// 형제노드 위치상의 순서를 반환하는 함수

export default function index(target) {
  let explorationCount = 0,
      prevElement = target.previousElementSibling,
      firstTargetTagName = target.tagName;
  
  while(prevElement !== null) {
    if(prevElement.tagName !== firstTargetTagName) break;
    explorationCount++;
    prevElement = prevElement.previousElementSibling;
  }
  
  return explorationCount;
}
