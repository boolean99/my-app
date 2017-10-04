import modifier from '../helpers/modifier';

export default function mobileNav(target) {
  const doc = document,
        tempElementId = 'temporary-another-body';
  
  if(target.parentElement.parentElement.id === tempElementId) {
    doc.documentElement.removeChild(doc.getElementById(tempElementId));
    doc.body.style.filter = 'none';
  }else {
    let createdElement = doc.createElement('div');
    
    createdElement.id = 'temporary-another-body';
    createdElement.innerHTML = doc.querySelector('.nav').outerHTML;

    doc.body.style.filter = 'blur(20px)';

    doc.documentElement.insertBefore(createdElement, doc.body);
    modifier('add', doc.getElementById(tempElementId).querySelector('.hamburger'), 'hamburger--activated');
  }
}