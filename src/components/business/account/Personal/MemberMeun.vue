<template>
  <div class="MemberMeun">
     <accountHeader/>
      <!-- <div class="MeunMain">
          <ul>
              <li><a @click="goUrl('/account/PersonalInformation')" href="javascript:;">{{$t('MemberLogin.MyPersonalInformation')}}</a></li>
              <li><a @click="goUrl('/account/MyCPDRecords')" href="javascript:;">{{$t('MemberLogin.MyCPDRecords')}}</a></li>
              <li><a @click="goUrl('/account/MyApplications')" href="javascript:;">{{$t('MemberLogin.MyApplications')}}</a></li>
              <li><a @click="goUrl('/account/MyMailBox')" href="javascript:;">{{$t('MemberLogin.MyMailBox')}}</a></li>
              <li><a @click="goUrl('/account/ModifyPassword')" href="javascript:;">{{$t('MemberLogin.ModifyPassword')}}</a></li>
          </ul>
      </div> -->
      <div class="MemberInfoNavPC">
          <div class="navLi" @click="openlink('/account/memberInfo')">
            <div :class="activeClass == 1?'activeInfo':''" >
              <a>{{ $t("MemberInfo.MemberInfoTitle") }}</a>
            </div>
          </div>
          <div class="navLi" @click="openlink('/account/modifyPassword')">
            <div :class="activeClass == 2?'activeInfo':''" >
              <a>{{ $t("MemberInfo.ModifyPassword") }}</a>
            </div>
          </div>
      </div>
      <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    accountHeader: () => import('@/components/business/account/accountHeader.vue')
  }
})
export default class MemberMeun extends Vue {
  activeClass: any = 0;
  openlink (link) {
    this.$router.push({ path: link });
  }
  isActive () {
    var url = this.$route.path;
    var reg = RegExp(/memberInfo/);
    if (reg.test(url)) {
      this.activeClass = 1;
    } else if (url.indexOf('modifyPassword') !== -1) {
      this.activeClass = 2;
    }
    console.log(this.activeClass);
  }
  updated () {
    this.isActive();
  }
  mounted () {
    this.isActive();
  }
  // goUrl (val) {
  //   window.location.href = val;
  // }
}
</script>
<style lang="less" scoped>
.pc {
    .MemberMeun {
        width: 100%;
        // display: flex;
        // flex-wrap: wrap;
        .MeunMain {
          width: 600px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          padding-bottom: 30px;
          ul{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            margin-top: 30px;
            li{
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              a{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                height: 50px;
                color: #fff;
                background: @base_color;
                font-size: 20px;
                margin-bottom: 30px;
               transition: all .3s;
                &:hover {
                  background: #977c2b;
                }
              }
            }
          }
        }
    }
  .MemberInfoNavPC{
    display: flex;
      justify-content: center;
      margin-top: 30px;
    .navLi{
      display: flex;
      justify-content: center;
        a{
          color: #e6e6e6;
          font-size: 20px;
          padding: 15px 30px;
        }
    }
  }
  .MemberInfoNavPC .activeInfo a {
  color: #fff !important;
  background: #666666 !important;
}

}
.mobile {
    .MemberMeun {
        width: 100%;
        margin: 0 auto;
        .MeunMain {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          padding-bottom: 30px;
          ul{
            width: 90%;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            margin-top: 30px;
            li{
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              a{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                height: 50px;
                color: #fff;
                background: @base_color;
                font-size: 1.6rem;
                margin-bottom: 30px;
              }
            }
          }
        }
    }
}
</style>
