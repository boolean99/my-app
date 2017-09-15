export default function parents(thisTarget, parentClassName) {
  let _thisTarget = thisTarget,
      catchTarget = _thisTarget.className.split(' ').find(elm => elm.startsWith('js-'));
  
  while(!_thisTarget.className.split(' ').find(elm => elm.includes(parentClassName))) {
    _thisTarget = _thisTarget.parentElement;
  }
  
  return _thisTarget;
}