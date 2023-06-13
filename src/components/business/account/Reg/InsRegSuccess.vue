<template>
  <div class="RegSuccess">
      <div class="Innerbox">
            <p class="TextIcon"><i class="el-icon-circle-check"></i></p>
            <p class="TextTips">{{$t('BoAForm.RegSuccessTipsA')}}</p>
            <p class="TextTips">{{$t('BoAForm.RegSuccessTipsB')}}</p>
      </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
export default class InsRegSuccess extends Vue {

}
</script>
<style lang="less" scoped>
.pc {
  .RegSuccess {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-top: 50px;
    padding-bottom: 50px;
    .Innerbox {
      width: 1200px;
      margin: 0 auto;
        .TextIcon {
          width: 100%;
          display: inline-block;
          text-align: center;
          margin-bottom: 20px;
          i{
            font-size: 60px;
            color: @base_color;
          }
        }
        .TextTips {
          width: 100%;
          display: inline-block;
          text-align: center;
          font-size: 20px;
          color: @base_color;
          margin-bottom: 5px;
        }
    }
  }
}
.mobile {
  .RegSuccess {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-top: 3rem;
    padding-bottom: 3rem;
    .Innerbox {
      width: 90%;
      margin: 0 auto;
        .TextIcon {
          width: 100%;
          display: inline-block;
          text-align: center;
          margin-bottom: 1rem;
          i{
            font-size: 6rem;
            color: @base_color;
          }
        }
        .TextTips {
          width: 100%;
          display: inline-block;
          text-align: center;
          font-size: 1.4rem;
          color: @base_color;
          margin-bottom: .5rem;
        }
    }
  }
}
</style>
