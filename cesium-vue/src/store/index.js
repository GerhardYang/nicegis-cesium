/*
 * @Author: GerhardYang
 * @Date: 2019-11-08 23:01:37
 * @LastEditTime: 2019-12-12 17:46:10
 * @LastEditors: GerhardYang
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
    areatree: null,
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
    changeAreatree: (state, areatree) => {
      state.areatree = areatree
    },
    changeConfig: (state, config) => {
      state.config = config
    },
  },
  actions: {

  }
})
