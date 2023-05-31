<template>
  <div id="container" class="photoList fix">
    <div class="title">
      <h1>{{folderTitle}}</h1>
    </div>
    <div class="demo-image fix">
      <div class="block" v-for="(url, index) in imags" :key="index" @click="showImgs(index)">
        <div class="listimage">
          <img class="el-image" :src="url.ImgUrl" />
        </div>
        <span class="demonstration">{{ url.NameDesc }}</span>
      </div>
      <transition name="slide-fade">
        <div id="detail-zoom" class="fix" v-show="CarouselShow">
          <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
            <swiper-slide v-for="(imgs,index) in imags" :key="index">
              <div class="position">
                <img :src="imgs.ImgUrl" />
                <span class="zoomName">{{ imgs.NameDesc }}</span>
              </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div id="test_next" class="swiper-button-next swiper-button-white" slot="button-next"></div>
            <div id="test_prev" class="swiper-button-prev swiper-button-white" slot="button-prev"></div>

          </swiper>

          <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
            <swiper-slide v-for="(url,index) in imags" :key="index">
              <div class="Thumbnailimg">
                <img :src="url.ThumbnailUrl" />
              </div>
            </swiper-slide>
          </swiper>
          <div class="detail-close" @click="CarouselShow= !CarouselShow"></div>
        </div>
      </transition>
    </div>
    <div class="back">
      <router-link :to="'/photo/album'">{{$t('photo.BackText')}}</router-link>
    </div>
  </div>
</template>
<script>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Swiper from 'swiper';

@Component
export default class photoList extends Vue {
  imags = {};
  folderTitle = '';
  CarouselShow = false;
  swiperOptionTop = {
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction'
    },
    lazy: true,
    // zoom: true,
    spaceBetween: 15,
    // loop: true,
    loopedSlides: 5,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    initialSlide: 0,
    updateOnWindowResize: false
  };
  swiperOptionThumbs = {
    spaceBetween: 15,
    // loop: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    touchRatio: 0.2,
    slideToClickedSlide: true,
    initialSlide: 0
  };

  getFileList () {
    this.$Api.PhotoAlbum.SearchFolderInfo({ FolderId: this.id }).then(
      result => {
        // console.log(result.FileList, '标题');
        // console.log(this.$data, 'mobile');
        for (let i = 0; i < result.FileList.Data.length; i++) {
          this.folderTitle = result.FileList.Data[i].FolderName;
          break;
        }

        this.imags = result.FileList.Data;
        // console.log(this.imags, 'LIST');
      }
    );
  }
  data () {
    return {
      CarouselShow: false,
      imags: [],
      srcList: []
    };
  }
  get isMobile () {
    return this.$store.state.isMobile;
  }
  showImgs (index) {
    var _this = this;
    this.CarouselShow = true;
    this.$refs.swiperTop.swiper.activeIndex = index;
    // this.$data.swiperOptionTop.initialSlide = index;
    // this.$data.swiperOptionThumbs.initialSlide = index;
    setTimeout(function () {
      if (_this.$refs.swiperTop && _this.$refs.swiperTop.swiper) {
        _this.$refs.swiperTop.swiper.slideTo(index, 10, true);
      }
      if (_this.$refs.swiperThumbs && _this.$refs.swiperThumbs.swiper) {
        _this.$refs.swiperThumbs.swiper.slideTo(index, 10, true);
      }
    }, 1);
  }
  get id () {
    return this.$route.params.id;
  }
  @Watch('isMobile', { deep: true })
  mounted () {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.swiper;
      const swiperThumbs = this.$refs.swiperThumbs.swiper;
      swiperTop.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperTop;
    });
    this.getFileList();
    setTimeout(function () {
      var $wrapper = $('.gallery-top > .swiper-wrapper');
      // $('.position img', $wrapper).width(document.body.offsetWidth * 0.8);
      // $('.position img', $wrapper).Height(document.body.offsetHeight);
      // $('.position', $wrapper).width(document.body.offsetWidth * 0.8);
      // $('div', $wrapper).Height(document.body.offsetHeight);
    }, 100);
  }
}
</script>
<style scoped lang="less">
body {
  overflow: initial;
}
.fix {
  *zoom: 1;
}

