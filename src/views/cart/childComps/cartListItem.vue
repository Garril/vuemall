<template>
  <div id="shop-item">
    
    <div class="item-selector">
      <CheckButton @checkBtnClick="checkedChange" :value="itemInfo.checked"></CheckButton>
    </div>
    
    <div class="item-img">
      <img :src="itemInfo.image" alt="shop-pictures">
    </div>

    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{itemInfo.price}}</div>
        <div class="item-price right">{{itemInfo.count}}</div>
      </div>
    </div>

  </div>
</template>

<script scoped>
  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name:'CartListItem',
    components: {
      CheckButton
    },
    props: {
      itemInfo: {
        type:Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      checkedChange: function () {
        this.itemInfo.checked = !this.itemInfo.checked;
      }
    },    
  }
</script>

<style>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 3px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    display: flex;
    justify-content: center;
    align-items: center;
    margin:0 6px 0 6px;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }
</style>