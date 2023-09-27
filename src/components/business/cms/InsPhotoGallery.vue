<template>
    <div class="photo-gallery">
        <ul>
            <li v-for="(p,index) in photolist" :key="index" @click="zoomImg(p.BigImagePath)">
                <img :src="p.BigImagePath" />
            </li>
        </ul>

        <!-- <div class="more-imgs">
            <router-link :to="'/photo/album'">
              <img :src="'/static/Images/' + lang + '/more-imgs.png'">
            </router-link>
        </div> -->
        <transition name="slide-fade">
          <div class="zoomImgBg" v-show="showImg" v-on:click="zoomImg">
              <img v-bind:src="showImgSrc">
          </div>
        </transition>

    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class InsPhotoGallery extends Vue {
    @Prop({ default: () => [] }) private photolist!: object[]; // cms图片集数据

    CarouselShow: boolean = false;
    showImg: boolean = false;
    showImgSrc: string = '';

    zoomImg (img) {
      if (typeof (img) === 'string') {
        this.showImgSrc = img;
      }

      this.showImg = !this.showImg;
    }

    get lang () {
      return this.$Storage.get('locale');
    }
}
</script>

<style lang="less" scoped>
.pc {
    .photo-gallery {
      margin: 60px 0 20px;
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 49%;
          margin-right: 2%;
          margin-bottom: 20px;
          cursor: zoom-in;
          text-align: center;
          &:nth-child(2n) {
            margin-right: 0;
          }

          img {
            max-width: 100%;
            max-height: 100%;
            object-fit: cover;
            object-position: 50% 50%;
            // height: 450px;
          }
        }
      }

      .more-imgs {
        text-align: center;
        margin: 80px 0px;
      }

      .zoomImgBg {
            position: fixed;
            background: rgba(0, 0, 0, .7);
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 3000;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: zoom-out;
        }

        .zoomImgBg img {
            max-width: 95%;
            max-height: 95%;
        }
    }
}

.mobile {
    .photo-gallery {
      margin: 3rem 0 1rem;
      ul {
        display: flex;
        flex-wrap: wrap;
        width: 95%;
        margin: 0 auto;
        li {
          width: 48%;
          margin-right: 4%;
          margin-bottom: 1rem;
          cursor: zoom-in;
          text-align: center;
          &:nth-child(2n) {
            margin-right: 0;
          }

          img {
            max-width: 100%;
            max-height: 100%;
            object-fit: cover;
            object-position: 50% 50%;
            // height: 15rem;
          }
        }
      }

      .more-imgs {
        text-align: center;
        margin: 1.5rem 0px;
        img {
          max-width: 60%;
        }
      }

      .zoomImgBg {
            position: fixed;
            background: rgba(0, 0, 0, .7);
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 3000;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: zoom-out;
        }

        .zoomImgBg img {
            max-width: 95%;
            max-height: 95%;
        }
    }
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
