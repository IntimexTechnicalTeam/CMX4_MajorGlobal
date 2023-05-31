import Vue from 'vue';
import store from '@/store';

export function disDevices () {
  if (window.innerWidth < 481) {
    store.dispatch('setIsMobile', true);
    setRem(320);
  } else if (window.innerWidth < 769) {
    setRem(550);
    store.dispatch('setIsMobile', true);
  } else {
    store.dispatch('setIsMobile', false);
  }

  console.log('window addEventListener');

  window.addEventListener('resize', () => {
    if (window.innerWidth < 481) {
      store.dispatch('setIsMobile', true);
      setRem(320);
    } else if (window.innerWidth < 769) {
      store.dispatch('setIsMobile', true);
      setRem(550);
    } else {
      store.dispatch('setIsMobile', false);
      document.documentElement.style.fontSize = '';
    }
  });
}

// 设置 rem 函数
function setRem (base) {
  let width = document.documentElement.clientWidth;
  const newFont = (width / base) * 10;
  document.documentElement.style.fontSize = newFont + 'px';
}
