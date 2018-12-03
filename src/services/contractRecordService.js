import baseService from './baseService.js'

const apiUrl = '/contractpaymentlogs'

function getFiledsForEdit (data) {
  return {
    id: data.id,
    amount: data.amount,
    give_fee: data.give_fee,
    note: data.note
  }
}

// 获取单个记录
function getRecord (id) {
  return baseService.get(apiUrl, id)
}
// 登记新记录
function createRecord (id, record) {
  let URL = apiUrl + `/${id}`
  return baseService.create(URL, record)
}
// 修改记录
function editRecord (record) {
  record = getFiledsForEdit(record)
  return baseService.edit(apiUrl, record, 'edit')
}

export default { getRecord, createRecord, editRecord }
