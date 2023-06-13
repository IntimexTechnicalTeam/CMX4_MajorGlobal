import Vue from 'vue';
import Router from 'vue-router';
import storage from './sdk/common/Storage';
/* Layout */
import Layout from '@/platform/index.vue';
import RNPLayout from '@/platform/RNPLayout.vue';
import i18n from '@/lang';

Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push (location) {
  return (originalPush.call(this, location) as any).catch(err => { console.log(err); });
};
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/home.vue')
        },
        {
          path: 'admin',
          name: 'admin',
          component: () => import('@/views/admin.vue')
        }
      ]
    },
    {
      path: '/building',
      name: 'building',
      component: () => import('@/views/building.vue')
    },
    {
      path: '/regnpay',
      component: RNPLayout,
      children: [{
        path: '',
        name: 'regnpay',
        component: () => import('@/views/regNPay/index.vue'),
        children: [{
          path: 'form/:id',
          name: 'regNPayForm',
          component: () => import('@/views/regNPay/regNPayForm.vue')
        }, {
          path: 'result/:id',
          name: 'regNPayResult',
          component: () => import('@/views/regNPay/regNPayResult.vue')
        }]
      }]
    },
    {
      path: '/payment',
      component: RNPLayout,
      children: [{
        path: 'PaySuccess/:id',
        name: 'PaySuccess',
        component: () => import('@/views/payment/paySuccess.vue')
      }, {
        path: 'PayFail/:id',
        name: 'PayFail',
        component: () => import('@/views/payment/payFail.vue')
      }]
    },
    {
      path: '/cms',
      component: Layout,
      children: [{
        path: 'content/:id',
        name: 'cmsContent',
        component: () => import('@/views/cms/content.vue')
      }, {
        path: 'catDetail/:id',
        name: 'cmsCatDetail',
        component: () => import('@/views/cms/catDetail.vue')
      }, {
        path: 'search/:key',
        name: 'search',
        component: () => import('@/views/cms/search.vue')
      }]
    },
    {
      path: '/account',
      component: Layout,
      children: [{
        path: 'login',
        name: 'login',
        component: () => import('@/components/business/account/InsLoginN.vue')
      },
      {
        path: 'Register',
        name: 'Register',
        component: () => import('@/components/business/account/InsRegister.vue')
      },
      {
        path: 'RegisterSuccess',
        name: 'RegisterSuccess',
        component: () => import('@/components/business/account/Reg/InsRegSuccess.vue')
      },
      {
        path: 'forgetPassword',
        name: 'forgetPassword',
        component: () => import('@/components/business/account/InsForgetPassword.vue')
      },
      {
        path: 'ModifyPassword',
        name: 'ModifyPassword',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () => import('@/components/business/account/InsModifyPassword.vue')
      },
      {
        path: 'memberInfo',
        name: 'memberInfo',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () => import('@/components/business/account/InsMemberInfo.vue')
      },
      {
        path: 'ResetPwd/:id/:code',
        name: 'notification',
        component: () => import('@/components/business/account/InsResetPwd.vue')
      },
      {
        path: 'MyApplications',
        name: 'MyApplications',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () => import('@/components/business/account/Personal/MyApplications.vue')
      },
      {
        path: 'MyCPDRecords',
        name: 'MyCPDRecords',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () => import('@/components/business/account/Personal/MyCPDRecords.vue')
      },
      {
        path: 'MyMailBox',
        name: 'MyMailBox',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () => import('@/components/business/account/Personal/MyMailBox.vue')
      },
      {
        path: 'PersonalInformation',
        name: 'PersonalInformation',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () => import('@/components/business/account/Personal/PersonalInformation.vue')
      },
      {
        path: 'MemberMeun',
        name: 'MemberMeun',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () => import('@/components/business/account/Personal/MemberMeun.vue')
      }, {
        path: 'MyMailBoxDetail/:id',
        name: 'MyMailBox',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () => import('@/components/business/account/Personal/MyMailDetail.vue')
      } ]
    },
    {
      path: '/event',
      component: Layout,
      children: [{
        path: 'list/:date',
        name: 'eventList',
        component: () => import('@/views/event/eventList.vue')
      }, {
        path: 'detail/:id',
        name: 'eventDetail',
        component: () => import('@/views/event/eventDetail.vue')
      }]
    },
    {
      path: '/photo',
      component: Layout,
      children: [{
        path: 'album',
        name: 'photoAlbum',
        component: () => import('@/views/photo/photoAlbum.vue')
      }, {
        path: 'list/:id',
        name: 'photoList',
        component: () => import('@/views/photo/photoListN.vue')
      }]
    }
  ]
});

export default router;

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) { // 如果未匹配到路由
    // SEO判斷處理
    let lang = to.path.toLowerCase().match(/\/en|\/xc|\/tc/i);

    if (lang) {
      let transLang;
      switch (lang[0]) {
        case '/en':
          transLang = 'E';
          break;
        case '/xc':
          transLang = 'S';
          break;
        case '/tc':
          transLang = 'C';
          break;
      }

      i18n.locale = transLang;

      next({
        path: to.path.toLowerCase().replace(lang[0], '')
      });
    } else {
      from.name ? next({ name: from.name }) : next('/'); // 如果上級也未匹配到路由則跳轉首頁，如果上級能匹配到則轉上級路由
    }
  }

  if (from.name) {
    Vue.prototype.$ShowLayer();
    next();
    setTimeout(() => {
      Vue.prototype.$HiddenLayer();
    }, 500);
  } else {
    setTimeout(function () {
      if (to.path === '/account/login') {
        if (storage.get('isLogin')) {
          next({ path: '/home' });
        }
        next();
      } else {
        if (to.matched.some(record => record.meta.requiresAuth) && !storage.get('isLogin')) {
          // router.push({ path: '/account/login' });
          next({
            path: '/account/login',
            query: {
              returnurl: to.path
            }
          });
        } else if (to.matched.some(record => record.meta.requiresAuth) && storage.get('timeout') && storage.get('timeout') < new Date().getTime()) {
          Vue.prototype.$Login(function () { next(); });
        } else {
          next();
        }
      }
    }, 200);
  }
});
