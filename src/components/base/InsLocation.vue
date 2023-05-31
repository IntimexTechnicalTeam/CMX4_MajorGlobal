<template>
  <div class="LocationMain">
    <span class="LocationTips">{{LocationTips}}</span>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="Location">
      <el-breadcrumb-item :to="{ path: '/' }">{{Homepage}}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="Column">{{Column}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{Title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
@Component
export default class InsLocation extends Vue {
  @Prop() private readonly LocationTips!: string;
  @Prop() private readonly Homepage!: string;
  @Prop() private readonly Column!: string;
  @Prop() private readonly Title!: string;
}
</script>
<style scoped lang="less">
.LocationMain {
  width: 100%;
  display: inline-block;
  line-height: 35px;
  height: 35px;
}
.LocationTips {
  float: left;
  line-height: 35px;
  height: 35px;
}
.LocationMain .el-breadcrumb {
  line-height: 35px;
  height: 35px;
}
</style>
