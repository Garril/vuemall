<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="nav-bar-center">购物街</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'

  export default {
    name:'Home',
    components:{
      NavBar,
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