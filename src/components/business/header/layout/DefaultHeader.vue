<template>
    <div class="header-box" :class="{'FontC':currentlang =='C'}">
      <div v-if="!isMobile">
<div class="top fix">
        <div class="share">
            <ul>
              <li>
                <a href="#"><img src="/static/Images/icon-FB.png" alt=""></a>
              </li>
              <li>
                <a href="#"><img src="/static/Images/icon-IG.png" alt=""></a>
              </li>
            </ul>
        </div>
        <div class="right" v-click-outside="closeDialog">
          <!-- 搜索框开始 -->
          <div class="search-box">
            <input type="text" v-model="key" @keyup.enter="searchKeyChange" />
            <span class="searchBtn" @click="searchKeyChange"></span>
          </div>

          <!-- 會員功能 -->
          <div class="MemberLogin" v-show="!isLogin">
            <a href="/account/Register"><span class="img"><img src="/static/images/pcindex_07.png"></span><span class="Title" >{{$t('Register.BecomeMember')}}</span></a>
          </div>
          <div class="MemberLogin">
            <a href="javascript:;" @click.stop="menberCentral" :class="{'FontCn':currentlang!=='E'}"><span class="img"><img src="/static/images/pcindex_09.png"></span><span class="Title" v-if="!isLogin">{{$t('Login.MemberLogin')}}</span><span class="Title" v-else>{{UserName}}</span></a>
            <transition name="slide-fade">
              <div class="lang_flow" v-show="showMenberCentral" @click="memberCentral">
                <div @click="goUrl('/account/memberInfo')" class="ii">{{$t('MemberInfo.MemberInfoTitle')}}</div>
                <div @click="goUrl('/account/forgetPassword')"  class="ii">{{$t('Forgetpassword.ForgetPassword')}}</div>
                <div @click="logout()">{{$t('Account.Logout')}}</div>
              </div>
            </transition>
          </div>

          <ins-lang-switch />
        </div>
      </div>
      <div class="flex-box">
          <ins-logo />
          <ins-menu />
      </div>
      </div>
      <div v-else>
        <div class="flex-box">
          <div class="share">
            <ul>
                <li>
                  <a href="#"><img src="/static/Images/icon-FB.png" alt=""></a>
                </li>
                <li>
                  <a href="#"><img src="/static/Images/icon-IG.png" alt=""></a>
                </li>
              </ul>
          </div>
          <ins-logo />
          <div class="right">
            <div class="search_M" v-click-outside="closeDialog">
              <a href="javascript:;" @click="isShowSearch = !isShowSearch">
                <img class="search_icon" src="/static/Images/searchM.png" alt="">
              </a>
              <transition name="slide-fade">
                <!-- 搜索框开始 -->
              <div class="search-box" v-if="isShowSearch">
                <input type="text" v-model="key" @keyup.enter="searchKeyChange" />
                <span class="searchBtn" @click="searchKeyChange"></span>
              </div>
              </transition>

            </div>
            <img class="slide-menu" src="/static/Images/nav-icon.png" @click="showSlideMenu" v-if="isMobile" />
          </div>
        </div>
      </div>
    </div>

</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import sdk from '@/sdk/InstoreSdk';
import Cookie from 'js-cookie';
import storage from '@/sdk/common/Storage';
import Auth from '@/sdk/common/Auth';
@Component({
  components: {
    InsLogo: () => import('@/components/base/InsLogo.vue'),
    InsLangSwitch: () => import('@/components/business/header/InsLangSwitch.vue'),
    InsMenu: () => import('@/components/business/header/InsMenu.vue')
  }
})
export default class DefaultHeader extends Vue {
  @Prop() private showInFixed!: boolean;

  key: string = '';
  private showMenberCentral:boolean = false;
  UserName:string='';
  isShowSearch: boolean = false;

  closeDialog () {
    this.showMenberCentral = false;
  }
  goUrl (val) {
    window.location.href = val;
    this.showMenberCentral = false;
  }
  menberCentral () {
    if (!this.$Storage.get('isLogin')) {
      window.location.href = '/account/login';
    } else {
      this.showMenberCentral = !this.showMenberCentral;
    }
  }
  memberCentral (e) {
    let target = e.target as HTMLElement;
    if (target.className === 'ii' && target.dataset.to) {
      this.$router.push({
        path: target.dataset.to
      });
    }
  }
  showSlideMenu () {
    let isShow = !JSON.parse(JSON.stringify(this.menuShow));
    this.$store.dispatch('isShowMenu', isShow);
  }

