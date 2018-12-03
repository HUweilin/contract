import storageService from './storageService.js'
import baseService from './baseService.js'
import tokenService from './tokenService.js'
import axios from 'axios'

export default {
  login (data) {
    return baseService.post('auth/login', {
      name: data.username,
      password: data.password
    })
  },
  logout () {
    tokenService.removeToken()
  },
  // 根据token和用户名
  hasLogined () {
    if (tokenService.isOverdue() && this.getUserName()) {
      return true
    }
    return false
  },
  setLoginMsg (msg) {
    tokenService.setToken(msg.token)
    this.setUserName(msg.user)
    this.setRole(msg.roles)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + msg.token
  },
  setUserName (name) {
    storageService.setSessionStorage('username', name)
  },
  getUserName () {
    return storageService.getSessionStorage('username')
  },
  setRole (roles) {
    storageService.setSessionStorage('roles', roles)
  },
  getRole () {
    storageService.getSessionStorage('roles')
  }
}
