export default function catchEventTarget(target) {
  let _target = target,
      findJsString = _target.className.split(' ').find((item => item.startsWith('js-'))),
      returnObj;

  while(findJsString === undefined) {
    if(_target.parentElement !== null) _target = _target.parentElement;
    else break;
    
    findJsString = _target.className.split(' ').find((item => item.startsWith('js-')));
  }
  
  return returnObj = {
    target: _target,
    findJsString
  };
}