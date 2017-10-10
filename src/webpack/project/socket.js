function socketFunc(socket) {
  console.log('socket!!');
  
  socket.on('loadMorePostsInClient', (param) => {
    if(!param.length) alert(`There's nothing to fetch anymore.. :(`);
    
    const doc = document,
          loadBtn = doc.querySelector('.js-load-more'),
          postsContainer = doc.querySelector('.contents-section__article-list');
    
    let willBeInstertedHTMLString = '';
    
    for(let i = 0, ilen = param.length; i < ilen; i++) {
      willBeInstertedHTMLString += `<article class="contents-section__item contents-section__item--new_added independent-article"><span class="independent-article__category">${param[i].category}</span><h1 class="independent-article__title"><a href="/posts/${param[i]._id}">${param[i].title}</a></h1><p class="independent-article__date">${param[i].display_date}</p><figure class="independent-article__figure figure"><figcaption class="contents-section__figcaption">${param[i].contents.slice(0, 250)} ...</figcaption></figure><a class="button button--theme-flat" href="/posts/${param[i]._id}">CONTINUE READING</a><section class="share contents-section__share"><div><button class="share__item js-share-facebook" data-href="/posts/${param[i]._id}"><div><span>facebook</span></div></button><button class="share__item js-share-twitter"><div><span>twitter</span></div></button><a class="share__item js-share-reply" href="/posts/${param[i]._id}#comment"><div><span>reply</span></div></a></div><hr></section></article>`;
    }
    
    loadBtn.insertAdjacentHTML('beforebegin', willBeInstertedHTMLString);
  });
}

export {socketFunc};

