<template>
  <div id="home">
    <nav-bar class="home-nav-bar"> <div slot="nav-bar-center">购物街</div> </nav-bar>
    <!-- 这里的轮播图，有一个问题，有时候需要刷新，存在加载后，轮播图不会动的问题 -->
    
    <home-swiper :banners="this.banners"/>
    
    <recommend-view :recommends="this.recommends"></recommend-view>

    <feature-view></feature-view>

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue';
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'


  import {getHomeMultidata} from 'network/home';


  export default {
    name:'Home',
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,

    },
    data() {
      return {
        banners: [],
        recommends: [],
      }
    },
    created() {
      this.getHomeMultidata();

    },
    methods: {
      getHomeMultidata() {
        getHomeMultidata().then((res) => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })        
      }
    }

  }
</script>

<style>
  #home {
    padding-top: 44px;
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
</style>