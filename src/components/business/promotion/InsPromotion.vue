<template>
  <div class="promotion">
    <div class="pro_one" v-for="(pm,index) in PromotionData" :key="index">
      <div class="cover">
        <img :src="pm.ImgPath" />
      </div>
      <div class="imgList">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(img, index2) in pm.BannerList" :key="index2">
            <img :src="img.Image" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import sdk from '@/sdk/InstoreSdk';
import { Message } from 'element-ui';

@Component({
  components: {
    // PrmBlock: () => import('@/components/business/promotion/InsPromotionBlock.vue')
  }
})
export default class InsPromotion extends Vue {
    PromotionData: object[]=[];
    swiperOption: object = {
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      }
    };

    getPromotionList () {
      let _this = this;

      sdk.api.promotion.getPromotionList('test').then(
        function (data) {
          _this.PromotionData = data;
          // _this.PromotionData = data.slice(1);
          console.log(_this.PromotionData, 'promotion data');
        },
        function (data) {
          Message({
            message: data,
            type: 'error'
          });
        }
      );
    }

    getPromotion () {
      sdk.api.promotion.getPromotion('test', 0).then(
        function (data) {
          console.log(data, '单个Promotion数据');
        },
        function (data) {
          Message({
            message: data,
            type: 'error'
          });
        }
      );
    }

    mounted () {
      this.getPromotionList();
      // this.getPromotion();
    }
}
</script>

<style scoped lang="less">
.promotion {
  width: 1200px;
  margin: 50px auto;
  .pro_one {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    .cover {
      max-width: 30%;
      img {
        max-width: 100%;
      }
    }

    .imgList {
      width: 60%;
      .swiper-slide {
        img {
          max-width: 100%;
        }
      }
    }
  }
}
</style>
