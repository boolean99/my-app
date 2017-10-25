import modifier from '../helpers/modifier';
import returnXHttpObj from './xhttp';
import compileSassAndInsert from './compile-sass-and-insert.js';
import ColorPicker from 'simple-color-picker';

export default function colorPickerModule() {
  const DOC = document,
        colorPicker = new ColorPicker({
                            color: '#FF0000',
                            background: '#454545',
                            width: 180,
                            height: 180
                          });

  colorPicker.appendTo(DOC.querySelector('.js-color-picker > .setting__panel'));
  colorPicker.setColor('#23aef4');
  
  function onChangeInnerFunc(changedHexString) {
    let changedRGBString = `rgba(${colorPicker.getRGB().r}, ${colorPicker.getRGB().g}, ${colorPicker.getRGB().b}, ${colorPicker.getRGB().a})`;
        var xHttpObj = returnXHttpObj(
          compileSassAndInsert,
          {
            variable: ['main-color', changedRGBString],
            id: 'theme-color'
          }
        );

    DOC.querySelector('.js-color-picker__color-string').value = changedHexString;
    DOC.querySelector('.js-color-picker__color-visual').style.background = changedRGBString;
    
    modifier(
      'remove',
      DOC.querySelector('.js-color-picker .loader'),
      'loader--deactivated'
    );

    xHttpObj.open('GET', 'css/theme-color.scss', true);
    xHttpObj.send(null);
  }
    
  colorPicker.onChange((changedHexString) => {
    // colorPicker 모듈 응답 에러를 잡기위함
    clearTimeout(onChangeInnerFunc.tId);
    
    onChangeInnerFunc.tId = setTimeout(() => {
      onChangeInnerFunc(changedHexString);
    }, 500);
  });
}