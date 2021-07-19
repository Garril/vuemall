<template>
  <div id="home">
    <nav-bar class="home-nav-bar"> <div slot="nav-bar-center">购物街</div> </nav-bar>
    <!-- 这里的轮播图，有一个问题，有时候需要刷新，存在加载后，轮播图不会动的问题 -->
    
    <home-swiper :banners="this.banners"/>
    
    <recommend-view :recommends="this.recommends"></recommend-view>

    <feature-view></feature-view>

    <tab-control :titles="['流行','新款','精选']" class="tab-control"></tab-control>

    <good-list :goods="this.goods['pop'].list"></good-list>

  </div>
</template>

<script>
  // 公共组件
  import NavBar from 'components/common/navbar/NavBar.vue';
  
  // 子组件
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'
  // 业务相关
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import GoodList from 'components/content/goods/GoodList.vue'

  // 数据部分
  import {
    getHomeMultidata,getHomeGoods
    } from 'network/home';


  export default {
    name:'Home',
    components:{
      NavBar,

      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodList,

    },
    data() {
      return {
        banners: [],
        
        recommends: [],

        goods: {
          'pop': {page:0,list:[]},
          'new': {page:0,list:[]},
          'sell': {page:0,list:[]},
        }

      }
    },
    created() {
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    methods: {
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
      }
    },

  }
</script>

<style>
  #home {
    padding-top: 44px;
    height: 2000px;
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
</style>