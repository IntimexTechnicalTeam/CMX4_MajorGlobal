<template>
    <div id="footer">
        <div class="footer-container">
            <div class="company-info">
                <ul>
                    <li class="footer-nav">
                        <ul>
                            <li v-for="(n,index) in $store.state.footerMenus" :key="index">
                            <!-- <router-link :to="n.Type === 0 ? n.Url : n.Type === 1 ? '/cms/catDetail/' + n.Value.Id : n.Type === 2 ? '/CMS/content/' + n.Value.Id : n.Type === 3 ? '/RegNPay/Form/' + n.Value.Id : n.Type === 4 ? '/product/CatProduct?catId=' + n.Value.Id : n.Type === 5 ? '/product/search?key=&attr=' + n.Value.Id : '/product/search?key=&attr=' + n.ParentId + '&attrId=' + n.Value.Id">{{n.Name}}</router-link> -->
                            <a href="javascript:;" v-if="n.Type < 0">{{n.Name}}</a>
                            <a href="javascript:;" v-else-if="n.Type === 0" @click="toUrl(n)">{{n.Name}}</a>
                            <router-link :to="{path: To(n)}" v-else>{{n.Name}}</router-link>
                            <ul>
                                <li v-for="(c,index2) in n.Childs" :key="index2">
                                    <a href="javascript:;" v-if="c.Type < 0">{{c.Name}}</a>
                                    <a href="javascript:;" v-else-if="c.Type === 0" @click="toUrl(c)">{{c.Name}}</a>
                                    <router-link :to="{path: To(c)}" v-else>{{c.Name}}</router-link>
                                </li>
                            </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="general-query">
                        <p class="title">{{$t('Display.GeneralQuery')}}</p>
                        <p>(852) 3105-0156</p>
                        <p>info@ptx.hk</p>
                    </li>
                    <li class="office-hours">
                        <p>{{$t('Display.OfficeHours')}}：</p>
                        <p>{{$t('Display.Hour0')}}{{$t('Display.Hour1')}}</p>
                        <p>{{$t('Display.Hour2')}}</p>
                        <p>{{$t('Display.Hour3')}}</p>
                    </li>
                    <li class="address">
                        <div class="footer-logo">
                            <img src="/static/Images/int-logo.png" />
                        </div>
                        <div class="addr">
                            <p>{{$t('DeliveryAddress.Address')}}：</p>
                            <p>{{$t('Display.AddrInfo')}}</p>
                        </div>
                    </li>
                </ul>
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
  background-color: #535353;
}
.footer-container {
    .company-info {
        width: 63.5%;
        min-width: 900px;
        margin: 0 auto;
        padding: 70px 0 20px;
        > ul {
            display: flex;
            justify-content: center;
            > li {
                position: relative;
                color: #fff;
                font-size: 16.5px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                box-sizing: border-box;
                max-width: 34%;

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

                &.footer-nav {
                    width: 18%;
                    > ul {
                        > li {
                            margin-bottom: 16px;
                            a {
                                font-size: 16px;
                                color: #fff;
                                text-decoration: underline;
                            }

                            > a {
                                font-size: 18px;
                            }

                            &:last-child {
                                margin-bottom: 0;
                            }
                        }
                    }
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
</style>
