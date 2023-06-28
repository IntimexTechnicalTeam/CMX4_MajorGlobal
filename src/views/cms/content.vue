<template>
  <div id="container" :class="{'FontC':this.$Storage.get('locale') === 'C'}">
    <div class="DetailTitle" v-if="ImgList">
      <div>
        <img :src="ImgList" >
      </div>
    </div>
    <div class="DetailTitle" v-else>
        <img :src="content.Cover" v-if="NewcateId != 40117 && NewcateId != 40121 && content.Cover">
        <div class="TitleBg" v-else><div class="innerBoxText">{{content.Title}}</div></div>
    </div>
    <div class="CmsContent">
      <div class="rightContent">
        <!-- <Location LocationTips="您的当前位置：" Homepage="首页" :Column="content.Category.Name" :Title="content.Title"></Location> -->

        <!-- 联络我们页面 -->
        <div  v-if="content.Key=='contactus'">
          <div class="cms-contactus fix">
            <div class="cmsBody" v-html="content.Body"></div>

            <div class="Form">
              <RNPForm formKey="ContactUs" />
            </div>
          </div>
          <div class="map" v-html="contentmap.Body"></div>
        </div>

        <!-- 其他页面 -->
        <div class="CmsContentBody" v-else>

          <!-- <h1 class="CmsContentTitle">{{content.Title}}</h1> -->
          <p v-html="content.Body"></p>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    Location: () => import('@/components/base/InsLocation.vue'),
    RNPForm: () => import('@/views/regNPay/regNPayForm.vue')
  }
})
export default class InsCmsContent extends Vue {
  content: object={};
  contentmap: object={};
  OtherPageImg:string='';
  NewcateId:string='';
  private ImgList: string[] = [];
  CateName: string = '';

  // 获取关于我们cms内容
  getContent () {
    this.$Api.cms.getContentByDevice({ ContentId: this.id, IsMobile: this.isMobile }).then(result => {
      this.content = result.CMS;
      this.OtherPageImg = result.CMS.Cover;
      this.NewcateId = result.CMS.CatId;
      this.getCategoryByDevice(result.CMS.CatId);
      // this.$HiddenLayer();
      console.log(result.CMS, 'result');
      this.$nextTick(() => {
        if (result.CMS.Title) document.title = result.CMS.Title;
        (document.getElementsByName('keywords')[0] as any).content = result.CMS.SeoKeyword;
        (document.getElementsByName('description')[0] as any).content = result.CMS.SeoDesc;
        (document.getElementsByName('twitter:description')[0] as any).content = result.CMS.SeoDesc;
        (document.getElementsByName('twitter:title')[0] as any).content = result.CMS.Title;
      });
    });
  }
  getMap () {
    this.$Api.cms.getContentByDevice({ Key: 'map', IsMobile: this.isMobile }).then(result => {
      this.contentmap = result.CMS;
    });
  }
  // 根据设备类型获取CMSCategory信息
  getCategoryByDevice (cateId) {
    this.$Api.cms.getCategoryByDevice({ CatId: cateId, IsMobile: this.isMobile }).then(async (result) => {
      this.ImgList = result.ImagePath;
      this.CateName = result.Name;
    }).catch((error) => {
      console.log(error, 'error');
      this.$message({
        message: error,
        type: 'error'
      });
    });
  }

  get id () {
    return this.$route.params.id;
  }

  get isMobile () {
    return this.$store.state.isMobile;
  }

  mounted () {
    this.getContent();
    this.getMap();
  }

  @Watch('isMobile', { deep: true })
  onMediaChange () {
    this.getContent();
  }

