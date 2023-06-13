<template>
  <div class="MyPersonalInformation">
     <accountHeader/>
     <div class="TopMeun">
         <div class="Inner">
             <a @click="goUrl('/account/MyCPDRecords')" href="javascript:;"><img src="/static/images/pc/member03.png"></a>
             <a @click="goUrl('/account/MyApplications')" href="javascript:;"><img src="/static/images/pc/member05.png"></a>
             <a @click="goUrl('/account/MyMailBox')" href="javascript:;"><img src="/static/images/pc/member06.png"></a>
         </div>
     </div>
     <p class="TopTitle"><span>{{$t('MemberLogin.MyPersonalInformation')}}</span></p>
     <div class="PersonalMain">
        <p class="UnitTitle">{{$t('MyPersonalInformation.Welcome')}}!<span>{{Form.LastName}}!</span></p>
        <div class="InnerTable">
            <el-form ref="Form" :model="Form" :rules="projectRules" :inline-message="true">
                <div class="w33">
                    <div class="perList"><span>{{$t('MyPersonalInformation.LastName')}}:</span><span>{{Form.LastName}}</span></div>
                    <div class="perList"><span>{{$t('MyPersonalInformation.FirstName')}}:</span><span>{{Form.FirstName}}</span></div>
                    <div class="perList"><span>{{$t('MyPersonalInformation.ChineseName')}}:</span><span>{{Form.NameInChi}}</span></div>
                </div>
                <div class="w73">
                    <div class="perList"><span>{{$t('MyPersonalInformation.ClassofMembership')}}:</span><span>{{Form.MbrsClassName}}</span></div>
                    <div class="perList"><span>{{$t('MyPersonalInformation.MembershipNumber')}}:</span><span>{{Form.MbrsNo}}</span></div>
                </div>
                 <div class="w100">
                    <div class="perList">
                        <em>{{$t('MyPersonalInformation.Divisions')}}:</em>
                        <div class="InnerSpan">
                            <span v-for="(v,index) in Form.Divisions" :key="index">{{v}}&nbsp;&nbsp;</span>
                        </div>
                        </div>
                </div>
                <div class="w100">
                    <div class="perList">
                          <el-form-item :label="$t('MyPersonalInformation.ContactAddress')+':'"  class="inputText" prop="ContactAddress">
                               <el-input type="text" v-model="Form.ContactAddress" :disabled="DisableEdit"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="w100">
                    <div class="perList">
                          <el-form-item :label="$t('MyPersonalInformation.CurrentCompanyNameandAddress')+':'"  class="inputTextE" prop="CurrentCompanyDtl">
                               <el-input type="textarea" resize="none" v-model="Form.CurrentCompanyDtl" :disabled="DisableEdit"></el-input>
                        </el-form-item>
                    </div>
                </div>
                  <div class="w33">
                    <div class="perList">
                        <el-form-item :label="$t('MyPersonalInformation.OfficeTelNo')+':'" prop="OfficeTelNo">
                               <el-input type="text" v-model="Form.OfficeTelNo" :disabled="DisableEdit"></el-input>
                        </el-form-item>
                    </div>
                    <div class="perList">
                        <el-form-item :label="$t('MyPersonalInformation.CompanyEmail')+':'" prop="CompanyEmail">
                               <el-input type="text" v-model="Form.CompanyEmail" :disabled="DisableEdit"></el-input>
                        </el-form-item>
                    </div>
                    <div class="perList">
                        <el-form-item :label="$t('MyPersonalInformation.Fax')+':'" prop="OfficeFaxNo">
                               <el-input type="text" v-model="Form.OfficeFaxNo" :disabled="DisableEdit"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="w100">
                    <div class="perList">
                          <el-form-item :label="$t('MyPersonalInformation.HomeAddress')+':'"  class="inputText" prop="HomeAddress">
                               <el-input type="text" v-model="Form.HomeAddress" :disabled="DisableEdit"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="w55">
                    <div class="perList">
                        <el-form-item :label="$t('MyPersonalInformation.HomeTelNo')+':'"  prop="HomeTelNo">
                               <el-input type="text" v-model="Form.HomeTelNo" :disabled="DisableEdit"></el-input>
                        </el-form-item>
                    </div>
                    <div class="perList">
                        <el-form-item :label="$t('MyPersonalInformation.PersonalEmail')+':'" prop="PersonalEmail">
                               <el-input type="text" v-model="Form.PersonalEmail" :disabled="DisableEdit"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="w55">
                    <div class="perList">
                        <el-form-item :label="$t('MyPersonalInformation.MobileNoHK')+':'" prop="MobileNo">
                               <el-input type="text" v-model="Form.MobileNo" :disabled="DisableEdit"></el-input>
                        </el-form-item>
                    </div>
                    <div class="perList">
                        <el-form-item :label="$t('MyPersonalInformation.MainContactNo')+':'" prop="MainContactNo">
                               <el-input type="text" v-model="Form.MainContactNo" :disabled="DisableEdit"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="w100">
                    <p class="receiveInfo">{{$t('MyPersonalInformation.receiveInfo')}}</p>
                </div>
                <div class="w22">
                     <el-form-item  prop="IsRecEmail">
                        <el-checkbox-group v-model="Form.IsRecEmail">
                            <el-checkbox   :false-label="0" :true-label="1"   :disabled="DisableEdit">{{$t('MyPersonalInformation.Email')}}</el-checkbox >
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item  prop="IsRecFax">
                        <el-checkbox-group  v-model="Form.IsRecFax">
                            <el-checkbox :false-label="0" :true-label="1"   :disabled="DisableEdit">{{$t('MyPersonalInformation.Fax')}}</el-checkbox >
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item  prop="IsRecSMS">
                        <el-checkbox-group  v-model="Form.IsRecSMS">
                            <el-checkbox  :false-label="0" :true-label="1"  :disabled="DisableEdit">{{$t('MyPersonalInformation.SMSMessage')}}</el-checkbox >
                        </el-checkbox-group>
                    </el-form-item>
                      <el-form-item  prop="IsRecMail">
                        <el-checkbox-group v-model="Form.IsRecMail">
                            <el-checkbox :false-label="0" :true-label="1"   :disabled="DisableEdit">{{$t('MyPersonalInformation.Post')}}</el-checkbox >
                        </el-checkbox-group>
                    </el-form-item>
                </div>
            </el-form>
        </div>
     </div>
     <div class="BottomBtn">
          <a href="javascript:;" v-show="DisableEdit" @click="Update()">{{$t('MemberLogin.Update')}}</a>
          <a href="javascript:;"  v-show="!DisableEdit" @click="SaveForm()">{{$t('MembersList.Submit')}}</a>
          <router-link to="/account/MemberMeun">{{$t('MemberLogin.Back')}}</router-link>
      </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Cookie from 'js-cookie';
