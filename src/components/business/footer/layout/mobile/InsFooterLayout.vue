<template>
  <div id="footer">
    <div class="footer-box">
      <div class="content-box">
        <div class="footer-menu">
          <Menu type="footer" :backColor="'#535353'" :textColor="'#fff'" :uniqueOpened="true" />
        </div>
        <div class="general-query">
          <p class="title">{{$t('Display.GeneralQuery')}}</p>
          <p>(852) 3105-0156</p>
          <p>info@ptx.hk</p>
        </div>
        <div class="office-hours">
          <p class="title">{{$t('Display.OfficeHours')}}：</p>
          <div>
            <p>{{$t('Display.Hour0')}}</p>
            <p>{{$t('Display.Hour1')}}{{$t('Display.Hour2')}}</p>
          </div>
          <p>{{$t('Display.Hour3')}}</p>
        </div>
        <div class="address">
          <div class="footer-logo">
              <img src="/static/Images/int-logo.png" />
          </div>
          <div class="addr">
              <p>{{$t('DeliveryAddress.Address')}}：</p>
              <p>{{$t('Display.AddrInfo')}}</p>
          </div>
        </div>
      </div>
      <ins-copyright />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    Menu: () => import('@/components/business/header/InsElMenu.vue'),
    InsCopyright: () => import('@/components/business/footer/InsCopyright.vue')
  }
})
export default class InsFooterLayout extends Vue {
  currentYear: number = 0;
  tabIndex: number = 1;
  showSub: boolean = false;

  show: boolean = true;

  toggleTab (index) {
    this.tabIndex = index;
  }

  created () {
    var date = new Date();
    this.currentYear = date.getFullYear();
  }

  mounted () {}
}
</script>

<style lang="less">
#footer {
  .footer-menu {
    padding: 3.8rem 0;

    >ul.el-menu {
      border: 0 !important;
      >li.el-menu-item {
        // margin-bottom: 1rem;
        height: auto;
        line-height: unset;
        padding: 0 !important;
        border-top: 1px solid #e5e5e5;
        > a {
          display: block;
          padding: 1.5rem 1.5rem;
          font-size: 1.5rem;
          text-align: center;
          color: #fff;
        }

        &:last-child {
          border-bottom: 1px solid #e5e5e5;
        }
      }

      >li.el-submenu{
        >.el-submenu__title {
          margin-bottom: 1rem;
          height: auto;
          line-height: unset;
          padding: 0 !important;
          >.name {
            display: block;
            padding: 0.8rem 1.5rem;
            font-size: 1.1rem;
          }
        }

        .el-menu {
          margin-bottom: 1rem;
          .el-submenu__title {
            padding: 0 !important;
            height: auto;
            line-height: unset;
            text-align: center;

            .name {
              display: block;
              padding: 0.7rem 1.5rem;
              font-size: 1rem;
            }
          }

          .el-menu-item {
            padding: 0 !important;
            height: auto;
            line-height: unset;
            text-align: center;
            .name {
              display: block;
              padding: 0.7rem 1.5rem;
              font-size: 1rem;
            }
          }
        }
      }
    }

    a {
      text-decoration: none;
    }

    .el-submenu__icon-arrow {
      font-size: 0;
      width: 1.5rem;
      height: 1.3rem;
      background-image: url(/static/Images/plus-arrow-down.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }

    .el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow {
      font-size: 0;
      width: 1.5rem;
      height: 1.3rem;
      background-image: url(/static/Images/minus-arrow-up.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      transform: unset;
    }
  }
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#footer {
  .footer-box {
    background-color: #535353;
    color: #fff;

    .content-box {
      width: 90%;
      margin: 0 auto;

      .title() {
        font-size: 1.2rem;
        display: block;
        margin-bottom: 0.5rem;
        margin-right: 0;
      }

      .box() {
        padding: 0 1rem;
      }

      .general-query {
        margin-bottom: 2rem;
        .box();
        p {
          font-size: 1.2rem;
          display: inline-block;
          margin-right: 2.5rem;

          &.title {
            .title();
          }
        }
      }

      .office-hours {
        margin-bottom: 4.2rem;
        .box();
        p {
          font-size: 1.2rem;

          &.title {
            .title();
          }
        }

        >div:first-of-type {
          display: flex;
          margin-bottom: 0.2rem;
          >p:first-of-type {
            flex-shrink: 0;
          }
        }
      }

      .address {
        .box();
        margin-bottom: 2.5rem;
        .footer-logo {
          background: #fff;
          text-align: center;
          height: 9rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .addr {
          display: flex;
          margin: 1rem 0;
          p {
            font-size: 1.2rem;
            &:first-child {
              flex-shrink: 0;
            }
          }
        }
      }
    }
  }
}
</style>
