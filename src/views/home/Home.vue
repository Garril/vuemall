<template>
  <div id="home">
    <nav-bar class="home-nav-bar"> <div slot="nav-bar-center">购物街</div> </nav-bar>
    <!-- 这里的轮播图，有一个问题，有时候需要刷新，存在加载后，轮播图不会动的问题 -->
    <home-swiper :banners="this.banners"/>

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue';
  import HomeSwiper from './childComps/HomeSwiper.vue'

  import {getHomeMultidata} from 'network/home';


  export default {
    name:'Home',
    components:{
      NavBar,
      HomeSwiper,

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
  .home-nav-bar {
    background-color: var(--color-tint);
    color: rgb(243, 232, 232);
    font-weight: bolder;
    font-family: Helvetica;
  }
</style>