  @Watch('id', { deep: true })
  onKeyChange () {
    this.content = {};
    this.getContent();
  }
}
</script>
<style scoped lang="less">
.pc {
  .DetailTitle{
    width: 100%;
    display: flex;
    flex-wrap:wrap;
    position: relative;
    align-items: center;
    justify-content: center;
    img{
      width: 100%;
    }
    .TitleBg{
      margin-top: 100px;
      margin-bottom: 100px;
      .innerBoxText{
        // background:#ffffff;
        color: #ff11af;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        font-family: 'PostNoBillsColombo-ExtraBold';
      }
    }
  }
  .FontC{
    .DetailTitle{
      .TitleBg{
      .innerBoxText{
          font-family: 'SourceHanSans-Regular';
          font-weight: bold;
          font-size: 45px;
        }
      }
    }
  }
  .CmsContent {
    margin-top: 30px;
    margin-bottom: 30px;
    .CmsContentBody{
      width: 1200px;
      margin: 0 auto;
      padding: 0 100px;
      box-sizing: border-box;
      /deep/ p{
        color: #cccccc;
        font-size: 18px;
        line-height: 24px;
        span{
          text-wrap: wrap !important;
        }
      }
    }
  }
  .CmsContentTitle {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 30px;
    text-align: center;
  }
  .rightContent {
    // width: 70%;
    // float: left;
    // position: relative;
    // margin-bottom: 30px;
    min-height: 300px;
  }

  .Form {
    width: 80%;
    margin: 0 auto;

    /deep/ .RNPForm.default {
      background-color:transparent;
      padding: 0;
      .FormMain {
        min-width: auto;
        width: 85%;
        .title{
          color: #cccccc;
        }
         #preview .anwer p{
          color: #cccccc;
        }
        #content {
          .btn.save {
            border: 0;
            width: 100%;
            background-color: @base_color;
            border-radius: 0;
            margin: 0;
            color: #141414;
            font-size: 22px;
            font-family: 'Poppins-SemiBold';
            letter-spacing: 0;
            border-radius: 3px;
          }

          #Anwers {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin: 0;

            .form-group {
              padding: 0;
              border: 0;
              width: 100%;
              background-color: transparent;
              .control-label{
                margin-bottom: 10px;
                color: #cccccc;
                font-weight: 500;
              }

              .control-label-remark {
                display: none;
              }

              ::-webkit-input-placeholder{
                color: #000000;
              }
              ::-moz-placeholder{   /* Mozilla Firefox 19+ */
                color: #000000;
              }
              :-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
                color: #000000;
              }
              :-ms-input-placeholder{  /* Internet Explorer 10-11 */
                color: #000000;
              }

              fieldset {
                &.text {
                  input[type="text"] {
                    border: 1px solid #ccc;
                    padding: 10px 15px;
                    font-size: 15px;
                    box-sizing: border-box;
                    border-radius: 3px;
                  }
                }

                &.email {
                  input[type="email"] {
                    border: 1px solid #ccc;
                    padding: 10px 15px;
                    font-size: 15px;
                    box-sizing: border-box;
                    border-radius: 3px;
                  }
                }

                &.textarea {
                  textarea {
                    height: 165px;
                    border: 1px solid #ccc;
                    padding: 15px;
                    font-size: 15px;
                    box-sizing: border-box;
                    border-radius: 3px;
                  }
                }
              }
            }
          }
        }

        #preview {
          padding: 0;
        }
      }
    }
  }

  .clear {
    clear: both;
  }

  .cms-contactus{
    padding: 0 50px;
    margin: 0 auto;
    box-sizing: border-box;
    width: 1200px;
    .cmsBody{
      width: 50%;
      float: left;
      /deep/ .contactBox{
        p:nth-child(2n-1){
          color: #e6109e;
          font-size: 18px;
          font-family: 'Poppins-SemiBold';
          text-align:center;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 12px;
          img{
            margin-right: 6px;
          }
        }
        p:nth-child(2n){
          color: #cccccc;
          font-size: 18px;
          text-align:center;
          margin-bottom: 40px;
          line-height: 24px;
          a{
            color: #cccccc;
          font-size: 18px;
          }
        }
      }
    }
    .Form{
      width: 50%;
      float: left;
    }
  }
}

