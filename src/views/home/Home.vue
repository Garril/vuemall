<template>
  <div id="home">
    <nav-bar class="home-nav-bar"> <div slot="nav-bar-center">购物街</div> </nav-bar>
    <!-- 这里的轮播图，有一个问题，有时候需要刷新，存在加载后，轮播图不会动的问题 -->
    
    <tab-control :titles="['流行', '新款', '精选']"
    @tabClick="tabClick"
    ref="tabControl1"
    class="tab-control" v-show="isTabFixed"/>

    <scroll class="content" 
    ref="scroll" 
    :probe-type="3" 
    @scroll="contentScroll" 
    :pull-up-load="true"
    @pullingUp="loadMore">
      <home-swiper :banners="this.banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      
      <recommend-view :recommends="this.recommends"></recommend-view>

      <feature-view></feature-view>

      <tab-control :titles="['流行','新款','精选']"  @tabClick="tabClick" ref="tabControl"></tab-control>

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

        // 当前tabControl显示的子组件
        curTab:'pop',
        
        // 是否需要显示BackTop按钮
        isShowBackTop:false,

        // 用于保存tabControl距离顶部的距离
        tabContrOffsetTop:0,
        // 是否需要吸顶，默认不需要
        isTabFixed: false,

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
        this.$refs.tabControl.currentIndex = index;
        this.$refs.tabControl1.currentIndex = index;
        setTimeout(()=>{this.$refs.scroll.scroll.refresh()},1000)
      },
      backClick() {
        this.$refs.scroll.scrollTo(0,0,500);
      },
      contentScroll(position) {
        // 判断BackTop是否显示
        this.isShowBackTop = (-position.y)>1500?true:false;
        // 判断TabControl是否开始吸顶
        this.isTabFixed = (-position.y)>this.tabContrOffsetTop?true:false;
      },
      loadMore() {
        this.getHomeGoods(this.curTab);
        this.$refs.scroll.scroll.refresh();
      },
      swiperImageLoad() {
        this.tabContrOffsetTop = this.$refs.tabControl.$el.offsetTop;
      },
      // 防抖节流
      debounce(func,delay) {
        let timer = null
        return function(...args) {
          if(timer) clearTimeout(timer);
          timer = setTimeout(()=>{
            func.apply(this,args)
          },delay)
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
          this.$refs.scroll.scroll.finishPullUp();
        })
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
  .tab-control {
    position: relative;
    z-index: 9;
    margin-top: -1px;
  }
</style>