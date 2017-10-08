import makeLayout from './make-layout';
import colorPickerModule from './color-picker';

export default function makeExtraElement() {
  const doc = document,
        dobyClassName = doc.body.className,
        containHTMLString = {
    colorPicker: `<aside class="color-picker js-color-picker setting"><div class="loader loader--deactivated"><svg class="loader__svg" viewBox="0 0 120 120"><circle class="loader__internal-circle" cx="60" cy="60" r="30"></circle><circle class="loader__external-circle" cx="60" cy="60" r="50"></circle></svg></div><button class="color-picker__icon js-setting-icon setting__icon">palette</button><div class="color-picker__panel setting__panel"><div class="color-picker__result"><span class="color-picker__color-visual js-color-picker__color-visual"></span><input class="color-picker__color-string js-color-picker__color-string" type="text"></div></div></aside>`,
    config: `<aside class="config js-config setting"><button class="config__icon js-setting-icon setting__icon">settings</button><div class="config__panel setting__panel"><div class="loader loader--deactivated"><svg class="loader__svg" viewBox="0 0 120 120"><circle class="loader__internal-circle" cx="60" cy="60" r="30"></circle><circle class="loader__external-circle" cx="60" cy="60" r="50"></circle></svg></div><div class="direction config-tab"><span class="direction__title config-tab__title">Contents direction</span><button class="button js-config-tab__button config-tab__button config-tab__button--selected config-tab__button--size-half direction__button" data-modifier-target="document.body" data-modifier-value="ltr">LTR</button><button class="button js-config-tab__button config-tab__button config-tab__button--size-half direction__button" data-modifier-target="document.body" data-modifier-value="rtl">RTL</button></div><div class="sidebar-existence config-tab"><span class="sidebar-existence__title config-tab__title">Side bar</span><button class="button js-config-tab__button config-tab__button config-tab__button--selected config-tab__button--size-half sidebar-existence__button" data-modifier-target="contents-section__container" data-modifier-value="sidebar-activated">Activated</button><button class="button js-config-tab__button config-tab__button config-tab__button--size-half sidebar-existence__button" data-modifier-target="contents-section__container" data-modifier-value="sidebar-deactivated">Deactivated</button></div><div class="layout config-tab"><span class="layout__title config-tab__title">Article layout</span><button class="button js-config-tab__button config-tab__button config-tab__button--selected layout__button" data-modifier-target="article-list" data-modifier-value="layout-standard">view_agenda</button><button class="button js-config-tab__button config-tab__button layout__button" data-modifier-target="article-list" data-modifier-value="layout-list">view_list</button><button class="button js-config-tab__button config-tab__button layout__button" data-modifier-target="article-list" data-modifier-value="layout-grid">view_module</button></div></div></aside>`,
    moveViewport: `<aside class="move-viewport"><button class="button-controller js-toggle-viewport-controller" title="Open convenient navigator">import_export</button><button class="move-viewport__children-button move-viewport__children-button--the_top js-scroll-to-top" title="Go to top of page">arrow_upward</button><button class="move-viewport__children-button move-viewport__children-button--contents js-scroll-to-contents" title="Go to top of contents">first_page</button><button class="move-viewport__children-button move-viewport__children-button--prev_article js-prev-post" title="Move to previous post" disabled>expand_less</button><button class="move-viewport__children-button move-viewport__children-button--next_article js-next-post" title="Move to next post" disabled>expand_more</button><button class="move-viewport__children-button move-viewport__children-button--the_bottom js-scroll-to-bottom" title="Go to bottom of page">last_page</button><button class="move-viewport__children-button move-viewport__children-button--close js-toggle-viewport-controller" title="Close conveninet navigator">close</button></aside>`
  }
  
  doc.body.insertAdjacentHTML('beforeend', containHTMLString.colorPicker);
  doc.body.insertAdjacentHTML('beforeend', containHTMLString.config);
  doc.body.insertAdjacentHTML('beforeend', containHTMLString.moveViewport);
  
  // 페이지에 따른 설정
  switch(dobyClassName) {
    case 'index' :
      makeLayout('standard');
      break;
    case 'category' :
      let firstBtn = document.querySelectorAll('.sidebar-existence__button')[0],
          secondBtn = document.querySelectorAll('.sidebar-existence__button')[1];
      
      firstBtn.setAttribute('disabled', true);
      firstBtn.setAttribute('style', 'cursor: not-allowed; background: darkred; border: none;');
      secondBtn.setAttribute('disabled', true);
      secondBtn.setAttribute('style', 'cursor: not-allowed; background: darkred; border: none;');
      break;
    case 'contact' :
      break;
  }
}