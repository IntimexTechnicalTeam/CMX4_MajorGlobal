<template>
  <div id="container" class="catDetail">
    <!-- <ins-banner data="http://lstrehacare.dev.in-store.hk:84/Images/forweb/about_banner.jpg" /> -->
    <div class="DetailTitle">
        <img :src="cmsCategory.ImagePath" v-if="cmsCategory.ImagePath">
        <div class="TitleBg" v-else><div class="innerBoxText">{{cmsCategory.Name}}</div></div>
    </div>

    <div class="catContent">
        <template v-if="cmsCategory.PageStyle === '0' || cmsCategory.PageStyle === '1'">
          <div v-html="cmsCategory.Content" class="layer"></div>
        </template>

        <ins-cat-layout2 :catData="cmsCatTree" :cmsData="contentList" @changeCatSelect="changeCatSelect" v-if="cmsCategory.PageStyle === '2'" />

        <ins-cat-layout3 :cmsData="contentList" v-if="cmsCategory.PageStyle === '3'" />

        <div v-if="!isMobile">
          <ins-cat-layout4 :cmsData="contentList" v-if="cmsCategory.PageStyle === '4'" />
          <div class="pager" v-if="pager.totalRecord > pager.pageSize">
              <ins-page :total="pager.totalRecord" v-model="pager.currentPage" :pageNum="pager.pageSize"></ins-page>
          </div>
        </div>
        <div v-else>
          <div class="productsscrollbar">
            <ins-cat-layout4 :cmsData="contentListscroll" :pager="pager" v-if="cmsCategory.PageStyle === '4'" />
          </div>
          <div v-if="loading" ref="load" class="dropload-load">
            <i class="loading">{{$t('pager.Loading')}}</i>
          </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    // InsBanner: () => import('@/components/base/InsBanner.vue'),
    InsCatLayout2: () => import('@/components/business/cms/InsCatLayout2.vue'),
    InsCatLayout3: () => import('@/components/business/cms/InsCatLayout3.vue'),
    InsCatLayout4: () => import('@/components/business/cms/InsCatLayout4.vue'),
    InsPage: () => import('@/components/base/InsPage.vue')
  }
})
export default class insNews extends Vue {
    cmsCategory: object = {}; // cms下单个目录的信息
    cmsCatTree: object[] = []; // cms目录
    contentList: object[] = []; // cms内容列表
    contentListscroll: object[] = []; // cms内容列表
    catId: number = 0; // Tree点击获取内容列表的目录id
    PageStyle: string = '0'; // catDetail页面类型
    pager: any = {
      currentPage: 1, // 当前页
      pageSize: 9, // 每页显示条目个数
      totalRecord: 0 // 总条目数
    }
    private SortOrder: string = 'desc';
    private SortName: string = 'CreateDate'
    islocking: boolean = true;
    loading: boolean = true;
    Scrollheight: number = 0;

    // 根据设备类型获取CMSCategory信息
    getCategoryByDevice () {
      this.$Api.cms.getCategoryByDevice({ CatId: this.id, IsMobile: this.isMobile }).then((result) => {
        this.cmsCategory = result;
        this.PageStyle = result.PageStyle;

        switch (result.PageStyle) {
          case '2':
            this.getCategoryTree();
            break;
          case '3':
            this.getSubCatContents();
            break;
          case '4':
            if (this.isMobile === true) {
              this.getCatContentsScroll('loadpage');
            } else {
              this.getContentsByCatId();
            }

            break;
        }

        this.$nextTick(() => {
          if (result.Name) document.title = result.Name;
          (document.getElementsByName('keywords')[0] as any).content = result.SeoKeyword;
          (document.getElementsByName('description')[0] as any).content = result.SeoDesc;
          (document.getElementsByName('twitter:description')[0] as any).content = result.SeoDesc;
          (document.getElementsByName('twitter:title')[0] as any).content = result.Name;
        });
      }).catch((error) => {
        console.log(error, 'error');
        this.$message({
          message: error,
          type: 'error'
        });
      });
    }

    // 获取cms该id下所有的Category
    getCategoryTree () {
      this.$Api.cms.getCategoryTree({ id: this.id }).then((result) => {
        if (result && result.length) {
          this.cmsCatTree = result;
          this.catId = result[0].Id;
          this.getContentsByCatId();
        } else {
          this.getContentsByCatId();
        }
      });
    }

    // 获取cms该id下所有的cms
    getContentsByCatId () {
      let catId = this.catId || this.id;
      // if (this.isMobile === true) {
      //   this.pager.pageSize = 5;
      // } else {
      //   this.pager.pageSize = 9;
      // }
      this.$Api.cms.getFromContentByCatId(catId, this.pager.currentPage, this.pager.pageSize, this.isMobile, this.SortName, this.SortOrder).then(result => {
        this.contentList = result.Data;

        result.Data.forEach(function (i) {
          var newDate = new Date(i.CreateDate.replace(/-/g, '/'));
          i.CreateDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
        });
        this.pager.totalRecord = result.TotalRecord;
      });
    }

