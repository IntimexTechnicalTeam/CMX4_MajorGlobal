<template>
  <div id="container">
    <div class="ForgetPassMain">
      <p class="pageTitle">{{$t('Forgetpassword.ForgetPassword')}}</p>
      <div style="margin-top: 15px;width:100%;display:block" v-if="ResetPwd">
        <h2 class="ResetPwdTips">{{$t('Forgetpassword.ResetPwdTips')}}</h2>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="auto"
          class="demo-ruleForm"
        >
          <el-form-item prop="UserEmail">
            <el-input
              :placeholder="$t('Forgetpassword.LoginNameEmail')"
              v-model="ruleForm.UserEmail"
              prefix-icon="el-icon-message"
              clearable
            >
              <el-button
                slot="append"
                icon="el-icon-arrow-right"
                @click="SubmitForm"
              >{{$t('Forgetpassword.NextStep')}}</el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 输入正确的Email后，弹窗 -->
      <div class="EmailSuccess" v-if="!ResetPwd">
        <p>
          <i class="el-icon-success"></i>
        </p>
        <p>{{$t('Forgetpassword.ResetPwdSuccess')}}</p>
        <p>{{$t('Forgetpassword.NotEmail')}}?</p>
        <p>
          <a
            @click="ResetReturn"
            :title="$t('Forgetpassword.ToReEnter')"
          >{{$t('Forgetpassword.ToReEnter')}}</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import sdk from '@/sdk/InstoreSdk';
import { Form as ElForm, Input as ElInput, Message, FormItem, Button as ElButton } from 'element-ui';
@Component({
  components: {
  }
})
export default class InsForgetPassword extends Vue {
  ResetPwd: boolean = true;
  ImgList:string='';
  ruleForm: any = {
    UserEmail: ''
  };
  ResetReturn () {
    this.ResetPwd = !this.ResetPwd;
    this.ruleForm.UserEmail = '';
  }
  get rules () {
    return {
      UserEmail: [
        {
          required: true,
          message: this.$t('Forgetpassword.EnterEmail'),
          trigger: 'blur'
        },
        {
          type: 'email',
          message: this.$t('Forgetpassword.CorrectEmail'),
          trigger: ['blur', 'change']
        }
      ]
    };
  }
  // 检查表单
  SubmitForm (ruleForm) {
    let that = this;
    this.$nextTick(function () {
      (that.$refs.ruleForm as HTMLFormElement).validate(valid => {
        if (valid) {
          var that = this;
          sdk.api.member.resetPassword(that.ruleForm.UserEmail).then(
            function (success) {
              if (success) {
                that.ResetPwd = !that.ResetPwd;
              }
            },
            function (success) {
              Message({
                message: success.Message,
                type: 'error'
              });
            }
          );
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    });
  }
}
</script>
<style lang="less" scoped>
.DetailTitle{
  width: 100%;
  display: inline-block;
  position: relative;
  img{
    width: 100%;
  }
  .TitleBg{
    width: 50%;
    height: 4.5rem;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 20px;
    top: 32%;
    position: absolute;
    .innerBoxText{
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: 700;
      font-family: 'Arial';
      padding-top: 1rem;
      padding-bottom: 1rem;
      text-shadow: #a6801f 1px 0 0, #a6801f 0 1px 0, #a6801f -1px 0 0, #a6801f 0 -1px 0;

      line-height: 2.5rem;
    }
  }
}
.Banner {
  width: 100%;
  height: 15rem;
  display:flex;
  align-items: center;
  position: relative;
}
#container {
  width: 100%;
  display: inline-block;
  margin-top: 3rem;
  margin-bottom: 2rem;
  .forgetpsw_title{
    font-size: 2rem;
    line-height: 4rem;
    background-color: rgba(255, 255, 255, .5);
    text-align: center;
    margin-top: 2rem;
  }
}
.pc {
    .ForgetPassMain {
        width: 800px;
        margin: 0 auto;
        margin-top: 100px;
        margin-bottom: 100px;
        .pageTitle, .ResetPwdTips{
          color: #cccccc;
          font-size: 16px;
          font-weight: 400;
        }
  }
}
.mobile {
    .ForgetPassMain {
      width: 90%;
      margin: 0 auto;
      margin-top: 2rem;
      margin-bottom: 2rem;
      .pageTitle, .ResetPwdTips{
        color: #cccccc;
        font-size: 1.2rem;
        font-weight: 400;
      }
}
}
.ResetPwdTips {
    line-height: 2rem;
    text-align: left;
    font-size: 1.2rem;
    margin-bottom: 10px;
}
.EmailSuccess{
  text-align: center;
}
.EmailSuccess p {
  line-height: 2rem;
  font-size: 1.4rem;
  color: #fff;
}
.EmailSuccess p a {
    line-height: 2rem;
    font-size: 1.4rem;
    color: crimson;
    text-decoration: underline;
    cursor: pointer;
    padding-bottom: 3rem;
    display: block;
    padding-top: 1rem;
}
.EmailSuccess p i {
  font-size: 60px;
  color: #8dc11f;
}
.Banner {
  width: 100%;
  height: 15rem;
}
.Banner img {
  width: 100%;
  height: 15rem;
}
/deep/ .el-form-item__error{
  color: crimson;
}
</style>
