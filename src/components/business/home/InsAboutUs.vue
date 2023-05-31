<template>
  <div class="about-main">
    <div class="cover">
      <img :src="content.Cover" />
    </div>
    <div class="content">
      <p class="title">{{content.Title}}</p>
      <div class="body" v-html="content.Body"></div>
      <router-link class="view-more" to="/CMS/content/20288">{{$t('Action.ViewMore')}}</router-link>
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

    this.$Api.cms.getContentByDevice({ key: 'k_ab', IsMobile: this.isMobile }).then(result => {
      this.content = result.CMS;
    });
  }

  get isMobile () {
    return this.$store.state.isMobile;
  }

  mounted () {
    this.getContent();
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
        width: 56.2%;
        min-width: 900px;
        margin: 125px auto 150px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        flex-direction: row-reverse;

        .cover {
          max-width: 42%;
          margin-left: 15%;
          flex-shrink: 0;

          img {
            max-width: 100%;
          }
        }

        .content {
          .title {
            font-size: 48px;
            color: @font_color;
            font-weight: bold;
            margin-bottom: 35px;
            }

            .body {
            /deep/ p {
                font-size: 18px;
                color: #363636;
                line-height: 36px;
            }
          }

          .view-more {
            font-size: 18px;
            color: #363636;
            padding: 12px 54px;
            border: 2px solid #7d7d7d;
            margin-top: 50px;
            display: inline-block;
          }
        }
    }
}

.mobile {
    .about-main {
        margin: 2.5rem auto 7.5rem;
        padding: 0 0.8rem;
        box-sizing: border-box;

        .content {
            padding: 0 0.5rem;
            .title {
            font-size: 1.5rem;
            color: @font_color;
            font-weight: bold;
            margin-bottom: 2rem;
            }

            .body {
            /deep/ p {
                font-size: 1.2rem;
                color: #363636;
                line-height: 1.8rem;
            }
            }

            .view-more {
            font-size: 1.2rem;
            color: #363636;
            padding: 12px 54px;
            border: 2px solid #7d7d7d;
            margin-top: 50px;
            display: inline-block;
            font-size: 1.2rem;
            color: #363636;
            padding: 0.7rem 3.4rem;
            border: 1.5px solid #7d7d7d;
            margin-top: 2rem;
            display: inline-block;
            text-decoration: none;
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
</style>
