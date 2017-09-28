export default function returnXHttpObj(func, ...param) {
  let xHttp = new XMLHttpRequest();
  
  xHttp.onreadystatechange = function() {
    if(this.status === 200 && this.readyState === 4) {
      func(this, param);
    }
  };
  
  return xHttp;
}