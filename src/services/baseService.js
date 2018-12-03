import axios from 'axios'
import Vue from 'vue'
import { httpQueryString } from '../utils/utils.js'
import tokenService from './tokenService.js'
let token = tokenService.getToken()
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

function getPaginated (url, queryParams) {
  let query = httpQueryString(queryParams)
  url += `?${query}`
  return getAll(url).then(data => {
    let pagination = {
      'currentPage': data['current_page'],
      'pageSize': data['per_page'],
      'items': data['data'] || [],
      'total': data['total'],
      'pageCount': data['last_page']
    }
    return pagination
  })
}

function get (url, id) {
  let URL = `${url}` + (id ? `/${id}` : '')
  return ajax(URL, 'get')
}

function getAll (url, params = {}) {
  return ajax(url, 'get', {params})
}

function post (url, data) {
  return ajax(url, 'post', {data})
}

function create (url, data) {
  return ajax(url, 'put', {data})
}

// 修改记录
function edit (url, queryParams = {}, remotePatchMethod) {
  let URL = url + (queryParams.id ? `/${queryParams.id}` : '') + (remotePatchMethod ? `/${remotePatchMethod}` : '')
  return ajax(URL, 'get', {params: queryParams})
}

function patch (url, data = {}) {
  let URL = url + (data.id ? `/${data.id}` : '')
  return ajax(URL, 'patch', {data})
}

function del (url, id) {
  let URL = `${url}/${id}`
  return ajax(URL, 'delete')
}

function handleError (err) {
  if (err && err.errors) {
    for (let field in err.errors) {
      if (err.errors[field].length) {
        Vue.prototype.$error(err.errors[field][0])
        return
      }
    }
  } else if (err.msg) {
    Vue.prototype.$error(err.msg)
  } else {
    Vue.prototype.$error(err.message)
  }
}

function ajax (url, method, options) {
  if (options !== undefined) {
    var {params = {}, data = {}} = options
  } else {
    params = data = {}
  }
  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      params,
      data
    }).then(res => {
      // 正常返回(20x)
      resolve(res.data)
    }, err => {
      if (err && err.response) {
        handleError(err.response.data)
        reject(err.response.data)
      } else {
        handleError(err)
        reject(err)
      }
    })
  })
}
export default { get, getAll, post, create, edit, patch, del, getPaginated, handleError }
