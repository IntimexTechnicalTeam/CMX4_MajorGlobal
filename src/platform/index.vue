<template>
  <div>
    <!-- <Header /> -->
    <ins-header />

    <!-- <transition name="fade-transform"> -->
      <router-view></router-view>
    <!-- </transition> -->

    <!-- <Footer /> -->
    <ins-footer />

    <ins-sidebar />

    <ins-slide-menu :direction="'right'" v-if="isMobile">
      <ins-menu-layout />
    </ins-slide-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {
    InsHeader: () => import('@/components/business/header/InsHeader.vue'),
    InsFooter: () => import('@/components/business/footer/InsFooter.vue'),
    InsSlideMenu: () => import('@/components/business/header/InsSlideMenu.vue'),
    InsMenuLayout: () => import('@/components/business/header/InsMenuLayout.vue'),
    InsSidebar: () => import('@/components/business/header/InsSidebar.vue')
  }
})
export default class layout extends Vue {
  get isMobile () {
    return this.$store.state.isMobile;
  }
}
</script>

<style lang="less">
// fade-transform
// .fade-transform-leave-active,
// .fade-transform-enter-active {
//   transition: all .5s;
// }

// .fade-transform-enter {
//   opacity: 0;
//   transform: translateX(-30px);
// }

// .fade-transform-leave-to {
//   opacity: 0;
//   transform: translateX(30px);
// }
</style>

<style lang="less">
.pc {
  min-width: 1200px;
}

// .mobile {
//   /deep/ .sidebar-container {
//     &.right {
//       width: 100% !important;
//     }
//   }
// }
</style>