import i18n from '@/lang';
@Component({
  components: {
    accountHeader: () => import('@/components/business/account/accountHeader.vue'),
    InsPage: () =>
      import(
        /* webpackChunkName: 'product' */ '@/components/base/InsPage.vue'
      )
  }
})
export default class PersonalInformation extends Vue {
    DisableEdit:boolean = true;
    mid:string=''
    MemberShipId:string='';
    Form:any = {
      MbrsNo: '', // 會籍編號
      MbrsClassName: '', // 會員類別名稱
      Divisions: [], // 專業組別
      FirstName: '', // 名字
      LastName: '', // 姓氏
      NameInChi: '', // 中文姓名
      CurrentCompanyDtl: '', // 現職公司名稱及地址
      ContactAddress: '', // 聯繫地址
      OfficeFaxNo: '', // 传真
      OfficeTelNo: '', // 公司電話
      CompanyEmail: '', // 公司電郵地址
      HomeAddress: '', // 住宅地址
      HomeTelNo: '', // 住宅電話
      PersonalEmail: '', // 個人電郵地址
      MobileNo: '', // 流動電話 (香港)
      MainContactNo: '', // 主要聯絡電話號碼
      IsRecSMS: 0, // 是否接收SMS短訊
      IsRecFax: 0, // 是否接收傳真
      IsRecEmail: 1, // 是否接收電郵
      IsRecMail: 0 // 是否接收郵件
    };
    goUrl (val) {
      window.location.href = val;
    }
    checkPhone = (rule, value, callback) => {
      /* eslint-disable */
        var mobileReg = /^(\+)?(\d{0,4}\-?)?\d{7,11}$/;
        if (!value) {
        return callback(new Error(i18n.t('BoAForm.Required') as string));
        }
        setTimeout(() => {
        if (mobileReg.test(value)) {
            callback();
        } else {
            return callback(new Error(i18n.t('BoAForm.CorrectPhone') as string));
        }
        }, 100);
    };
    checkEmail = (rule, value, callback) => {
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (!value) {
            return callback(new Error(i18n.t('BoAForm.Required') as string));
        }
        setTimeout(() => {
            if (mailReg.test(value)) {
            callback();
            } else {
            callback(new Error(i18n.t('BoAForm.Correctemail') as string));
            }
        }, 100);
    };
  projectRules: object={
    ContactAddress: [
      { required: true, message: i18n.t('BoAForm.Required'), trigger: 'change' }
    ],
    CurrentCompanyDtl: [
      { required: true, message: i18n.t('BoAForm.Required'), trigger: 'change' }
    ],
    CompanyEmail: [
      { required: true, message: i18n.t('BoAForm.Required'), trigger: 'change' },
      { type: 'email', message: i18n.t('BoAForm.CorrectEmail'), trigger: ['change']  }
    ],
    OfficeFaxNo: [
      { required: true, message: i18n.t('BoAForm.Required'), trigger: 'change' }
    ],
    HomeAddress: [
      { required: true, message: i18n.t('BoAForm.Required'), trigger: 'change' }
    ],
    PersonalEmail: [
      { required: true, message: i18n.t('BoAForm.Required'), trigger: 'change' },
      { type: 'email', message: i18n.t('BoAForm.CorrectEmail'), trigger: ['change']  }
    ],
    MobileNo: [
      { required: true, message: i18n.t('BoAForm.Required'), trigger: 'change' },
      { validator: this.checkPhone, message: i18n.t('BoAForm.CorrectPhone'), trigger: ['change'] }
    ],
    MainContactNo: [
      { required: true, message: i18n.t('BoAForm.Required'), trigger: 'change' },
      { validator: this.checkPhone, message: i18n.t('BoAForm.CorrectPhone'), trigger: ['change'] }
    ],
     OfficeTelNo: [
      { required: true, message: i18n.t('BoAForm.Required'), trigger: 'change' },
      { validator: this.checkPhone, message: i18n.t('BoAForm.CorrectPhone'), trigger: ['change'] }
    ],
    HomeTelNo: [
      { required: true, message: i18n.t('BoAForm.Required'), trigger: 'change' },
      { validator: this.checkPhone, message: i18n.t('BoAForm.CorrectPhone'), trigger: ['change'] }
    ]
  };
    // 获取登录后的会员ID
    getProfile () {
        this.$Api.member.getProfile().then((result) => {
            this.$nextTick(()=>{
                this.mid = result.MemberId;
            });
        });
    }
    // 獲取指定會員的會籍資料
    GetByMemberId () {
        console.log(this.mid,'this.midthis.mid')
      if(this.mid){
        this.$Api.member.GetByMemberId(this.mid).then((result) => {
            console.log(result,'dddddd');
            this.MemberShipId = result.Id;
            // 会员资料赋值
            this.Form = {
               MbrsNo: result.MbrsNo,
               MbrsClassName:result.MbrsClassName,
               Divisions:result.Divisions,
               FirstName: result.FirstName,
               LastName:result.LastName,
               NameInChi:result.NameInChi,
               CurrentCompanyDtl: result.CurrentCompanyDtl,
               ContactAddress:result.ContactAddress,
               OfficeFaxNo:result.OfficeFaxNo,
               OfficeTelNo:result.OfficeTelNo,
               CompanyEmail:result.CompanyEmail,
               HomeAddress: result.HomeAddress,
               HomeTelNo:result.HomeTelNo,
               PersonalEmail:result.PersonalEmail,
               MobileNo:result.MobileNo,
               MainContactNo: result.MainContactNo,
               IsRecSMS:result.IsRecSMS,
               IsRecFax:result.IsRecFax,
               IsRecEmail:result.IsRecEmail,
               IsRecMail:result.IsRecMail
            }
        });
      }
    }
    Update () {
        // 取消表单组件的Disable状态
        this.DisableEdit = false;
    }
    SaveForm () {
    (this.$refs['Form'] as any).validate((valid) => {
        if (valid) {
            this.DisableEdit = true;
            var params = {
                Id:this.MemberShipId , //會籍ID
                FirstName:this.Form.FirstName,
                LastName:this.Form.LastName,
                NameInChi:this.Form.FirstName,
                ContactAddress: this.Form.ContactAddress,
                CurrentCompanyDtl: this.Form.CurrentCompanyDtl,
                OfficeTelNo: this.Form.OfficeTelNo,
                OfficeFaxNo: this.Form.OfficeFaxNo,
                CompanyEmail: this.Form.CompanyEmail,
                HomeAddress: this.Form.HomeAddress,
                HomeTelNo: this.Form.HomeTelNo,
                PersonalEmail: this.Form.PersonalEmail,
                MobileNo: this.Form.MobileNo,
                MainContactNo: this.Form.MainContactNo,
                IsRecSMS: this.Form.IsRecSMS,
                IsRecFax:this.Form.IsRecFax,
                IsRecEmail: this.Form.IsRecEmail,
                IsRecMail:this.Form.IsRecMail

            }
            this.$Api.member.SaveMembership(params).then((result) => {
                if (result.Succeeded) {
                    this.$message({
                        message: this.$t('BoAForm.Savedsuccessfully') as string,
                        type: 'success'
                    });
                }
            });
            // 调用保存表单API
        } else {
            this.$nextTick(() => {
                let isError = document.getElementsByClassName('el-form-item__error--inline')
                isError[0].scrollIntoView({
                // 滚动到指定节点
                // 值有start,center,end，nearest，当前显示在视图区域中间
                block: 'center',
                // 值有auto、instant,smooth，缓动动画（当前是慢速的）
                behavior: 'smooth',
                })
            });
        }
       });
    }
    mounted() {
        this.getProfile();
        setTimeout(()=>{
            this.GetByMemberId();
        },300)
    }
  @Watch('$route', { deep: true })
  onRouteChange (n, o) {
    this.getProfile();
    setTimeout(()=>{
        this.GetByMemberId();
    },300)
  }
}
</script>
<style lang="less" scoped>
.pc {
    .MyPersonalInformation {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 50px;
        /deep/ .el-form-item__error--inline {
            position: ABSOLUTE;
            bottom: -15px;
            left: 0;
            display: inline-block;
            margin-left: 0px;
            z-index: 99;
            min-width: 100px;
        }
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
        .PersonalMain {
            width: 1200px;
            margin: 0 auto;
            text-align: center;
            flex-wrap: wrap;
            /deep/ .el-form-item {
                display: flex;
                align-items: center;
                width: 100%;
                margin-bottom: 0px;
                .el-input.is-disabled .el-input__inner {
                    background: #fff;
                    border: 0px;
                }
                .el-textarea.is-disabled .el-textarea__inner {
                    background: #fff;
                    border: 0px;
                }
                .el-input.is-active .el-input__inner, .el-input__inner:focus {
                    border-color:#010101;
                }
                .el-textarea__inner:focus {
                    border-color:#010101;
                }
                .el-form-item__label{
                    color: #010101;
                    margin-right: 10px;
                    font-size: 18px;
                }
                .el-input__inner {
                    height: 30px;
                    line-height: 30px;
                    background: #eee;
                    color: #3a3a3a;
                    font-size: 18px;
                }
                .el-textarea__inner {
                     height: 60px;
                    line-height: 30px;
                    background: #eee;
                    color: #3a3a3a;
                    font-size: 18px;
                    font-family: arial;
                }
            }
            .InnerTable {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                .el-form {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                }
                .w22 {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    margin-bottom: 100px;
                    justify-content: space-between;
                    .el-form-item {
                        width: 25%;
                    }
                    .el-checkbox-group {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        /deep/ .el-checkbox {
                            .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                                background: @base_color;
                            }
                            .el-checkbox__input.is-checked+.el-checkbox__label {
                                color: @base_color;
                            }
                            .el-checkbox__inner::after {
                                border: 0px;
                            }
                            .el-checkbox__label {
                                    font-size: 18px;
                            }
                            .el-checkbox__inner {
                                width: 20px;
                                height: 20px;
                                border:1px solid @base_color;
                            }
                        }
                    }
                }
                .w100 {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 50px;
                    .receiveInfo {
                        font-size: 18px;
                        color: @base_color;
                    }
                    .perList {
                        display: flex;
                        align-items: center;
                        width: 100%;
                        justify-content: flex-end;
                        em {
                            font-style: normal;
                            width: calc(16% - 10px);
                            text-align: left;
                            color: #010101;
                            margin-right: 10px;
                            font-size: 18px;
                        }
                        .InnerSpan {
                            width: 84%;
                            text-align:left;
                            span {
                                color: #5d5d5d;
                                margin-right: 10px;
                                font-size: 18px;
                            }
                        }
                        .inputText {
                                /deep/ .el-input__inner {
                                    width: 100%;
                                }
                                /deep/ .el-form-item__label {
                                    width: calc(16% - 10px);
                                    text-align: left;
                                }
                                /deep/ .el-form-item__content {
                                    width: 84%;
                                }
                            }
                            .inputTextE {
                                /deep/ .el-input__inner {
                                    width: 100%;
                                }
                                /deep/ .el-form-item__label {
                                    width: calc(30% - 10px);
                                    text-align: left;
                                }
                                /deep/ .el-form-item__content {
                                    width: 70%;
                                }
                            }
                    }
                }
                .w55 {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 50px;
                    .perList {
                        width: 50%;
                        display: flex;
                        align-items: center;
                        /deep/ .el-form-item {
                            .el-form-item__content {
                                width: 50%;
                            }
                        }
                        &:nth-child(2) {
                            .el-form-item {
                                display: flex;
                                justify-content: flex-end;
                            }
                        }
                        span{
                            font-size: 18px;
                            color: #5d5d5d;
                            &:nth-child(1){
                                color: #010101!important;
                                margin-right: 10px;
                            }
                        }
                    }
                }
                .w33 {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 50px;
                    .perList {
                        display: flex;
                        align-items: center;
                        width: 33.3%;
                        /deep/ .el-form-item {
                            .el-form-item__content {
                                width: 50%;
                            }
                        }
                        &:nth-child(2) {
                            .el-form-item {
                                display: flex;
                                justify-content: center;
                            }
                        }
                        &:nth-child(3) {
                            .el-form-item {
                                display: flex;
                                justify-content: flex-end;
                            }
                        }
                        span{
                            font-size: 18px;
                            color: #5d5d5d;
                            &:nth-child(1){
                                color: #010101!important;
                                margin-right: 10px;
                            }
                        }
                    }
                }
                .w73 {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 50px;
                    .perList {
                        display: flex;
                        align-items: center;
                        /deep/ .el-form-item {
                            .el-form-item__content {
                                width: 50%;
                            }
                        }
                        &:nth-child(1) {
                            width: 66.6%;
                            .el-form-item {
                                display: flex;
                                justify-content: center;
                            }
                        }
                        &:nth-child(2) {
                            width: 33.3%;
                            .el-form-item {
                                display: flex;
                                justify-content: flex-end;
                            }
                        }
                        span{
                            font-size: 18px;
                            color: #5d5d5d;
                            &:nth-child(1){
                                color: #010101!important;
                                margin-right: 10px;
                            }
                        }
                    }
                }
            }
            .UnitTitle {
                span{
                    margin-left: 10px;
                    display: inline-block;
                    margin-bottom: 30px!important;
                }
            }
        }
    }
}
.mobile {
      .MyPersonalInformation {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 50px;
        /deep/ .el-form-item__error--inline {
            position: ABSOLUTE;
            bottom: -1.2rem;
            left: 0;
            display: inline-block;
            margin-left: 0px;
            z-index: 99;
            min-width: 100px;
        }
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
                font-size: 1.8rem;
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
        .PersonalMain {
            width: 90%;
            margin: 0 auto;
            text-align: center;
            flex-wrap: wrap;
            /deep/ .el-form-item {
                display: inline-block;
                width: 100%;
                margin-bottom: 0px;
                .el-input.is-disabled .el-input__inner {
                    background: #fff;
                    border: 0px;
                }
                .el-textarea.is-disabled .el-textarea__inner {
                    background: #fff;
                    border: 0px;
                }
                .el-input.is-active .el-input__inner, .el-input__inner:focus {
                    border-color:#010101;
                }
                .el-textarea__inner:focus {
                    border-color:#010101;
                }
                .el-form-item__label{
                    color: #010101;
                    margin-right: 10px;
                    font-size: 1.4rem;
                    width: 100%;
                    display: inline-block;
                    text-align: left;
                    line-height: unset;
                }
                .el-input__inner {
                    height: 30px;
                    line-height: 30px;
                    background: #eee;
                    color: #3a3a3a;
                    font-size: 1.4rem;
                    width: 100%;
                    display: inline-block;
                    padding: 0px;
                }
                .el-textarea__inner {
                    height: 60px;
                    line-height: 30px;
                    background: #eee;
                    color: #3a3a3a;
                    font-size: 1.4rem;
                    font-family: arial;
                    width: 100%;
                    display: inline-block;
                    padding: 0px;
                }
            }
            .InnerTable {
                width: 100%;
                display: inline-block;
                .el-form {
                    width: 100%;
                    display: inline-block;
                }
                .w22 {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    .el-checkbox-group {
                        width: 100%;
                        display: inline-block;
                        /deep/ .el-checkbox {
                            width: 50%;
                            float: left;
                            margin-right: 0px!important;
                            text-align: left;
                            margin-bottom: .5rem;
                            .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                                background: @base_color;
                            }
                            .el-checkbox__input.is-checked+.el-checkbox__label {
                                color: @base_color;
                            }
                            .el-checkbox__inner::after {
                                border: 0px;
                            }
                            .el-checkbox__label {
                                    font-size: 1.4rem;
                            }
                            .el-checkbox__inner {
                                width: 20px;
                                height: 20px;
                                border:1px solid @base_color;
                            }
                        }
                    }
                }
                .w100 {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    .receiveInfo {
                        font-size: 1.4rem;
                        color: @base_color;
                        text-align: left;
                        margin-bottom: 1rem;
                    }
                    .perList {
                        width: 100%;
                        display: inline-block;
                        margin-bottom: 2rem;
                        text-align: left;
                        em {
                            font-size: 1.4rem;
                             width: 100%;
                            display: inline-block;
                            font-style: normal;
                            text-align: left;
                            }
                            .InnerSpan {
                                width: 100%;
                                text-align:left;
                                display: inline-block;
                                span {
                                    color: #5d5d5d;
                                    font-size: 1.4rem;
                                }
                            }
                        .inputText {
                                /deep/ .el-input__inner {
                                    width: 100%;
                                }
                                /deep/ .el-form-item__label {
                                    width: 100%;
                                    text-align: left;
                                }
                                /deep/ .el-form-item__content {
                                    width: 100%;
                                }
                            }
                            .inputTextE {
                                /deep/ .el-input__inner {
                                    width: 100%;
                                }
                                /deep/ .el-form-item__label {
                                    width: 100%;
                                    text-align: left;
                                }
                                /deep/ .el-form-item__content {
                                    width: 100%;
                                }
                            }
                    }
                }
                .w55 {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    .perList {
                        width: 100%;
                        display: inline-block;
                        margin-bottom: 2rem;
                        /deep/ .el-form-item {
                            .el-form-item__content {
                                width: 100%;
                            }
                        }
                        span{
                            font-size: 1.4rem;
                            &:nth-child(1){
                                color: #010101;
                                margin-right: 10px;
                            }
                            &:nth-child(2) {
                                 color: #5d5d5d;
                            }
                        }
                    }
                }
                .w33 {
                     width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    .perList {
                        width: 100%;
                        display: inline-block;
                        margin-bottom: 2rem;
                        text-align: left;
                        /deep/ .el-form-item {
                            .el-form-item__content {
                                width: 100%;
                            }
                        }
                        span{
                            font-size: 1.4rem;
                            width: 100%;
                            display: inline-block;
                            &:nth-child(1){
                                color: #010101;
                                margin-right: 10px;
                            }
                            &:nth-child(2) {
                                 color: #5d5d5d;
                            }
                        }
                    }
                }
                 .w73 {
                     width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    .perList {
                        width: 100%;
                        display: inline-block;
                        margin-bottom: 2rem;
                        text-align: left;
                        /deep/ .el-form-item {
                            .el-form-item__content {
                                width: 100%;
                            }
                        }
                        span{
                            font-size: 1.4rem;
                            width: 100%;
                            display: inline-block;
                            &:nth-child(1){
                                color: #010101;
                                margin-right: 10px;
                            }
                            &:nth-child(2) {
                                 color: #5d5d5d;
                            }
                        }
                    }
                }
            }

            .UnitTitle {
                span{
                    margin-left: 10px;
                    display: inline-block;
                }
            }
        }
    }
}
</style>
