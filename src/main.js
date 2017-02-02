import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import ios from './components/ios/ios.vue';
import android from './components/android/android.vue';
import recomm from './components/recomm/recomm.vue';
import gift from './components/gift/gift.vue';
import front from './components/front/front.vue';
import './common/scss/index.scss';

// 全局声明
Vue.use(VueRouter);
Vue.use(VueResource);

// 根组件
const app = Vue.extend(App);

// 新建路由对象
const router = new VueRouter();

// 路由映射
router.map({
  '/ios': {
    component: ios
  },
  '/android': {
    component: android
  },
  '/recomm': {
    component: recomm
  },
  '/gift': {
    component: gift
  },
  '/front': {
    component: front
  }
});

// 启动路由
router.start(app,'#app');

// 路由跳转
router.redirect({
	'/' : '/gift'
});

