<template>
    <div id="footer" :class="{'FontC':this.$Storage.get('locale') === 'C'}">
        <div class="footer-container">
            <div class="company-info">
                <!-- <div> -->
                    <div class="footer-nav">
                        <ul>
                            <li v-for="(item,index) in $store.state.footerMenus" :key="index" class="indexMeun">
                                    <router-link :to="{path: To(item)}" v-if="item.Type > 0">{{item.Name}}</router-link>
                                    <a href="javascript:;" @click="toUrl(item)" v-else>{{item.Name}}</a>
                                    <ul v-if="item.Childs && item.Childs.length"  class="submeunMain" :class="'sub'+index">
                                        <li v-for="(child,index2) in item.Childs" :key="index2">
                                            <router-link :to="To(child)">{{child.Name}}</router-link>
                                        </li>
                                    </ul>
                                </li>
                        </ul>
                    </div>
                    <!-- <li class="general-query">
                        <p class="title">{{$t('Display.GeneralQuery')}}</p>
                        <p>(852) 3105-0156</p>
                        <p>info@ptx.hk</p>
                    </li> -->
                    <!-- <li class="office-hours">
                        <p>{{$t('Display.OfficeHours')}}：</p>
                        <p>{{$t('Display.Hour0')}}{{$t('Display.Hour1')}}</p>
                        <p>{{$t('Display.Hour2')}}</p>
                        <p>{{$t('Display.Hour3')}}</p>
                    </li> -->
                    <!-- <li class="address">
                        <div class="footer-logo">
                            <img src="/static/Images/int-logo.png" />
                        </div>
                        <div class="addr">
                            <p>{{$t('DeliveryAddress.Address')}}：</p>
                            <p>{{$t('Display.AddrInfo')}}</p>
                        </div>
                    </li> -->
                <!-- </ul> -->
                <div class="footerlogo">
                    <router-link to='/'><img src="/static/Images/footerlogo.png" alt=""></router-link>
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
    InsCopyright: () => import('@/components/business/footer/InsCopyright.vue')
  }
})
export default class InsFooterLayout extends Vue {
  toUrl (n) {
    if (!n.IsNewWin && n.Url) {
      window.location.href = n.Url;
    } else if (n.IsNewWin && n.Url) {
      window.open(n.Url);
    }
  }

  To (n) {
    return n.Type === 1 ? '/cms/catDetail/' + n.Value.Id : n.Type === 2 ? '/cms/content/' + n.Value.Id : n.Type === 3 ? '/regnpay/form/' + n.Value.Id : '/';
  }
}
</script>

<style scoped lang="less">
#footer {
//   background-color: #535353;
}
.footer-container {
    .company-info {
        width: 1200px;
        min-width: 900px;
        margin: 0 auto;
        padding: 40px 0 0;
        .footer-nav {
                    width: 100%;
                    > ul {
                        display: flex;
                        justify-content: center;
                        > li {
                            margin-bottom: 24px;

                            a {
                                font-size: 20px;
                                color: #fff;
                                text-transform: uppercase;
                                font-family: 'PostNoBillsColombo-ExtraBold';
                                padding: 0 40px;
                            }

                            > a {
                                font-size: 20px;
                            }

                            &:last-child {
                                margin-bottom: 0;
                            }
                        }
                    }
                }
        .footerlogo{
            text-align: center;
        }
        > ul {
            display: flex;
            justify-content: center;
            > li {
                position: relative;
                color: #fff;
                font-size: 20px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                box-sizing: border-box;

                &:after {
                    content: "";
                    width: 1px;
                    height: 125px;
                    background-color: #fff;
                    position: absolute;
                    top: calc(50% - 62.5px);
                    right: 0;
                }

                &:last-child::after {
                    width: 0;
                }

                &.general-query {
                    align-items: center;
                    padding: 0 32px;

                    .title {
                        margin-bottom: 16px;
                    }

                    p {
                        margin-bottom: 5px;
                    }
                }

                &.office-hours {
                    padding: 0 40px;
                    p {
                        margin-bottom: 12px;

                        &:last-child {
                            margin-bottom: 0;
                        }
                    }
                }

                &.address {
                    padding-left: 62px;
                    .footer-logo {
                        background-color: #fff;
                        width: 100%;
                        height: 110px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .addr {
                        display: flex;
                        margin-top: 16px;
                        p {
                            line-height: 26px;
                            &:first-child {
                                flex-shrink: 0;
                            }
                        }
                    }
                }
            }
        }
    }
}
.FontC{
    .company-info .footer-nav > ul > li > a{
        font-family: 'SourceHanSans-Regular';
        font-size: 18px;
        padding: 0 60px;
    }
}
</style>
