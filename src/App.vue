<template>
  <div id="app">
    <newshead :titlenumber="num" @get-hide="setHide"></newshead>
    <section class="main-aside" v-show="isShow" transition="leftright">
      <div class="me-msg">
        <div class="me-head">
          <img src="logo.png">
        </div>
        <div class="me-name">张越</div>
      </div>
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
    <div class="main-bg" v-show="isShow" transition="bg" @click="asideHide()"></div>
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
    },
    asideHide() {
      this.isShow = false;
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
    width: 70%;
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
    .me-msg {
      width: 100%;
      .me-head {
        width: 100%;
        img {
          display: block;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin: 30px auto;
        }
      }
      .me-name {
        text-align: center;
        color: #fff;
        margin: 20px 0;
      }
    }
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
  .main-bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    z-index: 98;
    transition: all 500ms;
    &.bg-transition {
      opacity: 0.4;
    }
    &.bg-enter {
      opacity: 0;
    }
    &.bg-leave {
      opacity: 0;
    }
  }
</style>
