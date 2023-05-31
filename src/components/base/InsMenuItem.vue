<template>
    <el-submenu :index="level + '-' + (index+1)" v-if="item.Childs && item.Childs.length">
      <template slot="title">
          <!-- <i class="el-icon-location"></i> -->
          <span class="name"><img :src="item.Image" v-if="item.Image" /> {{item.Name}}</span>
      </template>
      <menu-item :textColor="textColor" v-for="(child,index) in item.Childs" :key="index" :item="child" :index="index" :level="level+1" />
    </el-submenu>

    <el-menu-item :index="level + '-' + (index+1)" v-else>
      <!-- <a href="javascript:;" v-if="item.Type === 0" @click="toUrl(item.Url)"><img :src="item.Image" v-if="item.Image" />{{item.Name}}</a>
      <router-link v-else class="name" :style="{color: textColor}" @click.native="closeSlideMenu" :to="item.Type === 1 ? '/cms/catDetail/' + item.Value.Id : item.Type === 2 ? '/CMS/content/' + item.Value.Id : item.Type === 3 ? '/RegNPay/Form/' + item.Value.Id : item.Type === 4 ? '/product/cat/' + item.Value.Id : item.Type === 5 ? '/product/search/+?attrs=' + JSON.stringify([{Id:parseInt(item.Value.Id),Vals:[]}]) + '&type=0' : '/product/search/+?attrs=' + JSON.stringify([{Id:parseInt(item.ParentId),Vals:[parseInt(item.Value.Id)]}]) + '&type=0'" slot="title">
        <img :src="item.Image" v-if="item.Image" />  {{item.Name}}
      </router-link> -->

      <a href="javascript:;" v-if="item.Type === 0" @click="toUrl(item)"><img :src="item.Image" v-if="item.Image" />{{item.Name}}</a>
      <router-link v-else class="name" :style="{color: textColor}" @click.native="closeSlideMenu" :to="To(item)" slot="title">
        <img :src="item.Image" v-if="item.Image" />  {{item.Name}}
      </router-link>
    </el-menu-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'MenuItem'
})
export default class InsMenuItem extends Vue {
  @Prop() private item!: object;
  @Prop() private index!: number;
  @Prop() private textColor!: string;
  @Prop({ default: 1 }) private level!: number;

  showMemNav: boolean = false;

  closeSlideMenu () {
    this.$store.dispatch('isShowMenu', false);
  }

  toUrl (n) {
    if (!n.IsNewWin && n.Url) {
      window.location.href = n.Url;
    } else if (n.IsNewWin && n.Url) {
      window.open(n.Url);
    }
  }

  To (n) {
    return n.Type === 1 ? '/cms/catDetail/' + n.Value.Id : n.Type === 2 ? '/cms/content/' + n.Value.Id : n.Type === 3 ? '/regnpay/form/' + n.Value.Id : '/';
  }
}
</script>

<style scoped lang="less">
// .name{
//   font-size: 1.12rem;
//   line-height: 3rem;
//   a{
//     font-size: 1.12rem;
//     line-height: 3rem;
//   }
// }
</style>
