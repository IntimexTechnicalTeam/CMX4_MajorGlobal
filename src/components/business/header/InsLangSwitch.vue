<template>
    <div class="langSwitch">
        <!-- <p @click="changeLang('S')" :class="{'active': $Storage.get('locale') === 'S'}">简</p> |
        <p @click="changeLang('C')" :class="{'active': $Storage.get('locale') === 'C'}">繁</p> |
        <p @click="changeLang('E')" :class="{'active': $Storage.get('locale') === 'E'}">Eng</p> -->

      <p @click="changeLang(lang.value)" v-for="(lang,index) in FrontE.langList" :key="index" :class="{'active': $Storage.get('locale') === lang.value}">{{lang.name}}</p>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class InsLangSwitch extends Vue {
  changeLang (lang) {
    this.$Api.member.setUILanguage(lang).then((result) => {
      this.$i18n.locale = lang;
      localStorage.setItem('locale', lang);

      window.location.reload();
    }).catch((error) => {
      console.log(error);
    });
  }
}
</script>
<style scoped lang="less">
.langSwitch {
    p {
      display: inline-block;
      padding: 0 10px;
      cursor: pointer;
      position: relative;

      &:not(:last-child) {
        &::after {
          position: absolute;
          content: '';
          top: 1px;
          right: 0;
          height: 100%;
          width: 2px;
          display: block;
          background-color: #fff;
        }
      }

      &:last-child {
        padding-right: 0;
      }
    }
}
</style>
