import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, asyncRoutes, constantRoutes } from '@/router'

import router from '@/router'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    routes: [],
    roles: [],
    buttons: [],
    // 异步路由跟服务器返回的能访问的路由对比的结果
    resultAsyncRoutes: [],
    // 最终展示的路由
    resultRoutes: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO(state, userInfo) {
    // 用户名
    state.name = userInfo.name
    // 用户头像
    state.avatar = userInfo.avatar
    // 菜单权限标记
    state.routes = userInfo.routes
    // 按钮权限标记
    state.buttons = userInfo.buttons
    // 角色
    state.roles = userInfo.roles
  },
  SET_RESULTASYNCROUTES(state, asyncRoutes) {
    state.resultAsyncRoutes = asyncRoutes
    // 最终展示的路由
    state.resultRoutes = constantRoutes.concat(state.resultAsyncRoutes)
    // 给路由器添加新的路由
    router.addRoutes(state.resultRoutes)
  }
}
// 计算用户所能访问的路由
function computedAsyncRoutes(asyncRoutes, routes) {
  return asyncRoutes.filter(item => {
    if (routes.indexOf(item.name) != -1) {
      // 递归
      if (item.children && item.children.length) {
        computedAsyncRoutes(item.children, routes)
      }
      return true
    }
  })
}

const actions = {
  // 用户登录
  async login({ commit }, userInfo) {
    // 解构出用户名和密码
    const { username, password } = userInfo
    let result = await login({ username: username.trim(), password: password })
    // 注意：当前登录请求在使用mock的数据 成功的code为20000
    if (result.code == 20000) {
      commit('SET_TOKEN', result.data.token)
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 获得用户的信息
  async getInfo({ commit, state }) {
    let result = await getInfo(state.token)
    if (result.code === 20000) {
      commit('SET_USERINFO', result.data)
      commit('SET_RESULTASYNCROUTES', computedAsyncRoutes(asyncRoutes, result.data.routes))
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 退出登录
  async logout({ commit, state }) {
    let result = await logout(state.token)
    if (result.code == 20000) {
      // 删除token
      removeToken()
      resetRouter()
      commit('RESET_STATE')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

