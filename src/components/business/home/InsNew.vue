<template>
  <div class="about-main fade-in-hot" :class="{'FontC':this.$Storage.get('locale') === 'C'}">
    <!-- <div class="cover">
      <img :src="content.Cover" />
    </div> -->
    <div class="newstitle">
      {{newtitle}}
    </div>
    <div class="content">
      <ul>
        <li v-for="(cms ,index) in content" :key="index">
           <!-- <div class="title" v-if="isMobile">{{cms.Title}}</div> -->
          <div class="cover">
            <!-- <router-link :to="'/CMS/content/'+ cms.Id"></router-link> -->
            <img :src="cms.Cover" alt="">
          </div>
          <div class="info">
            <div class="date">{{cms.ContentDateTime}}</div>
            <div class="title" v-html="cms.Body"> </div>
            <!-- <div class="btn">
              <a href="javascript:;" v-if="cms.Url" @click="toUrl(cms)">{{$t('Action.ViewMore')}}</a>
              <router-link :to="cms.Url" v-else>{{$t('Action.ViewMore')}}</router-link>
            </div> -->
          </div>

        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class CmxAboutUs extends Vue {
  content: object = {};
  newtitle: string = '';

  toUrl (n) {
    if (!n.IsOpenWindows && n.Url) {
      window.location.href = n.Url;
    } else if (n.IsOpenWindows && n.Url) {
      window.open(n.Url);
    }
  }

  // 获取关于cms内容列表
  getContents () {
    this.$Api.cms.getContentsByCatKeyEx({ Key: 'News', Page: 1, PageSize: 3, IsMobile: this.isMobile }).then((result) => {
      this.content = result.Data;
      this.newtitle = result.Data[0].Category.Name;
      console.log(result, 'getContentsNews');

      result.Data.forEach(function (i) {
        var newDate = new Date(i.ContentDateTime.replace(/-/g, '/'));
        i.ContentDateTime = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
      });
    });
  }

  HotScroll () {
    let fadeInElements = document.getElementsByClassName('fade-in-hot');
    // console.log(document.getElementsByClassName('fade-in'), '滚动');
    for (var i = 0; i < fadeInElements.length; i++) {
      let elem = fadeInElements[i] as HTMLElement;
      if (this.isElemVisible(elem)) {
        elem.style.opacity = '1';
        // elem.style.transform = 'translate(0, 0)';
        // fadeInElements.splice(i, 1); // 只让它运行一次
      }
    }
    // document.removeEventListener('scroll', this.handleScroll);
  }

  isElemVisible (el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top + 200; // 200 = buffer
    var elemBottom = rect.bottom;
    return elemTop < window.innerHeight && elemBottom >= 0;
  }

  get isMobile () {
    return this.$store.state.isMobile;
  }

  mounted () {
    this.getContents();
    document.addEventListener('scroll', this.HotScroll);
  }

  destroyed () {
    document.removeEventListener('scroll', this.HotScroll);
  }

  @Watch('isMobile', { deep: true })
  onMediaChange () {
    this.getContents();
  }
}
</script>

