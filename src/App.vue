<template>
  <div id="app">
    <newshead :titlenumber="num" @get-hide="setHide"></newshead>
    <section class="main-aside" v-show="isShow" transition="leftright">
      <nav class="router-list">
        <div class="router-li">
          <span class="router-icon icon-appleinc"></span>
          <a v-link="{path:'/ios'}" @click="setTitle(0)">IOS</a>
        </div>
        <div class="router-li">
          <span class="router-icon icon-android"></span>
          <a v-link="{path:'/android'}" @click="setTitle(1)">Android</a>
        </div>
        <div class="router-li">
          <span class="router-icon icon-smile"></span>
          <a v-link="{path:'/recomm'}" @click="setTitle(2)">推荐</a>
        </div>
        <div class="router-li">
          <span class="router-icon icon-reddit"></span>
          <a v-link="{path:'/gift'}" @click="setTitle(3)">福利</a>
        </div>
        <div class="router-li">
          <span class="router-icon icon-html-five2"></span>
          <a v-link="{path:'/front'}" @click="setTitle(4)">前端</a>
        </div>
      </nav>
    </section>
    <router-view keep-alive></router-view>
  </div>
</template>

<script>
import head from './components/head/head.vue';
export default {
  props: {

  },
  data() {
    return {
      isShow: false,
      num: 3,
      hash: null
    };
  },
  methods: {
    setTitle(index) {
      this.num = index;
    },
    setHide(msg) {
      this.isShow = msg;
    }
  },
  components: {
    // 注册组件
    newshead: head
  },
  ready: function() {
  
  }
};
</script>

<style lang="scss" style="stylesheet/scss">
  .main-aside {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 40%;
    z-index: 99;
    transition: all 500ms;
    &.leftright-transition {
      transform: translateX(0);
      opacity: 1;
    }
    &.leftright-enter {
      transform: translateX(-100%);
      opacity: 0;
    }
    &.leftright-leave {
      transform: translateX(-100%);
      opacity: 0;
    }
    background-color: #555;
    .router-list {
      width: 100%;
      height: 100%;
      .router-li {
        display: flex;
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        border-bottom: 1px solid #fff;
        .router-icon {
          flex: 0 0 40px;
          font-size: 20px;
          line-height: 40px;
          text-align: center;
          color: #fff;  
        }
        a {
          flex: 1;
          text-align: center;
          font-size: 20px;
          color: #fff;
          line-height: 40px;
        }
      }
    }
  }
</style>