    // 获取 Category 和所有 SubCategory 的 cms 列表
    getSubCatContents () {
      this.$Api.cms.getSubCatContents({ CatId: this.id, IsMobile: this.isMobile }).then((result) => {
        console.log(result, ' 获取 Category 和所有 SubCategory 的 cms 列表');
        this.contentList = result.Data;
      });
    }

    // 树形控件选择的cms目录改变
    changeCatSelect (Id) {
      this.catId = Id;
      this.getContentsByCatId();
    }

    getCatContentsScroll (flag: string = '') {
      let catId = this.catId || this.id;
      if (this.isMobile === true) {
        this.pager.pageSize = 5;
      }
      this.$Api.cms.getFromContentByCatId(catId, this.pager.currentPage, this.pager.pageSize, this.isMobile, this.SortName, this.SortOrder).then((result) => {
        result.Data.forEach(function (i) {
          var newDate = new Date(i.CreateDate.replace(/-/g, '/'));
          i.CreateDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
        });

        if (flag === 'loadpage') {
          this.contentListscroll = this.contentListscroll.concat(result.Data);
          this.pager.totalRecord = result.TotalRecord;
        }
        console.log(this.contentListscroll, 'this.contentList');
        console.log(result.Data, 'result.Data');
        this.loading = false;
        this.islocking = true;
      }).catch((error) => {
        console.log(error, '错误');
        this.loading = false;
      });
    }

    handleScroll () {
      let fadeInElements = document.getElementsByClassName('productsscrollbar') as HTMLSelectElement;
      let elem = fadeInElements[0].childNodes[fadeInElements[0].childNodes.length - 1];
      if (this.islocking) {
        if (this.pager.totalRecord > (this.pager.pageSize * this.pager.currentPage)) {
          if (this.isElemVisible(elem)) {
            if (this.pager.currentPage === 1) {
              this.pager.currentPage += 1;
            } else {
              this.pager.currentPage++;
            }
            this.loading = true;
            this.islocking = false;
            setTimeout(() => {
              this.getCatContentsScroll('loadpage');
            }, 2000);
          }
        } else {
          this.loading = false;
          this.islocking = true;
        }
      }
    }
    isElemVisible (el) {
      var rect = el.getBoundingClientRect();
      var elemTop = rect.top + 1600; // 200 = buffer
      var elemBottom = rect.bottom;
      return elemTop < window.innerHeight && elemBottom >= 0;
    }

    get id () {
      return this.$route.params.id;
    }

    get isMobile () {
      return this.$store.state.isMobile;
    }

    mounted () {
      this.getCategoryByDevice();

      this.islocking = false;
      document.addEventListener('scroll', this.handleScroll);
    }
    destroyed () {
      document.removeEventListener('scroll', this.handleScroll);
    }

    @Watch('id', { deep: true })
    onKeyChange () {
      this.cmsCategory = {};
      this.cmsCatTree = [];
      this.contentList = [];
      this.catId = 0;
      this.getCategoryByDevice();
    }

    @Watch('isMobile', { deep: true })
    onMediaChange () {
      if (this.PageStyle === '0') {
        this.cmsCategory = {};
        this.cmsCatTree = [];
        this.contentList = [];
        this.catId = 0;
        this.getCategoryByDevice();
      }
    }

    @Watch('pager.currentPage', { deep: true })
    onPagerChange () {
      this.getContentsByCatId();
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

      .innerBoxText{
        // background:#ffffff;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        font-family: 'PostNoBillsColombo-ExtraBold';
      }
    }
  }
    .catDetail {
        .catContent {
            width: 1200px;
            margin: 0 auto;
            padding: 15px 0;

            .layer {
                font-size: 16px;
            }
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

      .innerBoxText{
        // background:#ffffff;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
        font-family: 'PostNoBillsColombo-ExtraBold';
      }
    }
  }
    .catDetail {
        .catContent {
          width: 92%;
          margin: 2rem auto 5rem;
            .layer {
                font-size: 1.2rem;
            }
        }
    }
}
.dropload-load{
  text-align: center;
  padding: 2rem 0;
  .loading{
    display: inline-block;
    // height: 30px;
    // width: 30px;
    // border-radius: 100%;
    // margin: 6px;
    // border: 2px solid #409eff;
    border-bottom-color: transparent;
    vertical-align: middle;
    // animation: rotate 0.75s linear infinite;
    color: #cccccc;
    text-transform: uppercase;
    font-style: normal;
    font-size: 1.4rem;
    letter-spacing: 3px;
  }
}
@-webkit-keyframes rotate {
    0% {
        -webkit-transform: rotate(0deg);
    }
    50% {
        -webkit-transform: rotate(180deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
    }
}
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(180deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
