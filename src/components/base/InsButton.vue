<template>
  <div :style="BtnStyle + (borderRadius?'border-radius:20px':'')" class="in_btn" :class="MyType+' '+MySize" @click="click" >{{nama}}</div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
@Component
export default class InsButton extends Vue {
  @Prop() private readonly nama!: string;
  @Prop() private readonly width!: string;
  @Prop() private readonly height!: string;
  @Prop() private readonly type!: string;
  @Prop() private readonly size!: string;
  @Prop() private readonly action!: string;
  @Prop({ default: false }) private readonly borderRadius!:boolean;
  private MyType = '';
  private MySize = '';
  get BtnStyle (): string {
    let Width = this.width;
    let Height = this.height;
    let Style =
      (Width ? 'width:' + Width + ';' : '') +
      (Height ? 'height:' + Height + ';' : '');
    return Style;
  }
  click (): void {
    if (this.action) {
      this.$emit('click', this.action);
    } else {
      this.$emit('click');
    }
  }
  created () {
    this.MyType = this.type ? this.type : 'primary';
    this.MySize = this.size ? this.size : 'large';
  }
}
</script>
<style scoped lang="less">
.in_btn {
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
}
.primary {
  background-color: @base_color;
  color: white;
}
// .primary2{
//   background-color: @base_color;
//   color: white;
// }
.error {
  background-color: @error_color;
  color: white;
}
.warning {
  background-color: @warning_color;
  color: white;
}
.info {
  background-color: @info_color;
  color: white;
}
.success {
  background-color: @success_color;
  color: white;
}
.positive {
  border: 2px solid black;
  color: red;
  background-color: @positive_color;
}
.nagative {
  color: white;
  background-color: @nagative_color;
}
.large {
  font-size: 25px;
  line-height: 40px;
}
.middle {
  font-size: 18px;
  line-height: 40px;
  margin: 5px 5px;
}
.small {
  font-size: 12px;
  line-height: 30px;
  margin: 5px 5px;
}
</style>
