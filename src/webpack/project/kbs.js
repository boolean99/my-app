//페이스북
export function facebook(){
  let doc = document,
      sTitle = doc.head.querySelector('[property="og:title"]').getAttribute('content'),
      sUrl = doc.head.querySelector('[property="og:url"]').getAttribute('content'),
      sImage = doc.head.querySelector('[property="og:image"]').getAttribute('content'),
      shref = `http://www.facebook.com/sharer.php?s=100&p[url]=${sUrl}&p[images][0]=${sImage}&p[title]=${sTitle}&p[summary]=`;
  
  shref = shref.split("#").join("%23");
  shref = encodeURI(shref);

  let sWindow=window.open(shref);
  
  if (sWindow) sWindow.focus();
}

// 트위터
export function twitter(){
  let ogTitle = document.head.querySelector('[property="og:title"]').getAttribute('content'),
      sUrl = doc.head.querySelector('[property="og:url"]').getAttribute('content'),
      sWindow = window.open(`http://twitter.com/intent/tweet?text=${encodeURIComponent(ogTitle)}&url=${encodeURIComponent(sUrl)}`);
  
  if (sWindow) sWindow.focus();
}