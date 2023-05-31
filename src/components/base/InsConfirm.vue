<template>
  <transition name="fade">
    <div class="layer" :class="{'pc': !isMobile, 'mobile': isMobile}" v-if="LayerVisible">
      <transition name="fade">
        <div v-if="Visible" class="message_warpper" @mousewheel.prevent>
            <div class="confirm">
                <div class="title primary">{{Title}}</div>
                <div class="content">{{Content}}</div>
                <div class="footer" v-if="!isMobile">
                  <inButton :nama="$i18n.t('Message.Confirm')" size="small" width="50%" @click="doConfirm"></inButton>
                  <inButton :nama="$i18n.t('Message.Cancel')" size="small" width="50%" @click="doCacel"></inButton>
                </div>
                <div class="footer" v-else>
                  <div class="button" @click="doConfirm">{{$t('Message.Confirm')}}</div>
                  <div class="button border_left" @click="doCacel">{{$t('Message.Cancel')}}</div>
                </div>
            </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import inButton from '@/components/base/InsButton.vue';
@Component({
  components: { inButton: inButton }
})
export default class InsComfirm extends Vue {
    public Title!:string;
    public Content!:string;
    public Visible:boolean = false;
    public Confirm!:Function;
    public Cancel!:Function;
    private LayerVisible:boolean = true;

    get isMobile () {
      return this.$store.state.isMobile;
    }

    created () {
      // document.body.style.overflow = 'hidden';
    }
    doConfirm () {
      Vue.prototype.$ClearSingtonConfirm();
      if (this.Confirm && this.Confirm instanceof Function) { this.Confirm(); };
      this.Visible = false;
      setTimeout(() => { this.LayerVisible = false; });
      // document.body.style.overflow = '';
    }
    doCacel () {
      Vue.prototype.$ClearSingtonConfirm();
      if (this.Cancel && this.Cancel instanceof Function) { this.Cancel(); };
      this.Visible = false;
      setTimeout(() => { this.LayerVisible = false; });
    }

    mounted () {
      console.log(this.isMobile, 'isMobile confirm');
    }
}
</script>
<style scoped lang="less">
.pc {
    &.layer{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .3);
        z-index: 2018;
    }
    .confirm{
        width: 400px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: aliceblue;
        border-radius: 4px;
        z-index: 2019;
        /* box-shadow: 0 0 30px 5px rgba(0, 0, 0, .3) ; */
    }
    .title{
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    }
    .content{
    height: 100px;
    text-align: left;
    padding: 16px;
    }
    .footer{
    display: flex;
    justify-content: center;
    }
    .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    }
    .primary {
    background-color: @base_color;
    color: white;
    }
}

.mobile {
    &.layer{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .3);
        z-index: 2018;
    }
    .confirm{
        width: 22.5rem;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: aliceblue;
        border-radius: 0.5rem;
        z-index: 2019;
        /* box-shadow: 0 0 30px 5px rgba(0, 0, 0, .3) ; */
    }
    .title{
    text-align: center;
    height: 3.6rem;
    line-height: 3.6rem;
    font-size: 1.1rem;
    }
    .content{
    text-align: left;
    padding: 1.3rem;
    border-top: 1px solid rgba(0, 0, 0, .1);
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    }
    .footer{
    display: flex;
    }
    .layer-enter-active {
    transition: opacity 0s;
    }
    .layer-leave-active {
    transition: opacity .5s;
    }
    .layer-enter, .layer-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    }
    .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    }
    .button{
    width: 100%;
    color:#0076ff;
    text-align: center;
    font-size: 1.1rem;
    line-height: 3.6rem;
    height: 3.6rem;
    }
    .border_left{
    box-sizing: border-box;
    border-left: 1px solid rgba(0, 0, 0, .1);
    }
}
</style>