  searchKeyChange () {
    // alert('search!');
    this.$store.dispatch('isShowMenu', false);
    this.$router.push({
      path: '/cms/search',
      name: 'search',
      params: {
        key: this.key
      }
    });
    this.key = '';
    this.isShowSearch = false;
  }
  logout () {
    let _this = this;
    sdk.api.member.logout().then(
      function (data) {
        if (data) _this.$message(_this.$t('Message.SucceedInOperating') as string);
        _this.$store.dispatch('Logout');
        window.location.href = '/';
        Cookie.remove('access_token');
        Auth.GetToken();
        _this.showMenberCentral = false;
      }
    );
  }
  getAccount () {
    let _this = this;
    sdk.api.member.getAccount().then(
      function (data) {
        if (data.Logined) {
          _this.$store.dispatch('setUser', (data.FirstName + ' ' + data.LastName).toUpperCase());
          _this.$store.dispatch('doLogin');
          _this.UserName = data.FirstName + ' ' + data.LastName;
        } else {
          _this.$store.dispatch('Logout', true);
        }
      },
      function (data) {
        _this.$message({
          message: data,
          type: 'error',
          customClass: 'messageboxNoraml'
        });
      }
    );
  }

  get menuShow () {
    return this.$store.state.isShowMenu;
  }
  get currentlang () {
    return this.$i18n.locale;
  }

  get isMobile () {
    return this.$store.state.isMobile;
  }
  get isLogin () {
    return this.$store.state.isLogin;
  }
  mounted () {
    this.getAccount();
  }
}
</script>

<style scoped lang="less">
.pc {
    .header-box {
      background-color: #fff;
      width: 1200px;
      min-width:1200px;
      margin: 0 auto;
      position: relative;
      .top{
        .share{
          float: left;
          ul{
            li{
              float: left;
              margin-right: 10px;
            }
          }
        }
      }
      .flex-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        // min-height: 120px;
        // padding: 0 1.6% 0 4.2%;
        box-sizing: border-box;

        .logo {
          width: 270px;
          margin-left: -30px;
          margin-bottom: -85px;
          z-index: 10;
        }
      }

      /deep/ .langSwitch {
        // position: absolute;
        // font-size: 17px;
        // color: #fff;
        // top: 10px;
        // right: 20px;
        display: flex;
        align-items: center;
        margin-left: 28px;
        p {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 3px 5px #a0a0a0;
          text-align: center;
          font-size: 16px;
          line-height: 40px;
          margin-left: 5px;
          &.active {
            color: #fff;
            background-color: #ff11af;
            font-weight: bold;
          }
        }
      }

      /deep/ .nav_menu {
        padding-top: 25px;
        // max-width: 75%;
        >ul {
          >li {
            width: auto;
            padding: 0 20px;
            padding-bottom: 10px;

            a {
              color: #000000;
              font-size: 22px;
              padding: 0;
              font-family: 'PostNoBillsColombo-ExtraBold';
              position: relative;
                  text-transform: uppercase;
            }
            &:hover{
              a{
                color: #de1199;
              }
              a::after{
                content: '';
                width: 100%;
                height: 5px;
                background-color: #de1199;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: -10px;
              }
            }
            > ul {
              left: calc(50% - 120px);
            }

            ul {
              width: 240px;
              border: 0;
              box-shadow: 0 0 10px 0 @base_color;
              li {
                > a {
                  padding: 15px;
                  color: #676767;
                  font-size: 16px;
                }

                &:hover {
                  background-color: @menu_hover;
                  > a {
                    color: #fff;
                  }
                }
              }
            }
          }
        }
      }
    }
    .FontC{
      /deep/ .nav_menu {
        > ul {
          > li{
            padding: 0 46px;
            padding-bottom: 13px;
            &:last-child{
              padding-right: 0;
            }
            a{
              font-family: 'SourceHanSans-Regular' !important;
              font-weight: bold;
              font-size: 20px;
              &::after{
                bottom: -13px !important;
              }
            }
          }
        }
      }
    }
    .right{
      float: right;
      margin-top: 10px;
      display: flex;
      align-items: center;
      .search-box {
      // box-sizing: border-box;
      // display: inline-flex;
      // align-items: center;
      border-radius: 3px;
      overflow: hidden;
      // margin: 0 8px;
      background: #fff;
      // position: absolute;
      // right: 15%;
      // top: 10px;
      width: 300px;
      border: 1px solid #e6e6e6;
      height: 40px;
      display: flex;
      align-items: center;
      margin-right: 20px;
      .searchBtn{
        width: 20px;
        height: 20px;
        display: inline-block;
        background: url(/static/Images/search.png) no-repeat center center;
        // background-size: contain;
        flex-shrink: 0;
        cursor: pointer;
        // background-color: @base_color;
        // border-radius: 50%;
        padding-left: 18px;
        padding-top: 5px;
        border-left: 1px solid #e6e6e6;
        // margin-top: 10px;
      }

      input {
        width: 258px;
        height: 38px;
        font-size: 16px;
        color: @font_color;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance:none;
        outline: none;
        border: 0;
        background-repeat: no-repeat;
        background-position-y: 4px;
        padding: 0 15px;
        box-sizing: border-box;
        background-color: transparent;
        // border-radius: 30px;
        // border: 1px solid @base_color;

        &:focus {
          border-color: @base_color;
        }
      }

      input::-webkit-input-placeholder{
        color: #666;
      }
      input::-moz-placeholder{   /* Mozilla Firefox 19+ */
        color: #666;
      }
      input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
        color: #666;
      }
      input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
        color: #666;
      }
    }
    .MemberLogin {
          // background-image: linear-gradient(#000099, #004c99);
          border: 1px solid #ff11af;
          border-radius: 3px;
          padding: 8px 28px;
          position: relative;
          margin-left: 10px;
        &::after{
            height: 40%;
            width: 0px;
            content: '';
            position: absolute;
            right: 0px;
            background: #fff!important;
            top: 30%;
          }
        .lang_flow{
          position: absolute;
          top: 50px;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          background: #FFF;
          z-index: 999;
          box-shadow: 0 0 3px #ccc;
          >div{
            color:#000;
            font-size: 16px;
            height: 3rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid #eee;
            padding-left: 10px;
            padding-right: 10px;
            cursor: pointer;
            &:first-child {
              border-top: 1px solid #eee;
            }
          }
        }
          a {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
          }
        .img {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 8px;
          img {
            width: 20px;
          }
        }
        .Title {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: #ff14b0;
          font-family: 'Poppins-Regular';
        }
      }
      li{
        width: calc(25% - 1px);
        /* float: left; */
        margin-bottom: 5px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        height: 48px;
        padding-top: 5px;
        padding-bottom: 5px;
        &::after{
          height: 40%;
          width: 2px;
          content: '';
          position: absolute;
          right: 0px;
          background: #ab8135;
          top: 30%;
        }
        &:nth-child(8){
        &::after{
            height: 40%;
            width: 2px;
            content: '';
            position: absolute;
            right: 0px;
            background: #fff!important;
            top: 30%;
          }
        }
        a{
          color: #02499b;
          font-size: 14px;
          text-align: center;
          padding-left: 8px;
          padding-right: 8px;
          display: block;
        }
      }
    }

}

