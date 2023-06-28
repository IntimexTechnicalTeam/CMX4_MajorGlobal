<template>
  <div id="container" class="bodyback">
    <ins-header />
    <router-view/>
    <ins-footer />

    <ins-sidebar />

    <ins-slide-menu :direction="'right'" v-if="isMobile">
      <ins-menu-layout />
    </ins-slide-menu>
  </div>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  components: {
    InsHeader: () => import('@/components/business/header/InsHeader.vue'),
    InsFooter: () => import('@/components/business/footer/InsFooter.vue'),
    InsSlideMenu: () => import('@/components/business/header/InsSlideMenu.vue'),
    InsMenuLayout: () => import('@/components/business/header/InsMenuLayout.vue'),
    InsSidebar: () => import('@/components/business/header/InsSidebar.vue')
  }
})
export default class RNPIndex extends Vue {
  get isMobile () {
    return this.$store.state.isMobile;
  }
}
</script>
<style lang="less">
.pc {
  min-width: 1200px;
  .bodyback{
    width: 100%;
    height: 100%;
    background: url('/static/Images/indexback.png') bottom center;
    background-size: cover;
  }
}

.mobile {
  .bodyback{
    width: 100%;
    height: 100%;
    background: url('/static/Images/indexMback.jpg') bottom center;
    background-size: contain;
  }
}
</style>
