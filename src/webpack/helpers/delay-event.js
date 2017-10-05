// 이벤트 지연 함수

export default function delayEvent(delay, func, param) {
  clearTimeout(func.tId);
  
  func.tId = setTimeout(() => {
    func(param);
  }, delay);
}