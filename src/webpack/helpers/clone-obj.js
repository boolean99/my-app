// 객체를 복사한다

export default function cloneObj(obj) {
  if (obj === null || !obj.constructor.toString().includes('Object')) return obj;

  let copyObj = obj.constructor();

  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copyObj[attr] = obj[attr];
  }

  return copyObj;
}
