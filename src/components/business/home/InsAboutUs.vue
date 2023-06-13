<template>
  <div class="about-main fade-in-hot" :class="{'FontC':this.$Storage.get('locale') === 'C'}">
    <!-- <div class="cover">
      <img :src="content.Cover" />
    </div> -->
    <div class="content">
      <p class="title">{{content.Title}}</p>
      <div class="body" v-html="content.Body"></div>
      <div style="text-align: center;">
        <router-link class="view-more" to="/CMS/content/20295">{{$t('Action.ViewMore')}}</router-link>
      </div>

    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class CmxAboutUs extends Vue {
  content: object = {};

  // 获取关于我们cms内容
  getContent () {
    // this.$Api.cms.getContentByKey({ key: 'k_ab' }).then((result) => {
    //   this.content = result;
    // });

    this.$Api.cms.getContentByDevice({ key: 'aboutus', IsMobile: this.isMobile }).then(result => {
      this.content = result.CMS;
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
    this.getContent();
    document.addEventListener('scroll', this.HotScroll);
  }

  destroyed () {
    document.removeEventListener('scroll', this.HotScroll);
  }

  @Watch('isMobile', { deep: true })
  onMediaChange () {
    this.getContent();
  }
}
</script>

<style lang="less" scoped>
.pc {
    .about-main {
        width: 1200px;
        margin: 0 auto;
        margin-top: 48px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        flex-direction: row-reverse;

        .content {
          .title {
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

          .view-more {
            font-size: 18px;
            color: #141414;
            padding: 14px 30px;
            background-color: #ff11af;
            margin-top: 25px;
            margin-bottom: 25px;
            display: inline-block;
            font-family: 'Poppins-SemiBold';
            border-radius: 3px;
          }
        }
    }
    .FontC{
      .content {
        .title{
          font-family: 'SourceHanSans-Regular';
          font-size: 36px;
          font-weight: bold;
          letter-spacing: 2px;
          line-height: 72px;
        }
      }
    }

}

.mobile {
    .about-main {
        margin: 2rem auto 2rem;
        padding: 0 1rem;
        box-sizing: border-box;

        .content {
            padding: 0 0.5rem;
            .title {
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

            .body {
            /deep/ p {
                font-size: 1.2rem;
                color: #cccccc;
                line-height: 1.6rem;
            }
            }

            .view-more {
              font-size: 1.6rem;
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

        .cover {
            margin-bottom: 3.5rem;
            text-align: center;
            img {
            max-width: 100%;
            }
        }
    }
    .FontC{
      .content {
        .title{
          font-family: 'SourceHanSans-Regular' !important;
          font-size: 2.4rem;
          font-weight: bold;
          letter-spacing: 2px;
          line-height: 5rem;
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
