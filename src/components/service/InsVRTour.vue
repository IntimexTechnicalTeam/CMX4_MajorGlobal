<template>
  <div class="VRTour">
    <iframe :src="content.Url" frameborder="0" width="100%" height="100%"></iframe>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
@Component
export default class InsVRTour extends Vue {
  content: string = '';
  get isMobile () {
    return this.$store.state.isMobile;
  }
  getContent () {
    this.$Api.cms.getContentByDevice({ key: 'vr', IsMobile: this.isMobile }).then(result => {
      this.content = result.CMS;
    });
  }
  mounted () {
    this.getContent();
  }
}
</script>
<style lang="less" scoped>
.VRTour{
  iframe{
    width: 100vw;
    height: 100vh;
    display: block;
  }
}
</style>
