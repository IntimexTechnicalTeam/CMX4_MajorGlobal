<template>
  <div>
    <router-view></router-view>
    <ins-copyright />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {
    InsCopyright: () => import('@/components/business/footer/InsCopyright.vue')
  }
})
export default class RNPLayout extends Vue {

}
</script>

<style lang="less">
.pc {
  min-width: 1200px;
}
</style>
