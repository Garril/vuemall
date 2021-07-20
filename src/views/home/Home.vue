<template>
  <div id="home">
    <nav-bar class="home-nav-bar"> <div slot="nav-bar-center">购物街</div> </nav-bar>
    <!-- 这里的轮播图，有一个问题，有时候需要刷新，存在加载后，轮播图不会动的问题 -->
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <home-swiper :banners="this.banners"/>
      
      <recommend-view :recommends="this.recommends"></recommend-view>

      <feature-view></feature-view>

      <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"></tab-control>

      <good-list :goods="showGoods"></good-list>

    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
  // 公共组件
  import NavBar from 'components/common/navbar/NavBar.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'
  import GoodList from 'components/content/goods/GoodList.vue'
  import BackTop from 'components/content/backTop/BackTop.vue'
  // 子组件
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'
  // 业务相关
  import TabControl from 'components/content/tabControl/TabControl.vue'

  // 数据部分
  import {
    getHomeMultidata,getHomeGoods
    } from 'network/home';

  export default {
    name:'Home',
    components:{
      NavBar,
      Scroll,
      GoodList,
      BackTop,

      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
        BackTop,
        BackTop,
      
    },
    data() {
      return {
        banners: [],
        
        recommends: [],

        goods: {
          'pop': {page:0,list:[]},
          'new': {page:0,list:[]},
          'sell': {page:0,list:[]},
        },

        curTab:'pop',
        
        isShowBackTop:false,

      }
    },
    created() {
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    methods: {
      // 事件监听
      tabClick(index) {
        switch(index) {
          case 0:
            this.curTab = 'pop';
            break;
          case 1:
            this.curTab = 'new';
            break;
          case 2:
            this.curTab = 'sell';
            break;
        }
      },
      // 网络请求
      getHomeMultidata() {
        getHomeMultidata().then((res) => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page+1;
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page+=1;
        })
      },
      backClick() {
        this.$refs.scroll.scrollTo(0,0,500);
      },
      contentScroll(position) {
        this.isShowBackTop = (-position.y)>1500?true:false;
      },

    },
    computed: {
      showGoods() {
        return this.goods[this.curTab].list
      }
    },

  }
</script>

<style scoped>
  #home {
    position: relative;
    height: 100vh;
    scroll-behavior: smooth;
  }
  .home-nav-bar {
    background-color: var(--color-tint);
    color: rgb(243, 232, 232);
    font-weight: bolder;
    font-family: Helvetica;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }
  .tab-control {
    position: sticky;
    top: 44px;
  }
  /* .content {
    margin-top: 42px;
    height: calc(100% - 91px);
    overflow: hidden;
  } */
  .content {
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
    position: absolute;
  }
</style>