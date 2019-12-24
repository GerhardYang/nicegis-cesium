/*
 * @Author: GerhardYang
 * @Date: 2019-11-08 23:01:37
 * @LastEditTime : 2019-12-24 15:04:06
 * @LastEditors  : GerhardYang
 * @Description: your file description
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: null,
    isLogin: false,
    loginTime: null,
    viewer: null,
    config: null
  },
  mutations: {
    setUsername: (state, username) => {
      state.username = username
    },
    setLogin: (state, isLogin) => {
      state.isLogin = isLogin
    },
    setLogintime: (state, loginTime) => {
      state.loginTime = loginTime
    },
    changeConfig: (state, config) => {
      state.config = config
    },
  },
  actions: {

  }
})
