<template>
  <div class="insLogin_warrper">
    <div class="loginMain">
      <div class="insLogin_main">
          <div class="register">
              <div>
                <div class="register_title">{{$t('Register.RegisterBtn')}}</div>
                <!-- <p class="ExistingMembersTips">{{$t('Register.ExistingMembers')}}</p> -->
                <InsForm ref="registerForm" v-model="registerForm">
                <div class="register_half">
                    <InsInput2 :placeholder="$t('Register.UserFirstName')" width="48%" v-model="registerForm.firstName" />
                    <InsInput2 :placeholder="$t('Register.UserLastName')" width="48%" v-model="registerForm.lastName"/>
                    <InsInput2 :placeholder="$t('Register.UserRegPassword')" width="100%" v-model="registerForm.password" type="password"/>
                    <InsInput2 :placeholder="$t('Register.UserConfirmPassword')" width="100%" v-model="registerForm.confirmPassword" type="confirmpassword" :rule="registerForm.password" />
                </div>
                <div class="register_half">
                     <InsInput2 :placeholder="$t('DeliveryAddress.Mobile')" width="100%" :must="false"  v-model="registerForm.Mobile"  type="phone"/>
                </div>
                <InsInput2 :placeholder="$t('Register.UserEmail')" v-model="registerForm.email" width="100%" type="email" />
                <!-- <InsInput2 :placeholder="$t('MembershipApplicationForm.MembershipNumber')" v-model="registerForm.ClientCode" width="100%" /> -->
                </InsForm>
                <!-- <div></div> -->
                <CheckboxGroup v-model="terms" style="margin: 30px 0 0 0">
                    <Checkbox name="type"></Checkbox><span><a style="font-size: 14px;padding-left: 14px;color: #666666;text-decoration: none;" href="javascript:;">{{$t('Register.RegisterAgree')}}</a></span>
                </CheckboxGroup>
              </div>
              <InsButton :nama="$t('Forgetpassword.NextStep')" @click="register" style="margin-top:.4rem;" />
          </div>
      </div>
  </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import InsInput2 from '@/components/base/InsInput2.vue';
import InsButton from '@/components/base/InsButton.vue';
import InsForm from '@/components/base/InsForm.vue';
import { Checkbox, CheckboxGroup } from 'element-ui';
@Component({ components: { InsInput2, InsButton, InsForm, Checkbox, CheckboxGroup } })
export default class InsLoginN extends Vue {
    private terms: boolean = true;
    tabIndex: number = 1;
    faceBookLogin:string='';
    lang:string[] = ['E', 'C', 'S'];
    private loginForm = {
      email: '',
      password: ''
    }
    private registerForm = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: '',
      Language: '',
      Mobile: ''
      // ClientCode: ''
    }
    toggleTab (index) {
      this.tabIndex = index;
    }
    get currentlang () {
      return this.$Storage.get('locale');
    }
    register () {
      let _this = this;
      let l = this.$Storage.get('locale');
      this.lang.forEach((element, index) => {
        if (l === element) this.registerForm.Language = '' + index;
      });
      (this.$refs.registerForm as InsForm).validate((valid) => {
        if (valid && this.terms) {
          this.$Api.member.register(this.registerForm).then((result) => {
            if (result.Succeeded) {
              this.$Api.member.login(this.registerForm.email, this.registerForm.password, true).then(
                function (response) {
                  _this.$store.dispatch('doLogin');
                  return _this.$route.query && _this.$route.query.returnurl ? _this.$route.query.returnurl : undefined;
                },
                function (response) {
                  _this.$message({
                    message: response.Message,
                    type: 'error',
                    customClass: 'messageBoxMobile'
                  });
                }
              ).then(
                (url) => {
                  this.$Api.member.getProfile().then(
                    function (data) {
                      if (data) {
                      // _this.registerForm = data;
                        _this.$store.dispatch('setUser', (data.FirstName + ' ' + data.LastName).toUpperCase());
                        _this.$i18n.locale = _this.lang[data.Language];
                        _this.$store.dispatch('setLang', _this.lang[data.Language]);
                        _this.$Storage.set('locale', _this.lang[data.Language]);
                        _this.$store.dispatch('setMemberInfo', data);
                        if (url) { window.location.href = (_this.$route.query.returnurl as string); } else { window.location.href = '/account/memberInfo'; }
                      } else {
                        _this.$store.dispatch('Logout');
                      }
                    },
                    function (data) {
                      _this.$message({
                        message: data,
                        type: 'error',
                        customClass: 'messageBoxMobile'
                      });
                    }
                  );
                }
              );
            } else {
              this.$message({
                message: result.Message,
                type: 'error',
                customClass: 'messageBoxMobile'
              });
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
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
.insLogin_warrper{
    width: 100%;
    background-size: cover;
    padding-top: 30px;
    .loginMain {
      width: 1200px;
      margin: 0 auto;
    }
    .insLogin_title{
        width: 1060px;
        margin: 0 auto;
        text-align: center;
        padding: 20px;
        box-sizing: border-box;
        .facebook_login{
          display: inline-block;
          background-color: #4267b2;
          color: white;
          height: 45px;
          width: 270px;
          line-height: 45px;
          cursor: pointer;
          border-radius: 3px;
          font-weight: bold;
          user-select: none;
          span{
            vertical-align: middle;
            font-size: 14px;
          }
          img{
            height: 24px;
            vertical-align: middle;
            padding-right: 16px;
          }
        }
    }
    .insLogin_divide{
        white-space: nowrap;
        width: 1060px;
        margin: 20px auto;
        .divide{
            display: inline-block;
            width: 500px;
            margin: 20px 0;
            border-top: solid 1px rgba(0, 0, 0, .2);
            vertical-align: bottom;
        }
        .divide_or{
            vertical-align: bottom;
            display: inline-block;
            line-height: 41px;
            margin: 0 20px;
            font-size: 20px;
            text-transform: uppercase;
        }
    }
    .insLogin_main{
        width: 1060px;
        box-sizing: border-box;
        margin: 0 auto;
        padding-top: 50px;
        padding-bottom: 100px;
        display: flex;
        .login_title,.register_title {
          font-size: 30px;
          color: #fff;
        }
        .login{
          width: 50%;
          margin: 0 auto;
            .remember_warpper{
                margin: 30px 0 0 0;
                display: flex;
                justify-content: space-between;
                .remember {
                  label {
                    color: #999999;
                    font-size: 16px;
                  }
                }
                .forget {
                    color: #999999;
                    font-size: 16px;
                    text-decoration: underline;
                  }
            }
        }
        .register{
            width: 50%;
            margin: 0 auto;
            .register_half{
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
            }
        }
    }
}
 /deep/ .in_btn {
   background: @base_color!important;
   border-radius: 3px;
   padding-top: 10px;
   padding-bottom: 10px;
   line-height: unset;
  span {
    font-size: 20px!important;
    text-transform: uppercase;
  }
}
/deep/ .input_warpper .input_main input {
    background: #fff;
    border: 1px solid #eee;
}
/deep/ .input_outer .error {
    font-size: 14px;
}
.ExistingMembersTips {
  margin-top: 10px;
  color: #fff;
  font-size: 16px;
}
</style>
