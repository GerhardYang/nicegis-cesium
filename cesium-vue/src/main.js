/*
 * @Author: GerhardYang
 * @Date: 2019-11-08 23:08:09
 * @LastEditTime : 2019-12-24 15:03:41
 * @LastEditors  : GerhardYang
 * @Description: your file description
 */
import Vue from 'vue'
import App from './App.vue'

import "font-awesome/css/font-awesome.min.css"

import layer from 'vue-layer'
import 'vue-layer/lib/vue-layer.css';

Vue.prototype.$layer = layer(Vue);

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

import './assets/css/style.css';
import './assets/css/pretty.css';

Vue.config.productionTip = false;

console.log(window.sysconfig);

Vue.prototype.$addStorageEvent = function (type, key, data) {
  if (type === 1) {
    // 创建一个StorageEvent事件
    var newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
      setItem: function (k, val) {
        localStorage.setItem(k, val);
        // 初始化创建的事件
        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
        // 派发对象
        window.dispatchEvent(newStorageEvent);
      }
    }
    return storage.setItem(key, data);
  } else {
    // 创建一个StorageEvent事件
    var newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
      setItem: function (k, val) {
        sessionStorage.setItem(k, val);
        // 初始化创建的事件
        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
        // 派发对象
        window.dispatchEvent(newStorageEvent);
      }
    }
    return storage.setItem(key, data);
  }
}
new Vue({
  render: h => h(App)
}).$mount('#app');
// 加载完成隐藏加载动画
$(".loading").remove();
  // $("#container").show();
