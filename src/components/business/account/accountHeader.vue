<template>
 <div class="accountHeader">
   <div class="accountBg" v-show="isMobile">
      <img src="/static/images/memberM.jpg">
      <p class="memberCenterTitle">{{$t('Account.MemberCenter')}}</p>
   </div>
    <div class="accountBg" v-show="!isMobile">
      <img src="/static/images/memberPC.jpg">
      <p class="memberCenterTitle">{{$t('Account.MemberCenter')}}</p>
   </div>
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
 </div>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class accountHeader extends Vue {
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
  get isMobile () {
    return this.$store.state.isMobile;
  }
  get currentlang () {
    return this.$Storage.get('locale');
  }
}
</script>

<style scoped lang="less">
.mobile {
  .accountHeader {
    width: 100%;
    // display: flex;
    // flex-wrap: wrap;
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
  .MemberInfoNavPC{
    display: flex;
      justify-content: center;
      margin-top: 30px;
    .navLi{
      display: block;
      width: 50%;
      text-align: center;
        a{
          color: #e6e6e6;
          font-size: 1.4rem;
          padding: 1rem 0;
          display: block;
        }
    }
  }
  .MemberInfoNavPC .activeInfo a {
    color: #fff !important;
    background: @base_color !important;
  }
}
.pc {
  .accountHeader {
    width: 100%;
    // display: flex;
    // flex-wrap: wrap;
    .accountBg {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      position: relative;
      align-items: center;
      justify-content: center;
      .memberCenterTitle {
        position: absolute;
        width: 1200px;
        height: 100px;
        background: url('/static/images/pc/catBanner.png') no-repeat center center;
        background-size: 100% 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
        font-size: 50px;
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
    background: @base_color !important;
  }
}
</style>