.mobile {
  .DetailTitle{
    width: 100%;
    display: flex;
    flex-wrap:wrap;
    position: relative;
    align-items: center;
    justify-content: center;
    img{
      width: 100%;
    }
    .TitleBg{
      margin-top: 5rem;
      margin-bottom: 1rem;
      .innerBoxText{
        // background:#ffffff;
        color: #ff11af;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
        font-family: 'PostNoBillsColombo-ExtraBold';
      }
    }
  }
  .FontC{
    .DetailTitle{
      .TitleBg{
      .innerBoxText{
          font-family: 'SourceHanSans-Regular';
          font-weight: bold;
          font-size: 2.5rem;
        }
      }
    }
  }
  .CmsContentTitle {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 30px;
    text-align: center;
    margin-top: 30px;
  }
  .rightContent {
    width: 100%;
    margin: 0 auto;
    position: relative;
    margin-bottom: 2rem;
    margin-top: 2rem;
    .CmsContentBody{
      padding: 0 1rem;
      /deep/ p{
        color: #cccccc;
        font-size: 1.2rem;
        line-height: 1.8rem;
        span{
          text-wrap: wrap !important;
        }
      }
    }
  }
  .cms-contactus{
    padding: 0 1rem;
  }
  .cmsBody{
    width: 100%;
    /deep/ .contactBox{
      p:nth-child(2n-1){
        color: #e6109e;
        font-size: 1.3rem;
        font-family: 'Poppins-SemiBold';
        text-align:center;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1rem;
        img{
          margin-right: 5px;
        }
      }
      p:nth-child(2n){
        color: #cccccc;
        font-size: 1.3rem;
        text-align:center;
        margin-bottom: 2rem;
        line-height: 1.8rem;
        a{
          color: #cccccc;
          font-size: 1.3rem;
        }
      }
    }
  }

  .Form {
    /deep/ .RNPForm.default {
      background-color: transparent;
      .FormMain {
        min-width: auto;
        .title{
          color: #cccccc;
        }
        #preview .anwer p{
          color: #cccccc;
        }
        #content {
          .BottomBorder{
            margin-bottom: 2rem;
          }
          .btn.save {
            border: 0;
            width: 100%;
            background-color: @base_color;
            border-radius: 3px;
            font-size: 1.4rem;
            height: 3.5rem;
            margin: 0;
            letter-spacing: 0;
            font-family: 'Poppins-SemiBold';
            color: #141414;
          }

          #Anwers {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .form-group {
              padding: 0;
              border: 0;
              width: 100%;
              background-color: transparent;
              .control-label{
                margin-bottom: 0;
                color: #cccccc;
                font-size: 1.3rem;
              }
              .control-label-remark {
                display: none;
              }

              ::-webkit-input-placeholder{
                color: #000000;
              }
              ::-moz-placeholder{   /* Mozilla Firefox 19+ */
                color: #000000;
              }
              :-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
                color: #000000;
              }
              :-ms-input-placeholder{  /* Internet Explorer 10-11 */
                color: #000000;
              }

              fieldset {
                &.text {
                  input[type="text"] {
                    // border: 1px solid #ccc;
                    padding: 0.8rem 1.3rem;
                    font-size: 1rem;
                    box-sizing: border-box;
                    border-radius: 3px;
                  }
                }

                &.email {
                  input[type="email"] {
                    // border: 1px solid #ccc;
                    padding: 0.8rem 1.3rem;
                    font-size: 1rem;
                    box-sizing: border-box;
                    border-radius: 3px;
                  }
                }

                &.textarea {
                  textarea {
                    height: 9rem;
                    // border: 1px solid #ccc;
                    padding: 1.3rem;
                    font-size: 1rem;
                    box-sizing: border-box;
                    border-radius: 3px;
                  }
                }
              }
            }
          }
        }

        #preview {
          padding: 0;

          input[type="button"] {
            font-size: 1.1rem;
            height: 3.2rem;

            &:first-of-type {
              margin-top: 2rem;
            }
          }
        }
      }
    }
  }

  .clear {
    clear: both;
  }
}
</style>
