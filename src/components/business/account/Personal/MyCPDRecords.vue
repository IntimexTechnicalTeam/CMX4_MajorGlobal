<template>
  <div class="MyCPDRecords">
     <accountHeader/>
     <div class="TopMeun">
         <div class="Inner">
             <a @click="goUrl('/account/PersonalInformation')" href="javascript:;"><img src="/static/images/pc/member04.png"></a>
             <a @click="goUrl('/account/MyApplications')" href="javascript:;"><img src="/static/images/pc/member05.png"></a>
             <a @click="goUrl('/account/MyMailBox')" href="javascript:;"><img src="/static/images/pc/member06.png"></a>
         </div>
     </div>
     <p class="TopTitle"><span>{{$t('MemberLogin.MyCPDRecords')}}</span></p>
     <div class="UpcomingCPDActivities">
         <p class="UnitTitle">{{$t('MyCPDRecords.UpcomingCPDActivities')}}</p>
         <div class="ContentTableA">
           <ul class="Title">
              <li>{{$t('MyCPDRecords.ActivityDate')}}</li>
              <li>{{$t('MyCPDRecords.ActivityTitle')}}</li>
              <li>{{$t('MyCPDRecords.Category')}}</li>
              <li>{{$t('MyCPDRecords.Subject')}}</li>
              <li>{{$t('MyCPDRecords.ActivityMode')}}</li>
              <li>{{$t('MyCPDRecords.CPDPointsAccredited')}}</li>
              <li>{{$t('MyCPDRecords.MediumofInstruction')}}</li>
              <li>{{$t('Message.Apply')}}</li>
           </ul>
           <ul v-for="(v,index) in UpcomingCPDActivities" :key="index" class="ListData">
              <li><p>{{v.ContentDateTime}}</p></li>
               <li><p>{{v.newCmsControl.ActivityTitle}}</p></li>
               <li><p>{{v.newCmsControl.Category}}</p></li>
               <li><p>{{v.newCmsControl.Subject}}</p></li>
               <li><p>{{v.newCmsControl.ActivityMode}}</p></li>
               <li><p>{{v.newCmsControl.CPDPointsAccredited}}</p></li>
                <li> <p>{{v.newCmsControl.MediumofInstruction}}</p>
              </li>
              <li><router-link :to="v.Url">{{$t('Message.Apply')}}</router-link></li>
           </ul>
         </div>
        <div class="pager" v-if="totalRecordA > pageSizeA">
            <InsPage
            :total="totalRecordA"
            v-model="currentPageA"
            :pageNum="pageSizeA"
            ></InsPage>
        </div>
     </div>
        <div class="UpcomingCPDActivities">
         <p class="UnitTitle">{{$t('MyCPDRecords.CPDActivitiesRecord')}}</p>
         <div class="ContentTableB">
           <ul class="Title">
              <li>{{$t('MyCPDRecords.ActivityDate')}}</li>
              <li>{{$t('MyCPDRecords.ActivityTitle')}}</li>
              <li>{{$t('MyCPDRecords.Category')}}</li>
              <li>{{$t('MyCPDRecords.Subject')}}</li>
              <li>{{$t('MyCPDRecords.ActivityMode')}}</li>
              <li>{{$t('MyCPDRecords.CPDPointsAccredited')}}</li>
              <li>{{$t('MyCPDRecords.MediumofInstruction')}}</li>
           </ul>
           <ul v-for="(v,index) in CPDActivitiesRecord" :key="index" class="ListData">
              <li><p>{{v.ContentDateTime}}</p></li>
               <li><p>{{v.newCmsControl.ActivityTitle}}</p></li>
               <li><p>{{v.newCmsControl.Category}}</p></li>
               <li><p>{{v.newCmsControl.Subject}}</p></li>
               <li><p>{{v.newCmsControl.ActivityMode}}</p></li>
               <li><p>{{v.newCmsControl.CPDPointsAccredited}}</p></li>
               <li><p>{{v.newCmsControl.MediumofInstruction}}</p></li>
           </ul>
         </div>
        <div class="pager" v-if="totalRecordB > pageSizeB">
            <InsPage
            :total="totalRecordB"
            v-model="currentPageB"
            :pageNum="pageSizeB"
            ></InsPage>
        </div>
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
export default class MyCPDRecords extends Vue {
    currentPageA:number= 1; // 当前页
    pageSizeA: number= 5; // 每页显示条目个数
    totalRecordA:number= 0; // 总条目数
    currentPageB:number= 1; // 当前页
    pageSizeB: number= 5; // 每页显示条目个数
    CPDActivitiesRecord:any[]=[];
    UpcomingCPDActivities:any[]=[];
    totalRecordB:number= 0; // 总条目数
    result:object={};

