export function makeSelectorToArray(val) {
  let doc = document,
      returnArray = [],
      eachQueryAll = null;
  
  if(val.constructor.toString().toLowerCase().indexOf('array') > -1) {
    // 파라미터의 변수형이 배열임
    for(let i = 0; i < val.length; i++) {
      eachQueryAll = doc.querySelectorAll(`.${val[i]}`);

      for(let j = 0; j < eachQueryAll.length; j++) {
        returnArray.push(eachQueryAll[j]);
      }
    }
  }else {
    // 파라미터의 변수형이 문자열임 = 단일셀렉터임
    eachQueryAll = doc.querySelectorAll(`.${val}`);

    for(let i = 0; i < eachQueryAll.length; i++) {
      returnArray.push(eachQueryAll[i]);
    }
  }
  
  return returnArray;
}