.fix:after {
  display: block;
  content: "clear";
  height: 0;
  clear: both;
  overflow: hidden;
  visibility: hidden;
}

.pc {
  .photoList {
    width: 1200px;
    margin: 0 auto;
    .back {
      text-align: center;
      padding-bottom: 20px;
      a {
        color: #333333;
        font-size: 16px;
      }
    }
    .title {
      text-align: center;
      padding: 20px 0;
    }
    .demo-image {
      position: relative;
    }
    .block {
      // width: 278px;
      // height: 240px;
      float: left;
      margin: 10px;
      margin-bottom: 0;
      .listimage {
        width: 278px;
        height: 200px;
        border: 1px solid #333333;
        border-radius: 4px;
        overflow: hidden;
      }
      .el-image {
        display: block;
        width: 100%;
        height: 100%;
        // height: 240px;
      }
      .demonstration {
        display: block;
        color: #8492a6;
        font-size: 18px;
        margin-bottom: 20px;
        text-align: center;
        margin-top: 10px;
      }
    }
    .swiper-pagination-fraction{
      color: #fff;
      font-size: 16px;
      display: none;
    }
    .demo-image__preview {
      display: block;
      text-align: center;
    }
    .gallery-top .swiper-slide {
      overflow: hidden;
    }
    #detail-zoom {
      background-color: rgba(0, 0, 0, 0.9);
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: block;
      z-index: 10000;

      .detail-close {
        position: absolute;
        z-index: 1;
        // display: flex;
        align-items: center;
        justify-content: center;
        // border-radius: 50%;
        opacity: 1;
        cursor: pointer;
        box-sizing: border-box;
        user-select: none;
        top: 10px;
        right: 10px;
        width: 30px;
        height: 30px;
        color: #fff;
        // border: 2px solid #fff;
        // padding: 5px;
      }
      .detail-close:before {
        content: "";
        width: 30px;
        height: 30px;
        background: url("/static/Images/close2.png") no-repeat top;
        position: absolute;
        background-size: cover;
      }
    }
    .swiper-container-common {
      width: 90%;
      margin: 0 auto;
      overflow: hidden;
    }
    .swiper-slide {
      background-size: cover;
      background-position: center;
      text-align: center;
      position: relative;
      .position {
        transform: translate(-50%, -50%);
        position: absolute;
        left: 50%;
        top: 50%;
        max-height: 100%;
        width: 100%;

        img {
          max-width: 100%;
          max-height: 100%;
          display: block;
          margin-left: auto;
          margin-right: auto;
          width: 80%;
        }
        .zoomName {
          margin-bottom: 0;
          width: 80%;
          height: 50px;
          line-height: 50px;
          text-align: center;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.6);
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          font-size: 18px;
        }
      }
    }
    .gallery-top {
      height: 85% !important;
      width: 1200px;

      .swiper-button-next.swiper-button-white {
        background: url("/static/Images/next.png") no-repeat right;
        width: 59px;
        height: 59px;
        outline: none;
        right: 40px;
      }
      .swiper-button-prev.swiper-button-white {
        background: url("/static/Images/prev.png") no-repeat right;
        width: 59px;
        height: 59px;
        outline: none;
        left: 40px;
      }
    }
    .gallery-thumbs {
      height: 150px !important;
      box-sizing: border-box;
      padding: 10px 0;
    }
    .gallery-thumbs .swiper-slide {
      width: 110px;
      height: 110px;
      opacity: 0.6;
    }

    .gallery-thumbs .swiper-slide img {
      width: 100%;
      height: 100%;
    }
    .gallery-thumbs .swiper-slide-active {
      opacity: 1;
      img {
        background-color: initial;
      }
    }
    .slide-fade-enter-active {
      transition: all 0.3s ease;
    }
    .slide-fade-leave-active {
      transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
    }
    .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
      transform: translateY(-10px);
      opacity: 0;
    }
  }
}

