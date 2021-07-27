<template>
  <div class="bottom-bar">
    
    <div class="bottom-bar-item left">
      <check-button @checkBtnClick="selectAll" :value="isSelectAll"></check-button>
      <span>全选</span>
    </div>
    <div class="bottom-bar-item right">
      <span class="total-price">合计: ¥{{totalPrice}}</span>
      <span class="buy-product">去计算({{calcCount}})</span>
    </div>

  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton,
    },
    computed: {
      totalPrice() {
        return this.$store.state.cartList.filter(item=>{
          return item.checked
        }).reduce((preValue,item)=> {
          return preValue+item.price*item.count
        },0).toFixed(2)
      },
      calcCount() {
        return this.$store.state.cartList.filter(item=>{
          return item.checked
        }).length
        // 购物车的件数，看的是商品的种类，不考虑同种类买了多少件
      },
      // 全选按钮随这每个购物车中商品选中，不选中而变化
      isSelectAll() {
        return !this.$store.state.cartList.some(item=>{
          return !item.checked
        })
      }
    },
    methods: {
      selectAll() {
        if(this.isSelectAll) { // 全选中
          this.$store.state.cartList.forEach(item => item.checked = false)
        } else {
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      }
    }
    

  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    z-index: 10;
    height: 40px;
    display: flex;
    border-top: 2px solid rgb(226, 222, 222);
  }
  .bottom-bar-item {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 15px;
  }
  .left {
    padding: 8px;
  }
  .right {
    position: absolute;
    right: 0;
  }
  .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 40px;
    line-height: 35px;
    text-align: center;
    font-size: 14px;
    font-weight: bolder;
  }
  .total-price {
    margin-right: 21px;
  }
</style>