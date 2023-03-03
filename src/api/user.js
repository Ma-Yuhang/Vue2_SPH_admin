// 引入二次封装的axios
import request from '@/utils/request'

// 登录的接口
export function login(data) {
  return request({ url: '/admin/acl/index/login', method: 'post', data })
}
// 获得用户信息的接口
export function getInfo(token) {
  return request({ url: '/admin/acl/index/info', method: 'get', params: { token } })
}
// 退出登录的接口
export function logout() {
  return request({ url: '/admin/acl/index/logout', method: 'post' })
}