.mobile {
  .photoList {
    padding: 0 0.8rem;

    .swiper-pagination-fraction{
        top: 1rem;
        color: #fff;
        font-size: 1.4rem;
        z-index: 0;
      }
    .back {
      text-align: center;
      padding-bottom: 20px;
      a {
        color: #333333;
        font-size: 16px;
      }
    }
    .title {
      text-align: center;
      padding: 20px 0;
    }
    .demo-image {
      position: relative;
    }
    .block {
      // width: 278px;
      // height: 240px;
      float: left;
      // margin: 10px;
      margin-bottom: 0;
      width: 48%;
      height: 100%;
      .listimage {
        border: 1px solid #333333;
        border-radius: 4px;
        width: 100%;
        height: 120px;
        img {
          width: 100%;
          height: 100%;
          display: block;
          border-radius: 4px;
        }
      }

      .demonstration {
        display: block;
        color: #8492a6;
        font-size: 1.4rem;
        margin-bottom: 20px;
        margin-top: 10px;
        text-align: center;
      }
    }
    .block:nth-child(2n) {
      float: right;
    }

    .demo-image__preview {
      display: block;
      text-align: center;
    }
    #detail-zoom {
      background-color: rgba(0, 0, 0, 0.8);
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: block;
      z-index: 10000;
      .detail-close {
        position: absolute;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        opacity: 0.8;
        cursor: pointer;
        box-sizing: border-box;
        user-select: none;
        top: 20px;
        right: 20px;
        width: 30px;
        height: 30px;
        font-size: 40px;
        color: #fff;
        // border: 2px solid #fff;
        padding: 5px;
      }
      .detail-close:before {
        content: "";
        width: 30px;
        height: 30px;
        background: url("/static/Images/close2.png") no-repeat top;
        position: absolute;
        background-size: cover;
      }
    }
    .swiper-slide {
      background-size: cover;
      background-position: center;
      text-align: center;
      position: relative;
      .position {
        transform: translate(-50%, -50%);
        position: absolute;
        left: 50%;
        top: 50%;
        max-height: 100%;
        width: 96%;

        img {
          max-width: 100%;
          max-height: 100%;
          display: block;
          margin-left: auto;
          margin-right: auto;
          width: 100%;
        }
        .zoomName {
          margin-bottom: 0;
          width: 100%;
          height: 50px;
          line-height: 50px;
          text-align: center;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.6);
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          font-size: 1.4rem;
        }
      }
    }
    .gallery-top {
      height: 80% !important;
      width: 100%;
      // margin-top: 50%;

      .swiper-button-next.swiper-button-white {
        background: url("/cmx4/next.png") no-repeat right;
        width: 59px;
        height: 59px;
        outline: none;
        right: 40px;
        display: none;
      }
      .swiper-button-prev.swiper-button-white {
        background: url("/cmx4/prev.png") no-repeat right;
        width: 59px;
        height: 59px;
        outline: none;
        left: 40px;
        display: none;
      }
    }
    .gallery-thumbs {
      // height: 40% !important;
      box-sizing: border-box;
      padding: 10px 0;
      bottom: 0;
      position: absolute;

      .swiper-slide {
        width: 25%;
        height: 100%;
        opacity: 0.6;
      }

      .swiper-slide img {
        width: 100%;
        height: 100%;
      }
      .swiper-slide-active {
        opacity: 1;
        img {
          background-color: initial;
        }
      }
    }
    // .gallery-thumbs .swiper-slide {
    //   // width: 25%;
    //   height: 100%;
    //   opacity: 0.6;
    // }
    // .gallery-thumbs .swiper-slide img{
    //   width: 100%;
    // }
    // .gallery-thumbs .swiper-slide-active {
    //   opacity: 1;
    // }
    .slide-fade-enter-active {
      transition: all 0.3s ease;
    }
    .slide-fade-leave-active {
      transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
    }
    .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
      transform: translateY(-10px);
      opacity: 0;
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    outline: none;
  }
}

// @media only screen and (min-width: 1400px){

// }
</style>
