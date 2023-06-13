<template>
<div id="container">
      <MobileLogin v-if="isMobile"/>
      <PcLogin  v-if="!isMobile"/>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
@Component({
  components: {
    MobileLogin: () => import('@/components/business/account/Login/InsMobileLoginN.vue'),
    PcLogin: () => import('@/components/business/account/Login/InsPcLoginN.vue')
  }
})
export default class InsLoginN extends Vue {
  get isMobile () {
    return this.$store.state.isMobile;
  }
}
</script>
