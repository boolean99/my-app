export default function mainVisualScrollOpacity() {
  const DOC = document;
  
  let mainvisualOpacityCSS = `.main-visual > *:not([class~="img-background-board"]) {opacity: ${1 - document.body.scrollTop / 1000};}`;

  if(!DOC.querySelector('#main-visual-opacity')) {
    DOC.head.insertAdjacentHTML('beforeend', `<style id="main-visual-opacity"></style>`);
  }

  DOC.getElementById('main-visual-opacity').innerHTML = mainvisualOpacityCSS;
}