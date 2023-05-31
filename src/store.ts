import Vue from 'vue';
import Vuex from 'vuex';
import storage from './sdk/common/Storage';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    isMobile: false,
    lang: storage.get('locale'),
    orgPath: '', // 重定向前路由
    headerMenus: [],
    footerMenus: [],
    showFixedHeader: false, // 是否處於顯示固定頭部狀態
    isShowMenu: false
  },
  mutations: {
    setIsMobile (state, is) {
      state.isMobile = is;
    },
    setLang (state, lang) {
      state.lang = lang;
    },
    setOrgPath (state, path) {
      state.orgPath = path;
    },
    setHeaderMenus (state, menu) {
      state.headerMenus = menu;
    },
    setFooterMenus (state, menu) {
      state.footerMenus = menu;
    },
    isShowMenu (state, isShowMenu) {
      state.isShowMenu = isShowMenu;
    },
    setShowFixedHeader (state, showFixedHeader) {
      state.showFixedHeader = showFixedHeader;
    }
  },
  actions: {
    setIsMobile: ({ commit }, is) => {
      commit('setIsMobile', is);
    },
    setLang (context, lang) {
      context.commit('setLang', lang);
    },
    setOrgPath: ({ commit }, path) => {
      commit('setOrgPath', path);
    },
    setHeaderMenus: ({ commit }, menu) => {
      commit('setHeaderMenus', menu);
    },
    setFooterMenus: ({ commit }, menu) => {
      commit('setFooterMenus', menu);
    },
    isShowMenu: ({ commit }, isShowMenu) => {
      commit('isShowMenu', isShowMenu);
    },
    setShowFixedHeader: ({ commit }, showFixedHeader) => {
      commit('setShowFixedHeader', showFixedHeader);
    }
  }
});