    get isMobile () {
      return this.$store.state.isMobile;
    }
    goUrl (val) {
      window.location.href = val;
    }
    getUpcomingCPDActivities () {
      let _this = this;
      var params = {
        Key: 'CPD',
        Page: this.currentPageA,
        PageSize: this.pageSizeA,
        IsMobile: this.isMobile
      };

      this.$Api.cms.getContentsByCatKeyEx(params).then((result) => {
        this.UpcomingCPDActivities = result.Data;
        result.Data.forEach(function (i) {
          var newDate = new Date(i.ContentDateTime.replace(/-/g, '/'));
          i.ContentDateTime = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
          if (i.CmsControl && i.CmsControl.length) {
            var newCmsControl = {};
            i.CmsControl.forEach((v) => {
              _this.$set(newCmsControl, v.ControlCode, v.ControlValue);
            });
            _this.$set(i, 'newCmsControl', newCmsControl);
          }
        });
        this.totalRecordA = result.TotalRecord;
      });
    }
    getCPDActivitiesRecord () {
      let _this = this;
      var params = {
        Key: 'CPDActivitiesRecord',
        Page: this.currentPageB,
        PageSize: this.pageSizeB,
        IsMobile: this.isMobile
      };
      _this.$Api.cms.getContentsByCatKeyEx(params).then((result) => {
        _this.CPDActivitiesRecord = result.Data;
        result.Data.forEach(function (i) {
          var newDate = new Date(i.ContentDateTime.replace(/-/g, '/'));
          i.ContentDateTime = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
          if (i.CmsControl && i.CmsControl.length) {
            var newCmsControl = {};
            i.CmsControl.forEach((v) => {
              _this.$set(newCmsControl, v.ControlCode, v.ControlValue);
            });
            _this.$set(i, 'newCmsControl', newCmsControl);
          }
        });
        this.totalRecordB = result.TotalRecord;
      });
    }
    @Watch('currentPageA', { deep: true })
    onCurrentPageA () {
      this.getUpcomingCPDActivities();
    }
    @Watch('currentPageB', { deep: true })
    onCurrentPageB () {
      this.getCPDActivitiesRecord();
    }
    mounted () {
      this.getUpcomingCPDActivities();
      this.getCPDActivitiesRecord();
    }
}
</script>
<style lang="less" scoped>
.pc {
    .MyCPDRecords {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 50px;
        .LinkUrl {
            font-size: 16px;
            text-decoration: underline;
            color: #4e76be;
        }
        .UpcomingCPDActivities {
            width: 1200px;
            margin: 0 auto;
            margin-bottom: 50px;
            .ContentTableA {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              .Title {
                background: rgb(129, 138, 203);
                li{
                  border-right: 2px solid #fff;
                  color: #fff;
                  padding-top: 20px;
                  padding-bottom: 20px;
                  font-size: 16px;
                  text-align: center;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  &:last-child {
                    border-right: 0px;
                  }
                }
              }
              .ListData {
                li {
                  padding-top: 20px;
                  padding-bottom: 20px;
                  font-size: 16px;
                  color: #333;
                }
              }
              ul {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                border-bottom: 1px solid #eee;
                li {
                  display: flex;
                  justify-content: center;
                  text-align: center;
                  a {
                    color: @base_color;
                    &:hover {
                      text-decoration: underline;
                    }
                  }
                  p{
                    display: flex;
                    justify-content: center;
                  }
                  &:nth-child(1) {
                    width: calc(10% - 2px);
                  }
                  &:nth-child(2) {
                    width: calc(15% - 2px);
                  }
                  &:nth-child(3) {
                    width: calc(10% - 2px);
                  }
                  &:nth-child(4) {
                    width: calc(10% - 2px);
                  }
                  &:nth-child(5) {
                    width: calc(15% - 2px);
                  }
                  &:nth-child(6) {
                    width: calc(15% - 2px);
                  }
                  &:nth-child(7) {
                    width: calc(15% - 2px);
                  }
                 &:nth-child(8) {
                    width: calc(10% - 2px);
                  }
                }
              }
            }
            .ContentTableB {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              .Title {
                background: rgb(129, 138, 203);
                li{
                  border-right: 2px solid #fff;
                  color: #fff;
                  padding-top: 20px;
                  padding-bottom: 20px;
                  font-size: 16px;
                  text-align: center;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  &:last-child {
                    border-right: 0px;
                  }
                }
              }
              .ListData {
                li {
                  padding-top: 20px;
                  padding-bottom: 20px;
                  font-size: 16px;
                  color: #333;
                }
              }
              ul {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                border-bottom: 1px solid #eee;
                li {
                  display: flex;
                  justify-content: center;
                  text-align: center;
                  a {
                    color: @base_color;
                    &:hover {
                      text-decoration: underline;
                    }
                  }
                  p{
                    display: flex;
                    justify-content: center;
                  }
                  &:nth-child(1) {
                    width: calc(10% - 2px);
                  }
                  &:nth-child(2) {
                    width: calc(15% - 2px);
                  }
                  &:nth-child(3) {
                    width: calc(10% - 2px);
                  }
                  &:nth-child(4) {
                    width: calc(10% - 2px);
                  }
                  &:nth-child(5) {
                    width: calc(20% - 2px);
                  }
                  &:nth-child(6) {
                    width: calc(20% - 2px);
                  }
                  &:nth-child(7) {
                    width: calc(15% - 2px);
                  }
                }
              }
            }
        }
    }
}
.mobile {
    .MyCPDRecords {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 50px;
        .LinkUrl {
            font-size: 16px;
            text-decoration: underline;
            color: #4e76be;
        }
        .UpcomingCPDActivities {
            width: 90%;
            margin: 0 auto;
            margin-bottom: 50px;
            .ContentTableA {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              overflow-y: auto;
              .Title {
                background: rgb(129, 138, 203);
                li{
                  border-right: 2px solid #fff;
                  color: #fff;
                  padding-top: 10px;
                  padding-bottom: 10px;
                  font-size: 1.4rem;
                  text-align: center;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  &:last-child {
                    border-right: 0px;
                  }
                }
              }
              .ListData {
                li {
                  padding-top: 20px;
                  padding-bottom: 20px;
                  font-size: 16px;
                  color: #333;
                }
              }
              ul {
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #eee;
                li {
                  display: flex;
                  justify-content: center;
                  text-align: center;
                  a {
                    color: @base_color;
                    &:hover {
                      text-decoration: underline;
                    }
                  }
                  p{
                    display: flex;
                    justify-content: center;
                  }
                  &:nth-child(1) {
                    width: 100px;
                  }
                  &:nth-child(2) {
                    width: 150px;
                  }
                  &:nth-child(3) {
                    width: 100px;
                  }
                  &:nth-child(4) {
                    width: 100px;
                  }
                  &:nth-child(5) {
                    width: 150px;
                  }
                  &:nth-child(6) {
                    width: 150px;
                  }
                  &:nth-child(7) {
                    width: 150px;
                  }
                 &:nth-child(8) {
                    width: 100px;
                  }
                }
              }
            }
            .ContentTableB {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              overflow-y: auto;
              .Title {
                background: rgb(129, 138, 203);
                li{
                  border-right: 2px solid #fff;
                  color: #fff;
                  padding-top: 10px;
                  padding-bottom: 10px;
                  font-size: 1.4rem;
                  text-align: center;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  &:last-child {
                    border-right: 0px;
                  }
                }
              }
              .ListData {
                li {
                  padding-top: 20px;
                  padding-bottom: 20px;
                  font-size: 16px;
                  color: #333;
                }
              }
              ul {
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #eee;
                li {
                  display: flex;
                  justify-content: center;
                  text-align: center;
                  a {
                    color: @base_color;
                    &:hover {
                      text-decoration: underline;
                    }
                  }
                  p{
                    display: flex;
                    justify-content: center;
                  }
                  &:nth-child(1) {
                    width: 100px;
                  }
                  &:nth-child(2) {
                    width: 150px;
                  }
                  &:nth-child(3) {
                    width: 100px;
                  }
                  &:nth-child(4) {
                    width: 100px;
                  }
                  &:nth-child(5) {
                    width: 150px;
                  }
                  &:nth-child(6) {
                    width: 150px;
                  }
                  &:nth-child(7) {
                    width: 150px;
                  }
                }
              }
            }
        }
    }
}
</style>
