<template>
  <header class="main-header">
    {{titleName[titlenumber]}}
    <span class="main-header-more icon-menu" @click.shop.prevent="showAside()"></span>
  </header>
</template>

<script>
  export default {
    props: {
      'titlenumber': {
        type: Number,
        default() {
          return 3;
        }
      }
    },
    data() {
      return {
        titleName: ['IOS','安卓','推荐','福利','前端'],
        isHide: false
      };
    },
    methods: {
      showAside() {      
        this.isHide = true;
        this.$emit('get-hide',this.isHide);
      }
    }
  };
</script>

<style lang="scss" type="stylesheet/scss">
  .main-header {
    position: relative;
    width: 100%;
    height: 42px;
    background-color: yellow;
    font-size: 20px;
    font-family: Arial, Helvetica, sans-serif, Droidsansfallback, Droid Sans, Heiti SC, "微软雅黑";
    font-weight: bold;
    line-height: 42px;
    color: black;
    text-align: center;
    .main-header-more {
      position: absolute;
      left: 0;
      top: 0;
      width: 42px;
      height: 42px;
      font-size: 24px;
      line-height: 42px;
      text-align: center;
      font-weight: normal;
      color: black;
    }
  }
</style>