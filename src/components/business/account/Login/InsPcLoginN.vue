<template>
  <div class="insLogin_warrper">
    <div class="loginMain">
      <div class="insLogin_main">
          <div class="login">
              <div>
                <div class="login_title">{{$t('Login.doLogin')}}</div>
                <InsForm ref="loginForm" v-model="loginForm">
                    <InsInput2 :placeholder="$t('Register.UserEmail')" width="100%" v-model="loginForm.email" />
                    <InsInput2 :placeholder="$t('Register.UserRegPassword')" width="100%" v-model="loginForm.password" type="logopassword" />
                    <div class="remember_warpper">
                        <div class="remember">
                            <input
                                type="checkbox"
                                class="remember-btn"
                                name="remember-btn"
                                id="remember-btn"
                                value
                            />
                            <label for="remember-btn">{{$t('Login.RememberMe')}}</label>
                        </div>
                        <a class="forget" href="/account/forgetPassword">{{$t('Login.ForgetPwd')}}</a>
                    </div>
                </InsForm>
              </div>
              <InsButton :nama="$t('Login.doLogin')" @click="login"  style="margin-top: 2rem;"/>
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
    }
    toggleTab (index) {
      this.tabIndex = index;
    }
    get currentlang () {
      return this.$Storage.get('locale');
    }
    login () {
      let _this = this;
      (this.$refs.loginForm as InsForm).validate((valid) => {
        if (valid) {
          this.$Api.member.login(this.loginForm.email, this.loginForm.password, true).then(
            function (response) {
              _this.$store.dispatch('doLogin');
              return _this.$route.query && _this.$route.query.returnurl ? _this.$route.query.returnurl : undefined;
            },
            function (response) {
              _this.$message({
                message: response.Message,
                type: 'error'
              });
            }
          ).then(
            (url) => {
              this.$Api.member.getProfile().then(
                function (data) {
                  if (data) {
                    _this.loginForm = data;
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
                    type: 'error'
                  });
                }
              );
            }
          );
        } else {
          return false;
        }
      });
    }
    getShopCart () {
      this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
    }
    isIe = true;
    created () {
      if (window.navigator.userAgent.indexOf('Trident') !== -1) this.isIe = true;
      else this.isIe = false;
    }
    mounted () {
      window.dispatchEvent(new Event('faceBookLoad'));
    }
    fbLogin () {
      window['FB'].login(function (response) {
        window['checkLoginState']();
      }, { scope: 'email' });
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
</style>
