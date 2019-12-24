/*
 * @Author: GerhardYang
 * @Date: 2019-11-08 23:08:09
 * @LastEditTime : 2019-12-24 15:03:41
 * @LastEditors  : GerhardYang
 * @Description: your file description
 */
import Vue from 'vue'
import App from './App.vue'
import store from './store'

import "font-awesome/css/font-awesome.min.css"

import layer from 'vue-layer'
import 'vue-layer/lib/vue-layer.css';

Vue.prototype.$layer = layer(Vue);

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import L from 'leaflet';
import '@supermap/iclient-leaflet';
Vue.use(L);


import './assets/css/style.css';
import './assets/css/pretty.css';

import './assets/js/initcontainer'

Vue.config.productionTip = false;

axios.get("./js/config/config.json").then(res => {
  // console.log(res);
  store.commit("changeConfig", res.data);
  
  new Vue({
    store,
    render: h => h(App)
  }).$mount('#app');
  // 加载完成隐藏加载动画
  $(".loading").remove();
  $("#container").show();

}).catch(err => {
  layer.alert("图层配置文件错误，请检查/js/config/config.json ！");
});
