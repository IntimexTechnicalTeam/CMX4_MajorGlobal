<template>
  <div id="app" :class="{'pc': !isMobile, 'mobile': isMobile}">
    <div ref='layer' id='layer'></div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { FrontE } from '@/sdk/common/SysConst';

@Component
export default class App extends Vue {
  private queryLang: string = '';

  // 建站中跳转
  beforeCreate () {
    if (((FrontE.pcBuilding && !this.$store.state.isMobile) || (FrontE.mobileBuilding && this.$store.state.isMobile)) && this.$route.name !== 'building') {
      this.$store.dispatch('setOrgPath', this.$route.path);
      this.$router.push('/building');
    }
  }

  beforeUpdate () {
    if (this.$route.query.returnUrl) {
      let url = this.$route.query.returnUrl + '?';
      Object.keys(this.$route.query).forEach((e) => {
        if (e !== 'returnUrl') url += e + '=' + this.$route.query[e] + '&';
      });
      this.$router.push(url);
    } else {
      this.$nextTick(() => {
        this.$Api.promotion.GetHomeSeoData().then(result => {
          document.title = result.Data.Title;
        });
      });
    }
  }

  get isMobile () {
    return this.$store.state.isMobile;
  }

  mounted () {
    Vue.prototype.$ShowLayer();
    setTimeout(() => { Vue.prototype.$HiddenLayer(); }, 2000);
  }

  @Watch('isMobile', { deep: true })
  onMediaChange () {
    if (((FrontE.pcBuilding && !this.isMobile) || (FrontE.mobileBuilding && this.isMobile)) && this.$route.name !== 'building') {
      this.$store.dispatch('setOrgPath', this.$route.path);
      this.$router.push('/building');
    } else if (this.$route.name === 'building') {
      this.$router.push(this.$store.state.orgPath);
    }
  }
}
</script>
<style lang="less">
.el-scrollbar{
  >.el-scrollbar__bar{
    opacity: 1!important;
  }
}
</style>