.mobile {
    .header-box {
      .flex-box {
        height: 5rem;
        background-color: #fff;
        position: relative;
        // display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1.5rem;

        .logo {
          width: 14rem;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -3.5rem;
          z-index: 10000;
        }

        .slide-menu {
          cursor: pointer;
          width: 3rem;
          float: right;
        }
        .share{
          // margin-top: -2.5rem;
          float: left;
          ul{
            li{
              float: left;
              margin-right: 0.5rem;
            }
          }
        }
        .right{
          float: right;
          display: flex;
          justify-content: right;
          align-items: center;
          height: 5rem;
          .search_M{
            display: flex;
            align-items: center;
            margin-right: 2rem;
            a{
              display: flex;
              .search_icon{
                width: 2rem;
              }
            }
            .search-box {
              position: absolute;
              width: 90%;
              z-index: 2;
              padding: 0.8rem 1rem;
              box-sizing: border-box;
              display: flex;
              left: 50%;
              transform: translateX(-50%);
              top: 8.5rem;
              background-color: #fff;
              border-radius: 3px;

              .searchBtn{
                width: 2rem;
                height: 2rem;
                display: inline-block;
                background: url(/static/Images/searchM.png) no-repeat center center;
                background-size: contain;
                flex-shrink: 0;
                cursor: pointer;
                // background-color: @base_color;
                // border-radius: 50%;
                margin-left: 5px;
                padding-left: 1rem;
                border-left: 1px solid #e6e6e6;
              }

              input {
                width: 100%;
                // height: 23px;
                font-size: 1.2rem;
                color: #333;
                appearance: none;
                -webkit-appearance: none;
                -moz-appearance: none;
                -ms-appearance:none;
                outline: none;
                border: 0;
                background-repeat: no-repeat;
                background-position-y: 4px;
                // padding: 0 15px;
                box-sizing: border-box;
                background-color: transparent;
                // border-radius: 30px;
                // border: 1px solid @base_color;

                &:focus {
                  border-color: @base_color;
                }
              }

              input::-webkit-input-placeholder{
                color: #666;
              }
              input::-moz-placeholder{   /* Mozilla Firefox 19+ */
                color: #666;
              }
              input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
                color: #666;
              }
              input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
                color: #666;
              }
            }
          }
        }
      }

    }
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
