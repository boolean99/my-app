import returnXHttpObj from './xhttp';
import compileSassAndInsert from './compile-sass-and-insert.js';
import modifier from '../helpers/modifier';
import makeLayout from './make-layout';

export default function settingPanel(evtTarget) {
  const DOC = document,
        modifierTarget = evtTarget.getAttribute('data-modifier-target'),
        modifierValue = evtTarget.getAttribute('data-modifier-value');
  
  // 같은 종류의 버튼들의 활성화를 모두 제거해주고
  modifier(
    'remove',
    evtTarget.parentElement.querySelectorAll('.config-tab__button--selected'),
    'config-tab__button--selected'
  );
  // 선택된 버튼만 활성화 시킨다
  modifier(
    'add',
    evtTarget,
    'config-tab__button--selected'
  );
  
  if(modifierTarget !== 'document.body') {
    let id = modifierValue.slice(0, modifierValue.indexOf('-')),
        xHttpObj = returnXHttpObj(
          compileSassAndInsert,
          {
            variable: ['compile-standard', modifierValue],
            id,
            callbackParam: modifierValue.slice(modifierValue.indexOf('-') + 1)
          }
        );
    
    modifier(
      'remove',
      DOC.querySelector('.js-config .loader'),
      'loader--deactivated'
    );
    
    xHttpObj.open('GET', `css/setting-${id}.scss`, true);
    xHttpObj.send(null);
    
    DOC.querySelector('.contents-section__container').setAttribute('style', 'opacity: 0; transition: 0.6s all linear');

    for(let i = 1, ilen = evtTarget.parentElement.childElementCount; i < ilen; i++) {
      modifier(
        'remove',
        DOC.querySelector(`.${evtTarget.parentElement.children[i].getAttribute('data-modifier-target')}`),
        `${modifierTarget}--${evtTarget.parentElement.children[i].getAttribute('data-modifier-value')}`
      );
    }
    
    modifier(
      'add',
      DOC.querySelector(`.${modifierTarget}`),
      `${modifierTarget}--${modifierValue}`
    );
  }else {
    // direction 만 동작 예외
    DOC.documentElement.dir = modifierValue;
  }
}