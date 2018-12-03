import { CONTRACT_TYPES, CONTRACT_STATUS, CONTRACT_SIGNED_TYPES, SHOP_SIGNED_TYPES, AGENT_LEVELS, REGION_GROUPS } from './constant.js'
import moment from 'moment'

function getCurrentName (id, array = []) {
  if (!id) { return '' }
  id = +id
  let type = array.find(type => type.id === id)
  if (type) {
    return type.name
  }
  return ''
}

// 合同类型显示
function contractType (id) {
  return getCurrentName(id, CONTRACT_TYPES)
}

// 合同状态显示
function contractStatus (id) {
  return getCurrentName(id, CONTRACT_STATUS)
}
// 店面类型
function shopType (id) {
  return getCurrentName(id, SHOP_SIGNED_TYPES)
}
// 成交方式
function signedType (id) {
  return getCurrentName(id, CONTRACT_SIGNED_TYPES)
}
// 代理授权级别
function agentLevel (id) {
  return getCurrentName(id, AGENT_LEVELS)
}

// 专属区域
function regionType (id) {
  return getCurrentName(id, REGION_GROUPS)
}

// 日期格式
function datex (date, format = 'YYYY-MM-DD HH:mm') {
  if (!date) { return '' }
  let momentDate = moment(date)

  if (!momentDate.isValid()) { return date }

  return momentDate.format(format)
}
// 性别显示
function sexType (type) {
  switch (type) {
    case 1:
      type = '男'
      break
    case 2:
      type = '女'
      break
    default:
      type = '未知'
      break
  }
  return type
}

// 是否判断
function msgTransform (type) {
  switch (type) {
    case 1:
      type = '是'
      break
    case 2:
      type = '否'
      break
    default:
      type = ''
      break
  }
  return type
}

export default { contractType, contractStatus, signedType, shopType, datex, sexType, msgTransform, agentLevel, regionType }
