<template>
<div id="container">
      <MobileReg v-if="isMobile"/>
      <PcReg  v-if="!isMobile"/>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
@Component({
  components: {
    MobileReg: () => import('@/components/business/account/Reg/InsMobileReg.vue'),
    PcReg: () => import('@/components/business/account/Reg/InsPcReg.vue')
  }
})
export default class InsRegister extends Vue {
  get isMobile () {
    return this.$store.state.isMobile;
  }
}
</script>
