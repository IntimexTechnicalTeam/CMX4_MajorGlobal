<template>
  <div class="cms-list">
    <p class="catName" v-if="contents[0]">{{contents[0].Category.Name}}</p>

    <el-row :gutter="isMobile ? 20 : 58" class="list">
        <el-col :span="12" :sm="8" v-for="(cms,index) in contents" :key="index">
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
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class InsCmsList extends Vue {
  @Prop({ default: '' }) private catKey!: string; // key值

  contents: object[] = [];

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

  mounted () {
    this.getContents();
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
        width: 89.2%;
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

            .el-col {
                margin-bottom: 130px;

                &:nth-child(3n) {
                    margin-right: 0;
                }

                .cover {
                    margin-bottom: 26px;
                    img {
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

            .el-col {
                margin-bottom: 3.5rem;
                list-style: none;

                &:nth-child(2n) {
                    margin-right: 0;
                }

                .cover {
                    margin-bottom: 0.5rem;
                    img {
                        max-width: 100%;
                        max-height: 100%;
                    }
                }

                .info {
                    .title {
                        font-size: 1.5rem;
                        color: #444444;
                        margin-bottom: 0.5rem;
                        font-weight: bold;
                        letter-spacing: 0.5rem;

                        &.en {
                            letter-spacing: unset;
                        }
                    }

                    .intro {
                        font-size: 1.2rem;
                        color: #444444;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        word-wrap: break-word;
                        min-height: 2.22rem;
                    }
                }
            }
        }
    }
}
</style>
