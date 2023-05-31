<template>
  <div class="ins_building_warpper" ref="buildingWarpper" :style="paddingTop">
      <img :src="background" class="background">
      <img :src="img" alt="" :class="{ 'pc_logo': !isMobile, 'mobile_logo': isMobile }">
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { FrontE } from '@/sdk/common/SysConst';
@Component
export default class InsBuilding extends Vue {
    private img:string = '';
    private background:string = '';
    private paddingTop:string = '';
    beforeCreate () {
      if ((!FrontE.pcBuilding && !this.$store.state.isMobile) || (!FrontE.mobileBuilding && this.$store.state.isMobile)) {
        this.$router.push('/');
      }
    }
    created () {
      if ((this.isMobile && !FrontE.mobileBuilding) || (!this.isMobile && !FrontE.pcBuilding)) return;
      this.background = this.isMobile ? '/static/building/Mobile.jpg' : '/static/building/PC.jpg';
      this.img = this.isMobile ? '/static/building/MobileLogo.png' : '/static/building/PCLogo.png';

      this.$HiddenLayer();
    }
    mounted () {
    }
    data () {
      return {
      };
    }

    get isMobile () {
      return this.$store.state.isMobile;
    }

    get indexLayout () {
      return '';
    }
}
</script>
<style lang="less" scoped>
.ins_building_warpper{
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .background{
      width: 100vw;
      height: 100vh;
    }
    .pc_logo{
      height: 21%;
      position:absolute;
      top: 5%;
      left: 50%;
      transform: translateX(-50%);
    }
    .mobile_logo{
      height: 12%;
      position:absolute;
      top: 5%;
      left: 50%;
      transform: translateX(-50%);
    }
}
</style>
