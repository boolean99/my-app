import modifier from '../helpers/modifier';

export default function compileSassAndInsert(XHttpResult, param) {
  let scssString = XHttpResult.responseText;
  const DOC = document,
        sass = new Sass();
  
  scssString = `$${param.variable[0]}: ${param.variable[1]}; ${scssString}`;

  sass.compile(scssString, function(compiledScssString) {
    if(!DOC.getElementById(param.id)) DOC.head.insertAdjacentHTML('beforeend', `<style id="${param.id}"></style>`);
    
    DOC.getElementById(param.id).innerHTML = compiledScssString.text;
    
    
    if(param.id !== 'theme-color') {
      modifier(
        'add',
        DOC.querySelector('.js-config .loader'),
        'loader--deactivated'
      );
    }else {
      modifier(
        'add',
        DOC.querySelector('.js-color-picker .loader'),
        'loader--deactivated'
      );
    }
  });
}