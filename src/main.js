import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import fastClick from 'fastclick'
import vueLazyLoad from 'vue-lazyload'

import 'lib-flexible'

Vue.config.productionTip = false;
// 创建$bus,把vue实例赋值给$bus
Vue.prototype.$bus = new Vue();
// 安装toast插件
Vue.use(toast);
// 解决移动端300ms延迟
fastClick.attach(document.body)
// 图片的懒加载
Vue.use(vueLazyLoad);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
