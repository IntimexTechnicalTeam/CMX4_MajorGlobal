<template>
  <div class="MyApplications">
     <accountHeader/>
     <div class="TopMeun">
         <div class="Inner">
             <a @click="goUrl('/account/PersonalInformation')" href="javascript:;"><img src="/static/images/pc/member04.png"></a>
             <a @click="goUrl('/account/MyCPDRecords')" href="javascript:;"><img src="/static/images/pc/member03.png"></a>
             <a @click="goUrl('/account/MyMailBox')" href="javascript:;"><img src="/static/images/pc/member06.png"></a>
         </div>
     </div>
     <p class="TopTitle"><span>{{$t('MemberLogin.MyApplications')}}</span></p>
     <div class="UpcomingCPDActivities">
         <div class="Membershiprenewal">
             <span class="T1">{{$t('MyApplicationsPaymentRecords.Membershipexpireson')}}:</span>
             <span class="T2">{{ExpiredDate}}</span>
             <!-- 1-待激活 2-正常狀態 3-已過期 -->
             <div class="Status">
                <!-- 1-待激活 -->
                <span class="underview" v-show="Status===1">{{StatusDesc}}</span>
                <!-- 2-正常狀態 -->
                <div class="NormalStatus" v-show="Status===2">
                    <span class="underview">{{StatusDesc}}</span>
                    <span class="T3" @click="RenewalApply" >{{$t('MyApplicationsPaymentRecords.Membershiprenewal')}}</span>
                </div>
                <!-- 3-已過期 -->
                <div class="Expired" v-show="Status===3">
                    <span class="underview" >{{StatusDesc}}</span>
                    <span class="T3" @click="RenewalApply">{{$t('MyApplicationsPaymentRecords.Membershiprenewal')}}</span>
                </div>
                <!-- 4-审批中 -->
                <span class="underview" v-show="Status===4">{{StatusDesc}}</span>
             </div>
         </div>
         <p class="UnitTitle">{{$t('MyApplicationsPaymentRecords.MyApplicationsPaymentRecords')}}</p>
        <el-table
            :data="PaymentRecords"
            style="width: 100%"
            :header-cell-style="{background: '#818acb',color:'#fff',border:'1px solid #fff',height:'60px',fontSize:'16px'}"
            :row-style="{height:'60px',fontSize:'16px'}"
            >
            <el-table-column
            prop="Title"
            :label="$t('MyApplicationsPaymentRecords.ActivityTitle')"
            align="center"
            >
            </el-table-column>
            <el-table-column
            prop="ReferenceNo"
            :label="$t('MyApplicationsPaymentRecords.Referenceno')"
            align="center"
            >
            </el-table-column>
            <el-table-column
            prop="PayDate"
            :label="$t('MyApplicationsPaymentRecords.Date')"
            align="center"
            >
            </el-table-column>
            <el-table-column
            prop="Amount"
            :label="$t('MyApplicationsPaymentRecords.Total')"
            align="center"
            >
            </el-table-column>
         <el-table-column
            prop="StatusDesc"
            :label="$t('MyApplicationsPaymentRecords.Status')"
            align="center"
            >
            </el-table-column>
        </el-table>
        <div class="pager" v-if="totalRecordA > pageSizeA">
            <InsPage
            :total="totalRecordA"
            v-model="currentPageA"
            :pageNum="pageSizeA"
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
export default class MyApplications extends Vue {
    currentPageA:number= 1; // 当前页
    pageSizeA: number= 8; // 每页显示条目个数
    totalRecordA:number= 0; // 总条目数
    Underreview:boolean = false; // 审核中开启
    Status:number = 0; // 会员状态值
    PaymentRecords:any[]=[];
    ExpiredDate:string='';
    StatusDesc:string='';
    mid:string ='';
    // 获取登录后的会员ID
    getProfile () {
      this.$Api.member.getProfile().then((result) => {
        this.GetApplyPaymentRecs(result.MemberId);
        this.mid = result.MemberId;
      });
    }
    goUrl (val) {
      window.location.href = val;
    }
    // 获取列表
    GetApplyPaymentRecs (val) {
      this.$Api.member.GetApplyPaymentRecs(val).then((result) => {
        this.PaymentRecords = result.PaymentRecords;
        this.ExpiredDate = result.ExpiredDate;
        this.StatusDesc = result.StatusDesc;
        this.Status = result.Status;
      });
    }
    // 会员续费API
    RenewalApply () {
      this.$Api.member.RenewalApply(this.mid).then((result) => {
        // 成功后再次刷新列表
        if (result.Succeeded) {
          this.GetApplyPaymentRecs(this.mid);
          //   this.Reload();
          this.getProfile();
        } else {
          this.$message({
            message: result.Message,
            type: 'error'
          });
        }
      });
    }
    mounted () {
      this.getProfile();
    }
}
</script>
<style lang="less" scoped>
.pc {
    .MyApplications {
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
            .Membershiprenewal {
                width: 100%;
                display: inline-block;
                text-align: left;
                font-size: 16px;
                margin-bottom: 20px;
                .Status {
                    display: inline-block;
                }
                .Expired {
                    display: inline-block;
                    .underview {
                        color: red;
                    }
                }
                .NormalStatus {
                    display: inline-block;
                    .underview {
                        color: rgb(129, 138, 203);
                    }
                }
                .underview {
                    margin-right: 10px;
                }
               .T1 {
                   color: #3e71a8;
                   font-size: 16px;
                   padding-right: 5px;
               }
              .T2 {
                   color: #3e71a8;
                   font-size: 20px;
                   padding-right: 5px;
               }
               .T3 {
                   background: @base_color;
                   color: #fff;
                    padding: 10px 20px;
                    transition: all .3s;
                    cursor: pointer;
                    margin-right: 10px;
                    &:hover {
                        background: #3567c6;
                    }
               }
            }
        }
    }
}
.mobile {
    .MyApplications {
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
            .Membershiprenewal {
                width: 100%;
                display: inline-block;
                text-align: left;
                font-size: 16px;
                margin-bottom: 20px;
                .Status {
                    display: flex;
                    flex-wrap: wrap;
                    width: 100%;
                    margin-top: 1rem;
                }
                .Expired {
                    display: inline-block;
                    .underview {
                        color: red;
                    }
                }
                .NormalStatus {
                    display: inline-block;
                    .underview {
                        color: rgb(129, 138, 203);
                    }
                }
                .underview {
                    margin-right: 10px;
                }
               .T1 {
                   color: #3e71a8;
                   font-size: 16px;
                   padding-right: 5px;
               }
              .T2 {
                   color: #3e71a8;
                   font-size: 20px;
                   padding-right: 5px;
               }
               .T3 {
                   background: @base_color;
                   color: #fff;
                    padding: 10px 20px;
                    transition: all .3s;
                    cursor: pointer;
                    margin-right: 10px;
                    &:hover {
                        background: #3567c6;
                    }
               }
            }
        }
    }
}
</style>
