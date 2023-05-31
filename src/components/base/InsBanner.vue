<template>
  <div class="banner">
    <swiper :options="swiperOption" ref="mySwiper" v-if="initSwiper && bannerList.length">
      <!-- slides -->
      <swiper-slide v-for="(slide, index) in bannerList" :key="index">
        <a :href="slide.Url || 'javascript:;'" :target="slide.Url ? '_blank' : '_self'">
          <img :src="slide.Image" />
        </a>
      </swiper-slide>
      <!-- Optional controls -->
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      <!-- <div class="swiper-button-prev" slot="button-prev" v-if="swiperOption.navigation && swiperOption.navigation.nextEl"></div>
      <div class="swiper-button-next" slot="button-next" v-if="swiperOption.navigation && swiperOption.navigation.prevEl"></div> -->
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>

    <img :src="bannerImg" v-else />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import sdk from '@/sdk/InstoreSdk';
import { Message } from 'element-ui';

// banner组件通信传值设定：
// initOptions：swiper初始化相关参数
// page：getHeaderBanner的传参
// initSwiper：是否为轮播，默认非轮播
// data：自定义banner数据

@Component
export default class InsBanner extends Vue {
  @Prop() private initOptions!: object;
  @Prop({ default: '' }) private page!: string;
  @Prop({ default: false }) private initSwiper!: boolean;
  @Prop() private data!: any;
  bannerList: object[] = [];
  bannerImg: string = '';

  swiperOption: object = {
    // autoplay: {
    //   disableOnInteraction: false
    // },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev'
    // },
    autoHeight: true, // 高度随内容变化
    observer: true, // 修改swiper自己或子元素时，自动初始化swiper
    observeParents: true // 修改swiper的父元素时，自动初始化swiper
  };

  // get swiper () {
  //   return this.$refs.mySwiper.swiper;
  // }

  getBanner () {
    let _this = this;

    // sdk.api.promotion.getHeaderBanner(this.page).then(
    //   function (data) {
    //     _this.bannerList = data;
    //   },
    //   function (data) {
    //     Message({
    //       message: data,
    //       type: 'error'
    //     });
    //   }
    // );

    sdk.api.promotion.GetHeaderBannerBydevice(this.page, this.isMobile).then(
      function (data) {
        _this.bannerList = data;
      },
      function (data) {
        Message({
          message: data,
          type: 'error'
        });
      }
    );
  }

  get isMobile () {
    return this.$store.state.isMobile;
  }

  created () {
    if (this.initOptions) {
      this.swiperOption = this.initOptions;
    }
  }

  mounted () {
    // if (this.bannerList.length === 1) {
    // 只有1个slide，swiper会失效且隐藏切换按钮
    // this.swiper.destroy(false);
    // }

    if (this.page) {
      this.getBanner();
    } else {
      if (this.initSwiper) {
        this.bannerList = this.data;
      } else {
        if (typeof (this.data) === 'object') {
          this.bannerImg = this.data[0].Image;
        } else if (typeof (this.data) === 'string') {
          this.bannerImg = this.data;
        }
      }
    }
  }

  @Watch('isMobile', { deep: true })
  onMediaChange () {
    if (this.initSwiper) {
      this.bannerList = [];
      this.getBanner();
    }
  }
}
</script>

<style scoped lang="less">
.Banner {
  width: 100%;
  height: 300px;
}
.Banner img {
  width: 100%;
}
.banner {
  width: 100%;
  position: relative;
  margin: 0 auto;

  > img {
    width: 100%;
  }
}
.swiper-container {
  width: 100%;
}
.swiper-pagination {
  text-align: center;
  width: 100%;
  // bottom: 150px;
}
.swiper-container-horizontal
  > .swiper-pagination-bullets.swiper-pagination-bullet {
  margin: 0 8px;
  width: 15px;
  height: 15px;
}

.swiper-slide {
  img {
    width: 100%;
  }
}
</style>
