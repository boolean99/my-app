import returnXHttpObj from './xhttp';
import changeThemeColorUsingSassJs from './change-theme-color';
import ColorPicker from 'simple-color-picker';

export default function colorPickerModule() {
  const DOC = document,
        colorPicker = new ColorPicker({
                            color: '#FF0000',
                            background: '#454545',
                            width: 180,
                            height: 180
                          });

  colorPicker.appendTo(DOC.querySelector('.js-color-pciker > .setting-panel'));
  
  colorPicker.onChange((changedColor) => {
    DOC.querySelector('.js-color-picker__color-string').value = changedColor;
    DOC.querySelector('.js-color-picker__color-visual').style.background = changedColor;
    
    let xHttpObj = returnXHttpObj(changeThemeColorUsingSassJs, changedColor);

    xHttpObj.open('GET', 'css/_theme-color.scss', true);
    xHttpObj.send(null);
  });
}