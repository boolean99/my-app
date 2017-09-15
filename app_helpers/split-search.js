export default function splitSearch(url) {
  if(!url.includes('?')) return false;
  
  let searchStringArry = url.slice(url.indexOf('?') + 1).split('&'),
      returnObj = {};
      
  for(let i = 0, len = searchStringArry.length; i < len; i++) {
    returnObj[searchStringArry[i].slice(0, searchStringArry[i].indexOf('='))] = searchStringArry[i].slice(searchStringArry[i].indexOf('=') + 1);
  }
  
  return returnObj;
}