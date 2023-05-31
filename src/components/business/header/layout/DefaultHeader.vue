<template>
    <div class="header-box">
        <div class="flex-box">
        <ins-logo />
        <ins-menu v-if="!isMobile" />
        <!-- <ins-menu :layout="1" /> -->
        <img class="slide-menu" src="/static/Images/nav-icon.png" @click="showSlideMenu" v-if="isMobile" />
        </div>

        <ins-lang-switch v-if="!isMobile" />

        <!-- 搜索框开始 -->
        <div class="search-box">
          <input type="text" placeholder="Search ..." v-model="key" @keyup.enter="searchKeyChange" />
          <span class="searchBtn" @click="searchKeyChange"></span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

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
  }

  get menuShow () {
    return this.$store.state.isShowMenu;
  }

  get isMobile () {
    return this.$store.state.isMobile;
  }
}
</script>

<style scoped lang="less">
.pc {
    .header-box {
      background-color: @base_color;
      width: 86.5%;
      min-width:1100px;
      margin: 0 auto;
      position: relative;

      .flex-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 120px;
        padding: 0 1.6% 0 4.2%;
        box-sizing: border-box;

        .logo {
          width: 13%;
          min-width: 170px;
        }
      }

      /deep/ .langSwitch {
        position: absolute;
        font-size: 17px;
        color: #fff;
        top: 10px;
        right: 20px;
        p {
          &.active {
            color: #d5ee1f;
            font-weight: bold;
          }
        }
      }

      /deep/ .nav_menu {
        padding-top: 70px;
        max-width: 75%;
        >ul {
          >li {
            width: auto;
            padding: 18px 42px;

            a {
              color: #fff;
              font-size: 18px;
              padding: 0;
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

    .search-box {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      border-radius: 30px;
      overflow: hidden;
      margin: 0 8px;
      background: #fff;
      position: absolute;
      right: 15%;
      top: 10px;

      .searchBtn{
        width: 25px;
        height: 25px;
        display: inline-block;
        background: url(/static/Images/search.png) no-repeat center center;
        background-size: 40%;
        flex-shrink: 0;
        cursor: pointer;
        background-color: @base_color;
        border-radius: 50%;
        margin-left: 5px;
      }

      input {
        width: 142px;
        height: 23px;
        font-size: 9px;
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
        border-radius: 30px;
        border: 1px solid @base_color;

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

.mobile {
    .header-box {
      .flex-box {
        height: 7rem;
        background-color: @base_color;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1.5rem;

        .logo {
          width: 12rem;
        }

        .slide-menu {
          cursor: pointer;
        }
      }

      .search-box {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-radius: 30px;
        overflow: hidden;
        margin: 0 8px;
        background: #fff;

        .searchBtn{
          width: 25px;
          height: 25px;
          display: inline-block;
          background: url(/static/Images/search.png) no-repeat center center;
          background-size: 40%;
          flex-shrink: 0;
          cursor: pointer;
          background-color: @base_color;
          border-radius: 50%;
          margin-left: 5px;
        }

        input {
          width: 142px;
          height: 23px;
          font-size: 9px;
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
          border-radius: 30px;
          border: 1px solid @base_color;

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
</style>
