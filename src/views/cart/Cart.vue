<template>
  <div id="cart">
    <!-- 顶部 -->
    <nav-bar class="nav-bar">
      <div slot="nav-bar-center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 中间的商品 -->
    <cart-list></cart-list>
    <!-- 底部的信息 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  
  import CartBottomBar from './childComps/CartBottomBar'
  import CartList from './childComps/CartList'
  

  import { mapGetters } from 'vuex'

  export default {
    name:'Cart',
    components: {
      NavBar,
      CartList,
      CartBottomBar,

    },
    computed: {
      ...mapGetters([
        'cartLength'
      ])
    }
  }
</script>

<style scoped>
  #cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 10;
  }

</style>