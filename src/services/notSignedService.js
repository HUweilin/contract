import baseService from './baseService'
import { processDateString } from '../utils/utils'

const apiUrl = '/tosigncontracts'

function handleSearchParams (params, condition) {
  if (condition.push_start) {
    params['time_start'] = processDateString(condition.push_start)
  }
  if (condition.push_end) {
    params['time_end'] = processDateString(condition.push_end)
  }
}

function getNotSigendList (page = 1, condition) {
  let queryParam = {
    page: page,
    params: {}
  }
  handleSearchParams(queryParam.params, condition)
  return baseService.getPaginated(apiUrl, queryParam)
}

function getNotSignedContract (id) {
  return baseService.get(apiUrl, id)
}

// 打回资料
function deleteClient (id) {
  return baseService.del(apiUrl, id)
}

export default {
  getNotSigendList,
  getNotSignedContract,
  deleteClient
}
