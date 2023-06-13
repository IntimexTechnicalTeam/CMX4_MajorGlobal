<template>
  <div id="container" class="ModifyPassword">
    <accountHeader/>
    <div class="MemberInfoMain">
        <!-- 修改密码切换 -->
          <div class="pwdFormMain">
            <InsForm ref="pwdForm" v-model="pwdForm">
              <div class="login-register-content">
                    <InsInput2 :placeholder="$t('Register.UserOldPassword')" width="100%" v-model="pwdForm.Password" type="logopassword"/>
                    <InsInput2 :placeholder="$t('Register.UserNewPassword')" width="100%" v-model="pwdForm.NewPassword" type="password"/>
                    <InsInput2 :placeholder="$t('Register.UserConfirmPassword')" width="100%" v-model="pwdForm.ConfirmNewPassword" type="confirmpassword" :rule="pwdForm.NewPassword" />
              </div>
              <div class="login-register-handle">
                <div class="btn-box">
                  <ElButton type="primary" @click="CheckPwdSubmit('pwdForm')" class="resetBtn">{{$t('DeliveryAddress.SaveBtn')}}</ElButton>
                </div>
              </div>
            </InsForm>
          </div>
    </div>
      <!-- <div class="BottomBtn">
        <router-link to="/account/memberInfo">{{$t('MemberLogin.Back')}}</router-link>
    </div> -->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import sdk from '@/sdk/InstoreSdk';
import InsInput2 from '@/components/base/InsInput2.vue';
import InsForm from '@/components/base/InsForm.vue';
@Component({
  components: {
    accountHeader: () => import('@/components/business/account/accountHeader.vue'),
    InsInput2,
    InsForm
  }
})
export default class InsModifyPassword extends Vue {
  validatePass2 (rule, value, callback) {
    if (value === '') {
      callback(new Error(this.$t('MemberInfo.EnterComfirmPwd') as string));
    } else if (value !== this.pwdForm.NewPassword) {
      callback(new Error(this.$t('MemberInfo.PwdNotCorrect') as string));
    } else {
      callback();
    }
  }

  pwdForm: any = {
    Password: '',
    NewPassword: '',
    ConfirmNewPassword: ''
  };
  get pwdRules () {
    var that = this;
    return {
      Password: [
        {
          required: true,
          message: this.$t('MemberInfo.EnterOldPwd'),
          trigger: 'blur'
        }
      ],
      NewPassword: [
        {
          required: true,
          message: '',
          trigger: 'blur',
          validator: that.validatePass2
        }
      ],
      ConfirmNewPassword: [
        {
          required: true,
          message: '',
          trigger: 'blur',
          validator: that.validatePass2
        }
      ]
    };
  }

  // 打开地址
  openlink (link) {
    this.$router.push({ path: link });
  }

  // 提交密码修改表单
  CheckPwdSubmit (pwdForm) {
    let that = this;
    this.$nextTick(function () {
      (that.$refs.pwdForm as InsForm).validate(valid => {
        if (valid) {
          sdk.api.member.updatePassword(this.pwdForm).then(
            function (response) {
              console.log(response.Message, '22222');
              that.$message({
                message: response.Message,
                type: 'success',
                customClass: 'messageBoxMobile'
              });

            // _this.$router.push('/account/registerSuccess');
            },
            function (response) {
              that.$message({
                message: response.Message,
                type: 'error',
                customClass: 'messageBoxMobile'
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
<style lang="less">
.messageBoxMobile{
      z-index: 100000!important;
}
</style>
<style lang="less" scoped>
.pc {
  .ModifyPassword {
    width: 100%;

    .MemberInfoMain{
      width: 800px;
      margin: 0 auto;
      padding-top: 30px;
      padding-bottom: 30px;
      /deep/ .input_main{
        background-color: #fff;
        .error{
          font-size: 14px;
        }
      }

    }
    .btn-box {
      text-align: center;
      width: 100%;
      display: inline-block;
      margin-top: 50px;
    }
    .resetBtn {
      background: @base_color;
      border: 0px;
      padding: 15px 40px;
      /deep/ span{
        font-size: 20px;
         text-transform: uppercase;
      }
    }
  }
  .accountBg {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      position: relative;
      align-items: center;
      justify-content: center;
      .memberCenterTitle {
        position: absolute;
        width: 90%;
        height: 80px;
        background: url('/static/images/pc/catBanner.png') no-repeat center center;
        background-size: 100% 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
        font-size: 2.5rem;
        color: #fff;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        font-family: 'PostNoBillsColombo-ExtraBold';
      }
      img {
        width: 100%;
      }
    }
}
.mobile {
  .ModifyPassword {
    width: 100%;
    margin: 0 auto;
    // padding-top: 30px;
    // padding-bottom: 30px;
    .MemberInfoMain{
      width: 90%;
      margin: 0 auto;
      padding-top: 30px;
      padding-bottom: 30px;
        /deep/ .input_main{
          background-color: #fff;
          .error{
            font-size: 14px;
          }
        }

      }
    .btn-box {
      text-align: center;
      width: 100%;
      display: inline-block;
      margin-top: 20px;
    }
    .resetBtn {
      background: @base_color;
      border: 0px;
      padding: 1rem 2rem;
      /deep/ span{
        font-size: 1.4rem;
        text-transform: uppercase;
      }
    }
  }
}
</style>
