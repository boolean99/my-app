(function() {
  const DOC = document;
  
  DOC.body.insertAdjacentHTML('beforeend', `<aside id="mirror"></aside>`);
  DOC.documentElement.dir = 'ltr';
  
  DOC.getElementById('mirror').addEventListener('click', function () {
    if(DOC.documentElement.dir === 'ltr') {
      DOC.documentElement.dir = 'rtl';
      this.style.color = 'red';
    }else {
      DOC.documentElement.dir = 'ltr';
      this.style.color = 'black';
    }
  });
})();