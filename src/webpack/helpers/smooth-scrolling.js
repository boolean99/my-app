export default function scrollTo(element, to, duration) {
  if (duration <= 0) return false;
  let difference = to - element.scrollTop,
      perTick = difference / duration * 10;

  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick;
    
    if (element.scrollTop === to) return false;
    
    scrollTo(element, to, duration - 10);
  }, 10);
}