import parents from '../helpers/parents';

//페이스북
export function facebook(target){
  FB.ui({
    method: 'share',
    display: 'popup',
    href: location.origin + target.getAttribute('data-href'),
  }, function(response){});
}

// 트위터
export function twitter(target){
  const postTitle = parents(target, 'contents-section__item'),
        targetElement = postTitle.querySelector('.independent-article__title a'),
        title = targetElement.textContent,
        url = targetElement.href;
  
  window.open('http://twitter.com/intent/tweet?text=' + title + '&url=' + url);
}