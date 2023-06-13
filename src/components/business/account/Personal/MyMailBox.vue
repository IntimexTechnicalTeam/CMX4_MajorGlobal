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
          <p class="Total"><span>Total</span><span>{{MeunList.length}}</span></p>
          <ul>
              <li v-for="(v,index) in MeunList" :key="index"><router-link :to="'/account/MyMailBoxDetail/'+v.Id"><span>{{v.Subject}}</span><span>{{v.SendDataStr}}</span></router-link></li>
          </ul>
      </div>
        <div class="pager" v-if="totalRecord > pageSize">
            <InsPage
            :total="totalRecord"
            v-model="currentPage"
            :pageNum="pageSize"
            ></InsPage>
        </div>
      <div class="BottomBtn">
          <router-link to="/account/MemberMeun">{{$t('MemberLogin.Back')}}</router-link>
      </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import sdk from '@/sdk/InstoreSdk';
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
    currentPage:number= 1; // 当前页
    pageSize: number= 10; // 每页显示条目个数
    totalRecord:number= 0; // 总条目数
    MeunList:any[]=[];
    async getAccount () {
      let _this = this;
      await sdk.api.member.getAccount().then(
        function (data) {
          _this.GetEmailBySendTo(data.Email);
        });
    }
    goUrl (val) {
      window.location.href = val;
    }
    GetEmailBySendTo (Email) {
      var params = {
        SendTo: Email,
        PageInfo: {
          Page: this.currentPage,
          PageSize: this.pageSize,
          Offset: 0,
          SortName: '',
          SortOrder: ''
        },
        Reflesh: 3
      };
      this.$Api.member.GetEmailBySendTo(params).then((result) => {
        this.MeunList = result.Data;
      });
    }
    mounted () {
      this.getAccount();
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
        .ListMain {
          width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          padding-bottom: 30px;
          .Total {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              span{
                  &:nth-child(1){
                      font-size: 20px;
                      color: #3870c3;
                      margin-right: 20px;
                  }
                  &:nth-child(2) {
                      font-size: 30px;
                      color: #000;
                  }
              }
          }
          ul{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            margin-top: 30px;
            li{
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              border-bottom: 1px solid #bdd4e6;
              &:first-child{
                  border-top: 1px solid #bdd4e6;
              }
              a{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: space-between;
                height: 50px;
                transition: all .3s;
                span{
                    font-size: 20px;
                    color: #000000;
                    &:first-child{
                        width: 80%;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
              }
            }
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
          .Total {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              span{
                  &:nth-child(1){
                      font-size: 1.6rem;
                      color: #3870c3;
                      margin-right: 20px;
                  }
                  &:nth-child(2) {
                      font-size: 2rem;
                      color: #000;
                  }
              }
          }
          ul{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            margin-top: 30px;
            li{
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              border-bottom: 1px solid #bdd4e6;
              &:first-child{
                  border-top: 1px solid #bdd4e6;
              }
              a{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: space-between;
                height: 50px;
                transition: all .3s;
                span{
                    &:first-child{
                        width: 75%;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        font-size: 1.2rem;
                        color: #000000;
                    }
                    &:last-child {
                      width: 23%;
                      font-size: 1.2rem;
                      color: #000000;
                      text-align: center;
                    }
                }
              }
            }
          }
        }
    }
}
</style>
