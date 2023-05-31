<template>
  <div class="RNPForm default">
    <div class="FormMain">
      <div v-html="content" class="to_vertical" id="content"></div>
      <div id="preview"></div>
    </div>
  </div>
</template>

<script lang="ts" scoped>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class RNPForm extends Vue {
  @Prop({ default: '' }) private formKey!: string;

  content: string = '';
  Signer: any = null;

  getForm () {
    this.$Api.regAndPay.getHtml((this.formKey || this.$route.params.id), this.currentlang, this.isMobile).then(result => {
      this.content = result.HtmlString;

      this.$nextTick(() => {
        if (result.Title) document.title = result.Title;
        if (document.querySelectorAll('#Sign').length > 0) {
          this.Signer = new intimex.CanvasSigner('#NewSignCanvas', '#Signature', {
            color: '#58B63A',
            width: 5
          });
          this.Signer.initCanvas();

          window['Signer'] = this.Signer;
        }

        let _this = this;
        document.dispatchEvent(new Event('rnpFinshed'));
        document.querySelectorAll('input[type="text"],input[type="email"]').forEach(function (inputEl) {
          inputEl.addEventListener('focus', _this.onInputFocus);
          inputEl.addEventListener('blur', _this.onInputBlur);
        });
      });
    });
  }

  onInputFocus (e) {
    e.target.parentNode.parentNode.classList.add('focus');
  }

  onInputBlur (e) {
    e.target.parentNode.parentNode.classList.remove('focus');
  }

  get currentlang () {
    return this.$Storage.get('locale');
  }

  get isMobile () {
    return this.$store.state.isMobile;
  }

  get queryLang () {
    return this.$route.query.Lang || '';
  }

  created () {
    window['jsData'] = {
      id: this.$route.params.id,
      returnUrl: window.location.host, // domain
      IsLogin: false, // 登录状态
      IsMobile: this.isMobile,
      HasPreview: true,
      UploadButtonText: this.$t('RegNPay.UploadButtonText'),
      UploadingText: this.$t('RegNPay.UploadingText'),
      UploadSuccessfulText: this.$t('RegNPay.UploadSuccessfulText'),
      UploadFailText: this.$t('RegNPay.UploadFailText'),
      NoFileText: this.$t('RegNPay.NoFileText'),
      UploadLengthText: this.$t('RegNPay.UploadLengthText'),
      UploadSizeText: this.$t('RegNPay.UploadSizeText'),
      BackText: this.$t('RegNPay.BackText'),
      ConfirmText: this.$t('RegNPay.ConfirmText'),
      PleaseSelect: this.$t('RegNPay.PleaseSelect'),
      PreviewTitleText: this.$t('RegNPay.PreviewTitleText'),
      RequiredText: this.$t('RegNPay.RequiredText'),
      FormatErrorText: this.$t('RegNPay.FormatErrorText'),
      Version: '2.0'
      // HasRNPConfirm: true  //form1 提交后 不显示浏览 当前跳转到 form2 到继续填资料
    };

    // 引入外部js
    this.$LoadScript('/static/js/CanvasSigner.js');
    this.$LoadScript('/static/js/ajaxFileUpload.js');

    // RNP Form后台预览跳转语言判断
    if (this.queryLang) {
      this.$Api.member.setUILanguage(this.queryLang).then((result) => {
        this.$i18n.locale = this.queryLang as string;
        localStorage.setItem('locale', this.queryLang as string);
        this.getForm();
      }).catch((error) => {
        console.log(error);
      });
    } else {
      this.getForm();
    }
  }

  mounted () {
    window['regAndPay'] = this.$Api.regAndPay;
    window['router'] = this.$router;
    window['Elalert'] = this.$alert;
  }

  @Watch('isMobile', { deep: true })
  onMediaChange () {
    this.getForm();
  }
}
</script>

<style lang="less" scoped>
@media only screen and (min-width: 769px) {
    @import '../../assets/css/regnpay.less';
}

@media only screen and (max-width: 768px) {
    @import '../../assets/css/regnpay_m.less';
}
</style>
