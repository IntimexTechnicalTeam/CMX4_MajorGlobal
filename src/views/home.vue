<template>
  <div id="container" class="home">
    <ins-banner :page="'Home'" :initSwiper="true" />
    <!-- <ins-calendar /> -->
    <!-- <br><br> -->
    <!-- <ins-full-calendar /> -->
    <ins-about-us />
    <cmx-cms-list catKey="SerItem" />

    <router-link class="SignUp" to="/regnpay/form/87bf98bb-1a9b-4b10-bccf-0038a1dc457c">{{$t('Action.SignUp')}}</router-link>

    <div class="success-case">
      <p class="title">{{$t('Display.SuccessCase')}}</p>
      <div class="case-list">
        <img src="/static/Images/case1.png" />
        <img src="/static/Images/case2.png" />
        <img src="/static/Images/case3.png" />
        <img src="/static/Images/case4.png" />
        <img src="/static/Images/case5.png" />
      </div>
    </div>

    <InsBaiduMap :lng="113.090191" :lat="22.601079" markText="可耐~" v-if="AreaCode === 'CN'" />

    <div class="map-main googleMap" v-else>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.524633715289!2d114.15097431550411!3d22.333810985306158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340400ad2b69d883%3A0x7c2d810e7fef31f0!2sIntimex+Business+Solutions+Co.%2C+Ltd.!5e0!3m2!1sen!2shk!4v1476954339617" width="100%" height="500" frameborder="0" style="border:0" allowfullscreen=""></iframe>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  components: {
    InsBanner: () => import('@/components/base/InsBanner.vue'),
    InsAboutUs: () => import('@/components/business/home/InsAboutUs.vue'),
    CmxCmsList: () => import('@/components/business/home/InsCmsList.vue'),
    InsCalendar: () => import('@/components/business/home/InsCalendar.vue'),
    InsFullCalendar: () => import('@/components/business/home/InsFullCalendar.vue'),
    InsBaiduMap: () => import('@/components/business/promotion/InsBaiduMap.vue')
  }
})
export default class InsHome extends Vue {
  swiperOption: object = {
    loop: true,
    autoplay: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    autoHeight: true, // 高度随内容变化
    observer: true, // 修改swiper自己或子元素时，自动初始化swiper
    observeParents: true // 修改swiper的父元素时，自动初始化swiper
  };

  get AreaCode () {
    return localStorage.getItem('AreaCode') || '';
  }

  mounted () {

  }
}
</script>

<style lang="less" scoped>
.pc {
  .home {
    /deep/ .banner {
      .swiper-pagination {
        bottom: 40px;

        .swiper-pagination-bullet {
          width: 18px;
          height: 18px;
          background: #e5e5e5;
        }

        .swiper-pagination-bullet-active {
          background: #646464;
        }
      }
    }

    .SignUp {
      font-size: 24px;
      color: @font_color;
      font-weight: bold;
      width: 560px;
      padding: 18px 0;
      display: block;
      text-align: center;
      border: 2px solid #009944;
      box-sizing: border-box;
      margin: 0 auto 100px;
    }

    .success-case {
      .title {
        font-size: 48px;
        color: @font_color;
        font-weight: bold;
        text-align: center;
        margin-bottom: 40px;
      }

      .case-list {
        text-align: center;
        margin-bottom: 110px;
        img {
          padding: 0 42px;
        }
      }
    }
  }
}

.mobile {
  .home {
    .banner{
      // min-height: 100vh;
      background-color: white;

      /deep/ .swiper-pagination {
        bottom: 12px;
        .swiper-pagination-bullet {
          background: #e5e5e5;
          opacity: 1;
          box-shadow: #484848 0px 0px 2px 0px;
          width: 10px;
          height: 10px;
          margin: 0 10px;
        }

        .swiper-pagination-bullet-active {
          background: #646464;
          box-shadow: none;
        }
      }
    }

    .SignUp {
      font-size: 1.8rem;
      color: @font_color;
      font-weight: bold;
      padding: 1rem 0;
      display: block;
      text-align: center;
      border: 2px solid #094;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      margin: 3rem 1rem 5rem;
      text-decoration: none;
    }

    .success-case {
      margin-bottom: 3.5rem;
      .title {
        font-size: 2.4rem;
        color: @font_color;
        font-weight: bold;
        text-align: center;
        margin-bottom: 2rem;
      }

      .case-list {
        text-align: center;
        img {
          width: 8.5rem;
          margin: 0 0.5rem;
          vertical-align: middle;
          max-width: 28%;
        }
      }
    }
  }
}
</style>
