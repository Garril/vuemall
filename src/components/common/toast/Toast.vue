<template>
  <div id="toast" :class="{zindex:isShow}">
    <div v-show="isShow">{{message}}</div>
  </div>
</template>

<script>

  export default {
    name:'Toast',
    data() {
      return {
        message:'',
        isShow:false,

      }
    },
    methods: {
      showInfo(message="默认",duration=2000) {
        
        // duration = duration||2000

        this.isShow = true;
        this.message = message;
        setTimeout(()=>{
          this.isShow = false;
          this.message = ''
        },duration)
      },

    }

  }
</script>

<style scoped>
  #toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: #fff;
    white-space: nowrap;
    font-size: 17px;
    background-color: rgba(0, 0, 0, .75);
  }
  .zindex {
    z-index: 999;
    padding: 8px;
  }

</style>