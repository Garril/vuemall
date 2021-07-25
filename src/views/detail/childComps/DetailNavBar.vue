<template>
  <div>
    <nav-bar>
      <div slot="nav-bar-left" class="back-sign" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="nav-bar-center" class="titles">
        <div v-for="(item,index) in titles" 
        class="title-item"
        :class="{active:index===curIndex}"
        @click="titleClick(index)">
          {{item}}
          </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'

  export default {
    name:'DetailNavBar',
    components: {
      NavBar,
    },
    data() {
      return {
        titles:['商品','参数','评论','推荐'],
        curIndex:0
      }
    },
    props: {
      propsCurIndex:{
        type:Number,
        default() {
          return 0
        }
      }
    },
    methods: {
      titleClick(index) {
        this.curIndex = index;
        this.$emit('titleClick',index);
      },
      backClick() {
        this.$router.back();
      }
    }

  }
</script>

<style scoped>
  .titles {
    display: flex;
    margin-left: 10px;
  }
  .title-item {
    flex: 1;
    font-size: 13px;
  }
  .active {
    color: var(--color-high-text);
  }
  .back-sign {
    height: 44px;
    text-align: center;
  }
  .back-sign img{
    margin: 12px 12px 0 0;
  }
</style>