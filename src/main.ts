import Vue from 'vue';
import Swiper from 'vue-awesome-swiper';
import App from './App.vue';
import router from './router';
import Router from 'vue-router';
import store from './store';
// import ElementUI from 'element-ui';
import './plugins/element.js';
import { MapRegion } from './assets/scripts/map-region';
import { disDevices } from './assets/scripts/dis-devices';
import { getQueryString } from './assets/scripts/common';

// import { ValidationProvider } from 'vee-validate';
// 引入指令文件
import * as directives from '@/directives/index';

import { FrontE } from '@/sdk/common/SysConst';

// require styles
import 'swiper/dist/css/swiper.css';
// 引入css
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/font.css';

// 引进Axios
import axios from 'axios';
import vueAxios from 'vue-axios';
// // 引入多语言
// import VueI18n from 'vue-i18n';
import i18n from '@/lang';

import Auth from './sdk/common/Auth';
import('@/assets/css/main.css');

const originalPush = Router.prototype.push;
Router.prototype.push = function push (location) {
  return (originalPush.call(this, location) as any).catch(err => { console.log(err); });
};

//  批量注册全局指令
Object.keys(directives).forEach(k => Vue.directive(k, directives[k]));

// ValidationProvider
// Vue.component('ValidationProvider', ValidationProvider);
Vue.use(Swiper);
// modified file 'node_module/_vue@2.6.10@vue/types/plugin.d.ts'
// Vue.use(ElementUI);
Vue.use(vueAxios, axios, i18n);
Vue.config.productionTip = false;

Auth.GetToken().then(() => {
  import('./init').then(async (result) => {
    Vue.use(result.default as any);

    if (FrontE.MapRegion) {
      await MapRegion();
      console.log('区分地区完成');
    }

    // 区分PC和手机版
    disDevices();

    Vue.prototype.root = new Vue({
      router,
      store,
      i18n,
      async mounted () {
        // document.dispatchEvent(new Event('render-event'));

        // 向後台傳遞前台默認語言設置
        let lang = i18n.locale;
        await Vue.prototype.$Api.member.setUILanguage(lang).then((result) => {
          Vue.prototype.$Storage.set('locale', lang);
        }).catch((error) => {
          console.log(error);
        });
      },
      render: h => h(App)
    }).$mount('#app');
  });
}, () => {});
