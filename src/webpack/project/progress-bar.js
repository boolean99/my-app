function progressBar(state, duration) {
  let target = document.querySelector('.js-progress-bar');
  
  if(target.style.animationPlayState === state) return false;
  
  if(state === 'running') target.style.animationDuration = `${duration}s`;
  target.style.animationPlayState = state;
}

export default progressBar;