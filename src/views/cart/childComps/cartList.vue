<template>
  <div class="cart-list">
    <scroll class="content"
    :pullUpLoad='true'
    ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" 
      :item-info="item" :key="index"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import cartListItem from './cartListItem.vue'

  import { mapGetters } from 'vuex'

  export default {
    name: 'cartList',
    components: {
      Scroll,
      cartListItem,

    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>