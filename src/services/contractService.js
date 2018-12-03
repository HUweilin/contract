import baseService from './baseService'
import axios from 'axios'
import { processDateString } from '../utils/utils'

const apiUrl = '/contracts'

function handleSearchParams (params, condition) {
  if (condition.time_start) {
    params['time_start'] = processDateString(condition.time_start)
  }
  if (condition.time_end) {
    params['time_end'] = processDateString(condition.time_end)
  }
  if (condition.bus_manager_name) {
    params['bus_manager_name'] = condition.bus_manager_name
  }
  if (condition.brand) {
    params['brand_signed_name'] = condition.brand.name
  }
  if (condition.contract_type) {
    params['contract_type'] = condition.contract_type.id
  }
  if (condition.client_name) {
    params['client_name'] = condition.client_name
  }
  if (condition.client_phone) {
    params['client_phone'] = condition.client_phone
  }
  if (condition.document_type) {
    params['document_type'] = condition.document_type.id
  }
  if (condition.contract_no) {
    params['contract_no'] = condition.contract_no
  }
  if (condition.is_leave_fee) {
    params['is_leave_fee'] = 1
  }
}

function getContractList (page = 1, condition) {
  let queryParam = {
    page: page,
    params: {}
  }
  handleSearchParams(queryParam.params, condition)
  return baseService.getPaginated(apiUrl, queryParam)
}

function getContract (id) {
  return baseService.get(apiUrl, id)
}

// 录入合同
function signedContract (id, contract) {
  let config = {
    method: 'post',
    url: apiUrl,
    data: contract,
    headers: {'content-type': 'multipart/form-data'}
  }
  return new Promise((resolve, reject) => {
    axios(config).then(res => {
      // 正常返回(20x)
      resolve(res.data)
    }, err => {
      if (err && err.response) {
        baseService.handleError(err.response.data)
        reject(err.response.data)
      } else {
        baseService.handleError(err)
        reject(err)
      }
    })
  })
}

// 获取变更前合同
function getFrontContract (id) {
  let URL = apiUrl + '/frontcontract'
  return baseService.get(URL, id)
}

// 获取新合同
function getNewContract (id) {
  let URL = apiUrl + '/newcontract'
  return baseService.get(URL, id)
}

// 复制合同 (实际即录入新合同)
function copyContract (id, contract) {
  let URL = apiUrl + `/copycontract/${id}`
  contract.append('_method', 'PUT')
  let config = {
    method: 'post',
    url: URL,
    data: contract,
    headers: {'content-type': 'multipart/form-data'}
  }
  return new Promise((resolve, reject) => {
    axios(config).then(res => {
      // 正常返回(20x)
      resolve(res.data)
    }, err => {
      if (err && err.response) {
        baseService.handleError(err.response.data)
        reject(err.response.data)
      } else {
        baseService.handleError(err)
        reject(err)
      }
    })
  })
}

// 变更终止合同
function terminateContractOfChange (record) {
  let URL = apiUrl + '/tomodify'
  return baseService.post(URL, record)
}

// 取消终止合同
function terminateContractOfCancel (record) {
  let URL = apiUrl + '/tocancel'
  return baseService.post(URL, record)
}

// 转正合同
function turnToOfficial (id, contract) {
  let config = {
    method: 'post',
    url: apiUrl + '/toofficial',
    data: contract,
    headers: {'content-type': 'multipart/form-data'}
  }
  return new Promise((resolve, reject) => {
    axios(config).then(res => {
      // 正常返回(20x)
      resolve(res.data)
    }, err => {
      if (err && err.response) {
        baseService.handleError(err.response.data)
        reject(err.response.data)
      } else {
        baseService.handleError(err)
        reject(err)
      }
    })
  })
}

export default { getContractList, getContract, signedContract, getFrontContract, getNewContract, copyContract, terminateContractOfChange, terminateContractOfCancel, turnToOfficial }
