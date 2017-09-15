(function() {
  const DOC = document;
  
  DOC.body.insertAdjacentHTML('beforeend', `<aside id="preview" class="js-preview-hide"></aside><img src=" ">`);
  
  const target = document.getElementById('preview');

  target.addEventListener('click', function() {
    if(target.className === "js-preview--show") {
      this.className = "js-preview--hide";
    }else {
      this.className = "js-preview--show";
    }
  });
})();