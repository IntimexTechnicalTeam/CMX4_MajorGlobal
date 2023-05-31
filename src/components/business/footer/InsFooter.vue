<template>
    <component :is="$store.state.isMobile ? 'MInsFooterLayout' : 'PInsFooterLayout'" />
  <!-- <div id="footer">
    <footerLayout />
  </div> -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    PInsFooterLayout: () => import('./layout/pc/InsFooterLayout.vue'),
    MInsFooterLayout: () => import('./layout/mobile/InsFooterLayout.vue')
    // footerLayout: () => import('./layout/pc/InsFooterLayout.vue')
  }
})
export default class InsFooter extends Vue {
}
</script>

<style scoped lang="less">

</style>
