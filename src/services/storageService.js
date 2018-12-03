
const localStorage = window.localStorage
const sessionStorage = window.sessionStorage

export default {
  name: 'storageService',

  /**
   * save value(Object) to key
   * @param {string} key 键
   * @param {Object} value 值
   */
  setLocalStorage (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },

  /**
   * get value(Object) to key
   * @param {string} key 键
   * @return {Object} value
   */
  getLocalStorage (key) {
    return JSON.parse(localStorage.getItem(key)) || null
  },

  /**
   * remove key from localstorage
   * @param {string} key 键
   */
  removeLocalStorage (key) {
    localStorage.removeItem(key)
  },

  /**
   * save value(Object) to key
   * @param {string} key 键
   * @param {Object} value 值
   */
  setSessionStorage (key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },

  /**
   * get value(Object) to key
   * @param {string} key 键
   * @return {Object} value
   */
  getSessionStorage (key) {
    return JSON.parse(sessionStorage.getItem(key)) || null
  },

  /**
   * remove key from sessionStorage
   * @param {string} key 键
   */
  removeSessionStorage (key) {
    sessionStorage.removeItem(key)
  }

}
