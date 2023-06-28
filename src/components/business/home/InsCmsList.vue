<template>
  <div class="cms-list fade-in-hot">
    <!-- <p class="catName" v-if="contents[0]">{{contents[0].Category.Name}}</p> -->

    <!-- <el-row :gutter="isMobile ? 20 : 58" class="list">
        <el-col :span="12" :sm="12" v-for="(cms,index) in contents" :key="index">
            <router-link :to="'/CMS/content/' + cms.Id">
                <div class="cover">
                    <img :src="cms.Cover" />
                </div>
                <div class="info">
                    <p class="title">{{cms.Title}}</p>
                    <p class="intro">{{cms.Desc}}</p>
                </div>
            </router-link>
        </el-col>
    </el-row> -->
    <ul class="list">
        <li v-for="(cms,index) in contents" :key="index">
            <a href="javascript:;" v-if="cms.Url" @click="toUrl(cms)">
                <div class="cover">
                    <img :src="cms.Cover" />
                </div>
            </a>
            <router-link :to="'/CMS/content/' + cms.Id" v-else>
                <div class="cover">
                    <img :src="cms.Cover" />
                </div>
            </router-link>
        </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class InsCmsList extends Vue {
  @Prop({ default: '' }) private catKey!: string; // key值

  contents: object[] = [];

  toUrl (n) {
    if (!n.IsNewWin && n.Url) {
      window.location.href = n.Url;
    } else if (n.IsNewWin && n.Url) {
      window.open(n.Url);
    }
  }

  // 获取关于cms内容列表
  getContents () {
    this.$Api.cms.getContentsByCatKeyEx({ Key: this.catKey, Page: 1, PageSize: 6, IsMobile: this.isMobile }).then((result) => {
      this.contents = result.Data;
      console.log(result, 'getContentsByCatKeyEx');
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
    .cms-list {
        width: 1200px;
        margin: 0 auto;

        .catName {
            font-size: 48px;
            color: @font_color;
            font-weight: bold;
            text-align: center;
            margin-bottom: 110px;
        }

        .list {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            margin-top: 30px;
            margin-bottom: 40px;
            li{
                width: 590px;
                float: left;
                margin-bottom: 10px;
                &:nth-child(2n){
                    float: right;
                }
            }
            .el-col {
                margin-bottom: 20px;

                .cover {
                    // margin-bottom: 26px;
                    img {
                        display: block;
                        max-width: 100%;
                        max-height: 100%;
                    }
                }

                .info {
                    .title {
                        font-size: 29.8px;
                        color: #444444;
                        margin-bottom: 30px;
                    }

                    .intro {
                        font-size: 16px;
                        color: #444444;
                        line-height: 24px;
                    }
                }
            }
        }
    }
}

.mobile {
    .cms-list {
        padding: 0 1rem;
        .catName {
            font-size: 2rem;
            color: @font_color;
            font-weight: bold;
            text-align: center;
            margin-bottom: 2rem;
        }

        .list {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

            li{
                width: 48%;
                margin-right: 4%;
                &:nth-child(2n){
                    margin-right: 0;
                }
                .cover {
                    margin-bottom: 1rem;
                    img {
                        width: 100%;
                        display: block;

                    }
                }
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
