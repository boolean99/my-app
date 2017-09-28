export default function changeThemeColorUsingSassJs(XHttpResult, param) {
  let scssString = XHttpResult.responseText;
  const doc = document,
        sass = new Sass();
  
  scssString = `$main-color: ${param[0]}; ${scssString}`;

  sass.compile(scssString, function(compiledScssString) {
    if(!doc.getElementById('theme-color')) doc.head.insertAdjacentHTML('beforeend', `<style id="theme-color"></style>`);
    console.log(compiledScssString.text);
    doc.getElementById('theme-color').innerHTML = compiledScssString.text;
  });
}