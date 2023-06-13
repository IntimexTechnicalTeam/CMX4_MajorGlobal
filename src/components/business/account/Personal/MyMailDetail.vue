<template>
  <div class="MailBox">
     <accountHeader/>
     <div class="TopMeun">
         <div class="Inner">
             <a @click="goUrl('/account/PersonalInformation')" href="javascript:;"><img src="/static/images/pc/member04.png"></a>
             <a @click="goUrl('/account/MyCPDRecords')" href="javascript:;"><img src="/static/images/pc/member03.png"></a>
             <a @click="goUrl('/account/MyApplications')" href="javascript:;"><img src="/static/images/pc/member05.png"></a>
         </div>
     </div>
     <p class="TopTitle"><span>{{$t('MemberLogin.MyMailBox')}}</span></p>
      <div class="ListMain">
          <p class="MailTitle">{{EmailDetail.Subject}}</p>
          <p class="MainDate">{{$t('Account.Time')}}：{{EmailDetail.SendDataStr}}</p>
          <p class="MainConter" v-html="EmailDetail.Content"></p>
      </div>
      <div class="BottomBtn">
          <router-link to="/account/MemberMeun">{{$t('MemberLogin.Back')}}</router-link>
      </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    accountHeader: () => import('@/components/business/account/accountHeader.vue'),
    InsPage: () =>
      import(
        /* webpackChunkName: 'product' */ '@/components/base/InsPage.vue'
      )
  }
})
export default class MyMailBox extends Vue {
  EmailDetail:string='';
  get id () {
    return this.$route.params.id;
  }
  goUrl (val) {
    window.location.href = val;
  }
  GetEmailById () {
    this.$Api.member.GetEmailById(this.id).then((result) => {
      this.EmailDetail = result.ReturnValue;
    });
  }
  mounted () {
    this.GetEmailById();
  }
}
</script>
<style lang="less" scoped>
.pc {
    .MailBox {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 50px;
        .TopMeun {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            background: #002b9b;
            padding-top: 5px;
            padding-bottom: 5px;
            .Inner {
                width: 1200px;
                margin: 0 auto;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: flex-start;
                a{
                    width: 50px;
                    margin-right: 30px;
                    img {
                        width: 100%;
                    }
                }
            }
        }
        .TopTitle {
            width: 1200px;
            margin: 0 auto;
            text-align: center;
            flex-wrap: wrap;
            padding-top: 50px;
            padding-bottom: 50px;
            span{
                font-size: 30px;
                color: #3870c3;
                border-bottom: 2px solid #3870c3;
                padding-bottom: 2px;
            }
        }
        .BottomBtn {
            width: 1200px;
            margin: 0 auto;
            flex-wrap: wrap;
            align-items: center;
            justify-content: flex-start;
            margin-top: 30px;
            a{
                background: @base_color;
                color: #fff;
                font-size: 20px;
                padding: 10px 20px;
                transition: all .3s;
                &:hover {
                    background: #b67d3a;
                }
            }
        }
        .ListMain {
          width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          padding-bottom: 30px;
          .MailTitle {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              text-align: center;
              justify-content: center;
              color: #000;
              font-size: 20px;
              margin-bottom: 10px;
          }
          .MainDate {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              text-align: center;
              justify-content: center;
              color: #333;
              font-size: 16px;
              margin-bottom: 30px;
          }
          .MainConter {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              text-align: center;
              justify-content: flex-start;
              color: #000;
              font-size: 20px;
          }
        }
    }
}
.mobile {
      .MailBox {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 50px;
        .TopMeun {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            background: #002b9b;
            padding-top: 5px;
            padding-bottom: 5px;
            .Inner {
                width: 90%;
                margin: 0 auto;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: flex-start;
                a{
                    width: 50px;
                    margin-right: 30px;
                    img {
                        width: 100%;
                    }
                }
            }
        }
        .TopTitle {
            width: 90%;
            margin: 0 auto;
            text-align: center;
            flex-wrap: wrap;
            padding-top: 50px;
            padding-bottom: 50px;
            span{
                font-size: 2.4rem;
                color: #3870c3;
                border-bottom: 2px solid #3870c3;
                padding-bottom: 2px;
            }
        }
        .BottomBtn {
            width: 90%;
            margin: 0 auto;
            flex-wrap: wrap;
            align-items: center;
            justify-content: flex-start;
            margin-top: 30px;
            a{
                background: @base_color;
                color: #fff;
                font-size: 1.6rem;
                padding: 10px 20px;
                transition: all .3s;
                &:hover {
                    background: #b67d3a;
                }
            }
        }
        .ListMain {
          width: 90%;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          padding-bottom: 30px;
            .MailTitle {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                text-align: center;
                justify-content: center;
                color: #000;
                font-size: 20px;
                margin-bottom: 10px;
            }
            .MainDate {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                text-align: center;
                justify-content: center;
                color: #333;
                font-size: 16px;
                margin-bottom: 30px;
            }
            .MainConter {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                text-align: center;
                justify-content: flex-start;
                color: #000;
                font-size: 20px;
                overflow: hidden;
                /deep/ table {
                    width: 100%!important;
                    td {
                        width: 100%!important;
                    }
                    img {
                        width: 100%;
                    }
                    span,strong,p{
                        white-space: normal;
                    }
                }
            }
        }
    }
}
</style>
