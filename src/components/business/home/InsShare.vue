<template>
  <div class="about-main fade-in-hot">
    <!-- <div class="cover">
      <img :src="content.Cover" />
    </div> -->
    <div class="content">
      <div class="body left" v-html="FBcontent.Body"></div>
      <div class="body right" v-html="IGcontent.Body"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class CmxAboutUs extends Vue {
  FBcontent: object = {};
  IGcontent: object = {};

  // 获取关于我们cms内容
  getContent () {
    // this.$Api.cms.getContentByKey({ key: 'k_ab' }).then((result) => {
    //   this.content = result;
    // });

    this.$Api.cms.getContentByDevice({ key: 'facebook', IsMobile: this.isMobile }).then(result => {
      this.FBcontent = result.CMS;
    });
    this.$Api.cms.getContentByDevice({ key: 'Instagram', IsMobile: this.isMobile }).then(result => {
      this.IGcontent = result.CMS;
    });
  }

  get isMobile () {
    return this.$store.state.isMobile;
  }
  HotScroll () {
    let fadeInElements = document.getElementsByClassName('fade-in-hot');
    for (var i = 0; i < fadeInElements.length; i++) {
      let elem = fadeInElements[i] as HTMLElement;
      if (this.isElemVisible(elem)) {
        elem.style.opacity = '1';
      }
    }
  }
  isElemVisible (el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top + 200; // 200 = buffer
    var elemBottom = rect.bottom;
    return elemTop < window.innerHeight && elemBottom >= 0;
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
        justify-content: center;
        flex-direction: row-reverse;
        margin-bottom: 60px;

        .content {
          display: flex;
          justify-content: center;
          .left{
            margin-right: 25px;

          }
          .right{
            margin-left: 25px;
          }

            .body {
            /deep/ p {
                font-size: 18px;
                color: #fff;
                line-height: 28px;
                // margin-bottom: 20px;
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
}

.mobile {
    .about-main {
        margin: 2rem auto 2rem;
        padding: 0 3rem;
        box-sizing: border-box;

        .content {
            .title {
            font-size: 1.5rem;
            color: @font_color;
            font-weight: bold;
            margin-bottom: 2rem;
            }

            .body {
              margin-bottom: 2rem;
            /deep/ p {
                font-size: 1.2rem;
                color: #363636;
                line-height: 1.8rem;
                img{
                  width: 100%;
                  display: block;
                }
            }
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
}
.fade-in-hot {
  opacity: 0;
  transition: 1s all ease-out;
  // transform: translate(0, -30px);
  box-sizing: border-box;
  // padding: 20px;
  display: block;
}
</style>
