import storageService from './storageService.js'
import { USER_TOKEN } from '../utils/constant.js'

export default {
  name: 'tokenService',
  // token 是否过期
  isOverdue () {
    let current = new Date().getTime()
    if (this.decodeToken()) {
      let tokenTime = JSON.parse(this.decodeToken()).exp
      return current > tokenTime * 1000
    }
    return true
  },
  decodeToken () {
    const token = this.getToken()
    if (!token) {
      return false
    }
    return window.atob(token.split('.')[1])
  },
  setToken (token) {
    storageService.setLocalStorage(USER_TOKEN, token)
  },
  getToken () {
    return storageService.getLocalStorage(USER_TOKEN)
  },
  removeToken () {
    storageService.removeLocalStorage(USER_TOKEN)
  }
}