<style lang="less" scoped>
.pc {
    .about-main {
        width: 1200px;
        margin: 0 auto;
        margin-top: 48px;
        margin-bottom: 65px;
        box-sizing: border-box;
        // display: flex;
        // justify-content: space-between;
        // flex-direction: row-reverse;

        .content {

            .body {
            /deep/ p {
                font-size: 18px;
                color: #fff;
                line-height: 28px;
                // margin-bottom: 20px;
                word-break: break-word;
                span{
                  text-wrap: wrap !important;
                }
            }
          }

          // .view-more {
          //   font-size: 18px;
          //   color: #141414;
          //   padding: 14px 30px;
          //   background-color: #ff11af;
          //   margin-top: 25px;
          //   margin-bottom: 25px;
          //   display: inline-block;
          //   font-family: 'Poppins-SemiBold';
          //   border-radius: 3px;
          // }
          ul{
            li{
              display: flex;
              justify-content: center;
              .cover{
                width: 500px;
                max-height: 300px;
                border-radius: 3px;
                overflow: hidden;
                text-align: right;
                img{
                  /* width: 100%; */
                  height: 100%;
                  display: block;
                  object-fit: cover;
                  display: inline-block;
                }
              }
              .info{
                width: 500px;
                margin-left: 40px;
                .date{
                  font-size: 14px;
                  color: #666;
                  // padding-top: 10px;
                  margin-bottom: 10px;
                }

                /deep/ .btn{

                  a{
                    font-size: 18px;
                    color: #141414;
                    padding: 10px 30px;
                    background-color: #ff11af;
                    margin-top: 25px;
                    margin-bottom: 25px;
                    display: inline-block;
                    font-family: 'Poppins-SemiBold';
                    border-radius: 3px;
                  }
                }
              }
              .title {
                  font-size: 18px;
                  line-height: 24px;
                  color: #ccc;
                  margin-bottom: 10px;
                  text-overflow: -o-ellipsis-lastline;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  // display: -webkit-box;
                  // -webkit-line-clamp: 3;
                  // line-clamp: 3;
                  -webkit-box-orient: vertical;
                  margin-top: 0;
                  font-family: 'Poppins-SemiBold';
                }
            }
          }
        }
    }
    .newstitle{
      width: 368px;
      height: 76px;
      line-height: 80px;
      background: url('/static/Images/hometitle.png') no-repeat center center;
      font-size: 50px;
      color: #ff11af;
      // font-weight: bold;
      margin: 0 auto;
      text-align: center;
      margin-bottom: 24px;
      font-family: 'PostNoBillsColombo-ExtraBold';
    }
    .FontC{
      .content {
        .title{
          // font-family: 'SourceHanSans-Regular';
          // font-size: 36px;
          // font-weight: bold;
          // letter-spacing: 2px;
          // line-height: 72px;
        }
      }
      .newstitle{
        font-family: 'SourceHanSans-Regular';
          font-size: 36px;
          font-weight: bold;
          letter-spacing: 2px;
          line-height: 72px;
      }
    }

}

.mobile {
    .about-main {
        margin: 2rem auto 5rem;
        padding: 0 1rem;
        box-sizing: border-box;

        .content {
            padding: 0 0.5rem;

            .body {
            /deep/ p {
                font-size: 1.2rem;
                color: #cccccc;
                line-height: 1.6rem;
            }
            }
            ul{
            li{
              .cover{
                width: 100%;
                // height: 20rem;
                border-radius: 3px;
                overflow: hidden;
                img{
                  width: 100%;
                  height: 100%;
                  display: block;
                  object-fit: cover;
                }
              }
              .info{
                width: 100%;
                // margin-left: 40px;
                .date{
                  font-size: 1.2rem;
                  color: #666;
                  padding-top: 10px;
                  // margin-bottom: 10px;
                }

                /deep/ .btn{
                  text-align: center;
                  a{
                    font-size:1.6rem;
                    color: #141414;
                    display: inline-block;
                    padding: 0.7rem 3.4rem;
                    margin-top: 2rem;
                    display: inline-block;
                    text-decoration: none;
                    background-color: #ff11af;
                    font-family: 'Poppins-SemiBold';
                    border-radius: 3px;
                  }
                }
              }
              .title {
                  font-size: 1.4rem;
                  line-height: 24px;
                  color: #ccc;
                  margin-bottom: 10px;
                  text-overflow: -o-ellipsis-lastline;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  // display: -webkit-box;
                  // -webkit-line-clamp: 3;
                  // line-clamp: 3;
                  // -webkit-box-orient: vertical;
                  margin-top: 0;
                  font-family: 'Poppins-SemiBold';
                }
            }
          }
        }
        .newstitle{
          background: url(/static/Images/hometitleM.png) no-repeat center center;
          background-size: contain;
          font-size: 3rem;
          width: 80%;
          height: 5rem;
          line-height: 5rem;
          margin: 0 auto;
          color: #ff11af;
          font-weight: bold;
          margin-bottom: 2rem;
          font-family: 'PostNoBillsColombo-ExtraBold';
          text-align: center;
          letter-spacing: 3px;
        }

    }
    .FontC{
      .content {
        .title{
          font-family: 'SourceHanSans-Regular' !important;
          font-size: 1.6rem;
          // font-weight: bold;
          // letter-spacing: 2px;
          // line-height: 5rem;
        }

        .body{
          /deep/ p{
            word-break: break-word;
            span{
              text-wrap: wrap !important;
            }
          }
        }
      }
      .newstitle{
        font-family: 'SourceHanSans-Regular' !important;
        font-size: 2.4rem;
        font-weight: bold;
        letter-spacing: 2px;
        line-height: 5rem;
      }
    }
}
.fade-in-hot {
  opacity: 1;
  transition: 1s all ease-out;
  // transform: translate(0, -30px);
  box-sizing: border-box;
  // padding: 20px;
  display: block;
}
</style>
