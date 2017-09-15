import clipboard  from 'clipboard';
// clipboard.js 모듈 커스텀 함수

export default function clipboardFunc(selector) {
  const clipboardVar = new clipboard(`.${selector}`);
  
  clipboardVar.on('success', (e) => {
    alert(`"${document.querySelector(`.${selector}`).getAttribute('data-clipboard-text')}" has been copied in your clipboard!`);
    e.clearSelection();
  });
  
  clipboardVar.on('error', function() {
    alert(`Clipboard function's failed..`);
  });
  
  setTimeout(() => {
    clipboardVar.destroy();
  }, 3000);
};